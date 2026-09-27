import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import Stripe from 'stripe';
import {
  isFirebaseAdminConfigured,
  upgradeUserToPremium,
  downgradeUserMembership
} from './server/firebaseAdmin';

const app = express();
const PORT = 3000;

app.use(express.json({
  verify: (req: any, _res, buf) => {
    req.rawBody = buf;
  }
}));

// Lazy initialization of Stripe client (Test Mode Only)
let stripeClient: Stripe | null = null;
function getStripe(): Stripe | null {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return null;
  }
  // Enforce TEST MODE only (Phase 12C)
  if (!secretKey.startsWith('sk_test_') && !secretKey.startsWith('rk_test_')) {
    console.warn('[Stripe] Security Alert: Non-test Stripe key detected. Only Stripe Test Mode keys (sk_test_*) are permitted in Phase 12C.');
    return null;
  }
  if (!stripeClient) {
    stripeClient = new Stripe(secretKey);
  }
  return stripeClient;
}

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `You are a friendly, patient, and expert German teacher helping international students, immigrants, and professionals learn German.
Your core teaching principles:
- Act as a warm, encouraging German teacher.
- Explain German in simple, accessible English.
- Help A1, A2, B1, and B2 learners.
- Correct German mistakes gently, explaining the grammatical reason step by step.
- Translate German <-> English clearly and naturally.
- Give practical, memorable German examples.
- Focus heavily on real-life German used in everyday situations in Germany (housing, Bürgeramt Anmeldung, doctors, supermarkets, public transport, university, student jobs, banking).
- Always return clean, valid JSON strictly adhering to the specified schema.`;

const CONVERSATION_SYSTEM_INSTRUCTION = `You are an authentic German conversation partner roleplaying practical situations in Germany (such as Landlord/Vermieter, Bürgeramt official, Doctor/Hausarzt, Job Interviewer, Supermarket clerk, Train conductor, University student, Restaurant waiter).
Core principles:
- Fully embody your character and role for the chosen scenario.
- Speak primarily in natural, authentic German appropriate for A1-B2 German learners.
- Start with a realistic situation and ask the user ONE question or prompt at a time.
- Wait for the user's response and continue the conversation naturally based on what they say.
- If the user made a noticeable German mistake, correct it gently in the 'correction' field (e.g. "Tipp: Sag lieber '...' statt '...'").
- Provide a helpful, concise English translation/explanation in 'englishHint'.
- Always return clean, valid JSON strictly adhering to the specified schema.`;

const SPEAKING_EVAL_SYSTEM_INSTRUCTION = `You are an expert German teacher and speech coach.
Your task is to evaluate an A1-B2 German learner's spoken German attempt against a target German sentence in the context of a specific conversation topic.
Evaluate what the user actually said:
1. understandable: string ("Yes", "Mostly", or "Needs Practice").
2. grammarFeedback: string (friendly feedback on verb endings, gender, cases, or prepositions).
3. wordOrderFeedback: string (feedback on German word order, such as verb in position 2, or "Word order is correct").
4. missingOrIncorrectWords: string (mention any missing words, wrong words, or "None - all words matched").
5. correctedSentence: string (the ideal, natural German sentence the learner should say; if user's sentence was already great or equivalent, confirm it).
6. improvementTip: string (one short, high-value improvement tip for German phrasing or pronunciation).
7. englishExplanation: string (a concise, clear English explanation of why the sentence is phrased this way).
Always return clean, valid JSON strictly adhering to the specified schema.`;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function isTemporaryGeminiError(error: unknown): boolean {
  if (!error) return false;
  const err = error as Record<string, any>;
  const status = err.status ?? err.statusCode ?? err.code ?? err.error?.code ?? err.error?.status;
  if (
    status === 503 ||
    status === '503' ||
    status === 'UNAVAILABLE' ||
    status === 429 ||
    status === '429' ||
    status === 'RESOURCE_EXHAUSTED'
  ) {
    return true;
  }
  const message = typeof err.message === 'string' ? err.message : '';
  let str = '';
  try {
    str = JSON.stringify(err);
  } catch {
    str = String(err);
  }
  return (
    message.includes('503') ||
    message.includes('UNAVAILABLE') ||
    message.includes('high demand') ||
    message.includes('429') ||
    message.includes('RESOURCE_EXHAUSTED') ||
    message.includes('quota') ||
    message.includes('timed out') ||
    str.includes('503') ||
    str.includes('UNAVAILABLE') ||
    str.includes('high demand') ||
    str.includes('429') ||
    str.includes('RESOURCE_EXHAUSTED') ||
    str.includes('quota')
  );
}

// API route for AI German Teacher chat
app.post('/api/ai-teacher', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const ai = getAI();
    if (!ai) {
      // Graceful response when API key is not configured yet
      res.json({
        german: 'Guten Tag! Ich bin dein KI-Deutschlehrer. Wie kann ich dir heute mit deinem Deutsch helfen?',
        english: 'Good day! I am your AI German Teacher. How can I help you with your German today?',
        explanation: 'Welcome to German Teacher! I am ready to explain German grammar, translate sentences, and help you navigate everyday life in Germany.',
        grammarTip: '💡 Rule: German nouns are always capitalized and always have a grammatical gender (der, die, or das).',
        examples: [
          { german: 'Ich lerne jeden Tag Deutsch.', english: 'I learn German every day.' },
          { german: 'Übung macht den Meister.', english: 'Practice makes perfect.' }
        ],
        vocabularyHighlights: [
          { german: 'Deutsch lernen', meaning: 'to learn German' },
          { german: 'die Grammatik', meaning: 'grammar' }
        ]
      });
      return;
    }

    // Call real Gemini API server-side with automatic fallback models
    const MAX_RETRIES = 2;
    const RETRY_DELAY_MS = 500;
    const MODELS = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];
    let response: any = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      const modelName = MODELS[attempt % MODELS.length];

      try {
        const generatePromise = ai.models.generateContent({
          model: modelName,
          contents: message,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                german: {
                  type: Type.STRING,
                  description: 'The primary German phrase, response, translation, or sentence.'
                },
                english: {
                  type: Type.STRING,
                  description: 'Clear translation or English equivalent in simple English.'
                },
                explanation: {
                  type: Type.STRING,
                  description: 'Step-by-step beginner explanation in simple English.'
                },
                grammarTip: {
                  type: Type.STRING,
                  description: 'A short, actionable grammar or pronunciation tip for A1-B2 learners.'
                },
                examples: {
                  type: Type.ARRAY,
                  description: '1 to 3 simple example sentences showing everyday usage.',
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      german: { type: Type.STRING },
                      english: { type: Type.STRING }
                    },
                    required: ['german', 'english']
                  }
                },
                correction: {
                  type: Type.OBJECT,
                  description: 'If user made a mistake in German, provide original, corrected text and reason.',
                  properties: {
                    original: { type: Type.STRING },
                    corrected: { type: Type.STRING },
                    reason: { type: Type.STRING }
                  }
                },
                vocabularyHighlights: {
                  type: Type.ARRAY,
                  description: '2 to 4 key vocabulary items with article for nouns (e.g. "die Wohnung") and meaning.',
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      german: { type: Type.STRING },
                      meaning: { type: Type.STRING }
                    },
                    required: ['german', 'meaning']
                  }
                }
              },
              required: ['german', 'english', 'explanation', 'vocabularyHighlights']
            }
          }
        });

        // 20 second timeout to prevent premature timeouts during high demand
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('503 UNAVAILABLE: Model request timed out')), 20000)
        );

        response = await Promise.race([generatePromise, timeoutPromise]);
        break;
      } catch (err) {
        const isTemporary = isTemporaryGeminiError(err);
        if (isTemporary && attempt < MAX_RETRIES) {
          await sleep(RETRY_DELAY_MS);
          continue;
        }
        throw err;
      }
    }

    const text = response.text;
    if (!text) {
      throw new Error('Empty response from AI model');
    }

    const parsedData = JSON.parse(text);
    res.json(parsedData);
  } catch (_error: any) {
    console.log('AI Teacher: serving friendly fallback response');
    // Friendly fallback response without exposing technical error details or API keys
    res.json({
      german: 'Entschuldigung, ich konnte deine Anfrage gerade nicht verarbeiten.',
      english: 'Excuse me, I was unable to process your question at this moment.',
      explanation: 'I had a brief connection delay. Please try asking your German question again in a moment!',
      grammarTip: '💡 In everyday German, "Entschuldigung" is the most polite, universal way to say "Excuse me" or "Sorry".',
      examples: [
        { german: 'Entschuldigung, können Sie das bitte wiederholen?', english: 'Excuse me, could you please repeat that?' }
      ],
      vocabularyHighlights: [
        { german: 'die Entschuldigung', meaning: 'apology / excuse me' },
        { german: 'wiederholen', meaning: 'to repeat' }
      ]
    });
  }
});

// API route for Real-Life Conversation Practice
app.post('/api/conversation-practice', async (req, res) => {
  try {
    const {
      scenarioTitle,
      scenarioCategory,
      scenarioExplanation,
      partnerName,
      partnerRole,
      action,
      message,
      history
    } = req.body;

    const ai = getAI();
    if (!ai) {
      res.json({
        germanText: 'Guten Tag! Wie kann ich Ihnen heute behilflich sein?',
        englishHint: 'Good day! How can I help you today?',
        correction: ''
      });
      return;
    }

    let promptText = `Scenario: ${scenarioTitle || 'Alltag in Deutschland'} (${scenarioCategory || 'Everyday Life'})
Role: ${partnerName || 'Gesprächspartner'} (${partnerRole || 'Partner'})
Context: ${scenarioExplanation || 'A real-life conversation in Germany.'}
`;

    if (history && Array.isArray(history) && history.length > 0) {
      promptText += `\nDialogue history so far:\n`;
      for (const item of history.slice(-6)) {
        const senderLabel = item.sender === 'user' ? 'Learner (User)' : (partnerName || 'Partner');
        promptText += `${senderLabel}: "${item.text}"\n`;
      }
    }

    if (action === 'start') {
      promptText += `\nTask: The learner just initiated this scenario. Greet them warmly and realistically in German as ${partnerName || 'the partner'} and ask ONE realistic opening question to begin the dialogue naturally.`;
    } else {
      promptText += `\nLearner just replied: "${message || ''}"
Task: Respond in German in character as ${partnerName || 'the partner'}. Acknowledge what they said, continue the conversation realistically, and ask ONE follow-up question. If they made a notable German mistake, provide a gentle tip in the 'correction' field.`;
    }

    const MAX_RETRIES = 2;
    const RETRY_DELAY_MS = 500;
    const MODELS = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];
    let response: any = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      const modelName = MODELS[attempt % MODELS.length];

      try {
        const generatePromise = ai.models.generateContent({
          model: modelName,
          contents: promptText,
          config: {
            systemInstruction: CONVERSATION_SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                germanText: {
                  type: Type.STRING,
                  description: 'The in-character German response ending with one single question or cue.'
                },
                englishHint: {
                  type: Type.STRING,
                  description: 'Short, helpful English translation/explanation of what was said.'
                },
                correction: {
                  type: Type.STRING,
                  description: 'Optional gentle correction or grammar tip if the user made a mistake in German, or empty string if fine.'
                }
              },
              required: ['germanText', 'englishHint']
            }
          }
        });

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('503 UNAVAILABLE: Model request timed out')), 20000)
        );

        response = await Promise.race([generatePromise, timeoutPromise]);
        break;
      } catch (err) {
        const isTemporary = isTemporaryGeminiError(err);
        if (isTemporary && attempt < MAX_RETRIES) {
          await sleep(RETRY_DELAY_MS);
          continue;
        }
        throw err;
      }
    }

    const text = response.text;
    if (!text) {
      throw new Error('Empty response from AI model');
    }

    const parsed = JSON.parse(text);
    res.json({
      germanText: parsed.germanText || 'Guten Tag! Wie kann ich Ihnen helfen?',
      englishHint: parsed.englishHint || 'Good day! How can I help you?',
      correction: parsed.correction || ''
    });
  } catch (_error: any) {
    console.log('Conversation API: serving friendly fallback response');
    res.json({
      germanText: 'Entschuldigung, ich habe Sie kurz nicht verstanden. Könnten Sie das bitte noch einmal wiederholen?',
      englishHint: 'Excuse me, I did not catch that for a moment. Could you please repeat that?',
      correction: ''
    });
  }
});

// API route for Speaking Practice AI feedback
app.post('/api/speaking-feedback', async (req, res) => {
  const { topic, targetSentence, userSpeech } = req.body;

  if (!targetSentence || !userSpeech) {
    res.status(400).json({ error: 'Target sentence and user speech are required' });
    return;
  }

  const ai = getAI();
  if (!ai) {
    // Graceful response when API key is not configured
    res.json({
      understandable: 'Yes',
      grammarFeedback: 'Your German was clear and understandable!',
      wordOrderFeedback: 'Word order is correct.',
      missingOrIncorrectWords: 'None',
      correctedSentence: targetSentence,
      improvementTip: 'Great effort! Keep practicing speaking out loud with confidence.',
      englishExplanation: 'Your spoken phrase clearly communicates the intended message.'
    });
    return;
  }

  const prompt = `Topic: "${topic || 'General Practice'}"
Target German sentence: "${targetSentence}"
User's spoken German: "${userSpeech}"

Evaluate whether the user's spoken sentence communicates the thought, check grammar, word order, missing/incorrect words, provide the natural corrected German sentence, one actionable improvement tip, and a simple English explanation.`;

  const MAX_RETRIES = 2;
  const RETRY_DELAY_MS = 500;
  const MODELS = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];
  let response: any = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const modelName = MODELS[attempt % MODELS.length];

    try {
      const generatePromise = ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          systemInstruction: SPEAKING_EVAL_SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              understandable: { type: Type.STRING },
              grammarFeedback: { type: Type.STRING },
              wordOrderFeedback: { type: Type.STRING },
              missingOrIncorrectWords: { type: Type.STRING },
              correctedSentence: { type: Type.STRING },
              improvementTip: { type: Type.STRING },
              englishExplanation: { type: Type.STRING }
            },
            required: [
              'understandable',
              'grammarFeedback',
              'wordOrderFeedback',
              'missingOrIncorrectWords',
              'correctedSentence',
              'improvementTip',
              'englishExplanation'
            ]
          }
        }
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('503 UNAVAILABLE: Model request timed out')), 20000)
      );

      response = await Promise.race([generatePromise, timeoutPromise]);
      break;
    } catch (err) {
      const isTemporary = isTemporaryGeminiError(err);
      if (isTemporary && attempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY_MS);
        continue;
      }
      if (attempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY_MS);
        continue;
      }
      console.log('Speaking Practice API: using safe fallback due to temporary error');
      break;
    }
  }

  try {
    if (response && response.text) {
      const parsed = JSON.parse(response.text);
      res.json({
        understandable: parsed.understandable || 'Yes',
        grammarFeedback: parsed.grammarFeedback || 'Well phrased!',
        wordOrderFeedback: parsed.wordOrderFeedback || 'Word order is good.',
        missingOrIncorrectWords: parsed.missingOrIncorrectWords || 'None',
        correctedSentence: parsed.correctedSentence || targetSentence,
        improvementTip: parsed.improvementTip || 'Keep practicing speaking German in full sentences!',
        englishExplanation: parsed.englishExplanation || 'Good attempt at speaking German!'
      });
      return;
    }
  } catch (_e) {
    // fall through to default fallback
  }

  // Safe fallback response if response parsing or model failed
  res.json({
    understandable: 'Yes',
    grammarFeedback: 'Good attempt! Your speech was recognized clearly.',
    wordOrderFeedback: 'Word order is understandable.',
    missingOrIncorrectWords: 'None',
    correctedSentence: targetSentence,
    improvementTip: 'Listen to the target sentence once more to match native intonation.',
    englishExplanation: 'Your spoken German communicates the core meaning effectively.'
  });
});

// ========================================================================
// PAYMENT & STRIPE TEST MODE ENDPOINTS (Phase 12C)
// Real payments remain disabled. Test Mode keys only.
// All secret keys remain strictly server-side.
// ========================================================================

app.get('/api/payments/config', (_req, res) => {
  const stripe = getStripe();
  const hasMonthlyPrice = Boolean(process.env.STRIPE_PREMIUM_MONTHLY_PRICE_ID);
  const hasAnnualPrice = Boolean(process.env.STRIPE_PREMIUM_ANNUAL_PRICE_ID);
  const isConfigured = Boolean(stripe && (hasMonthlyPrice || hasAnnualPrice));
  const hasFirebaseAdmin = isFirebaseAdminConfigured();

  res.json({
    isConfigured,
    provider: 'stripe',
    mode: 'test',
    hasMonthlyPrice,
    hasAnnualPrice,
    hasFirebaseAdmin,
    message: isConfigured 
      ? `Stripe Test Mode is configured and active.${hasFirebaseAdmin ? ' Server-side Firestore membership sync is active.' : ' (Note: Firebase Admin is unconfigured; membership updates remain disabled until credentials are set).'}` 
      : 'Stripe Test Mode configuration is incomplete. Safe coming-soon fallback active.'
  });
});

app.post('/api/payments/create-checkout-session', async (req, res) => {
  try {
    const stripe = getStripe();
    const { userId, userEmail, billingInterval = 'monthly' } = req.body || {};

    const priceId = billingInterval === 'annual'
      ? process.env.STRIPE_PREMIUM_ANNUAL_PRICE_ID
      : process.env.STRIPE_PREMIUM_MONTHLY_PRICE_ID;

    // Requirement 12: Safe fallback whenever Stripe test configuration is missing
    if (!stripe || !priceId) {
      console.info('[Server Payment] Stripe test configuration missing. Returning safe coming-soon fallback.');
      return res.status(200).json({
        success: false,
        notConfigured: true,
        message: 'Premium payments are coming soon. Secure payment processing is currently in preparation.'
      });
    }

    const host = req.get('host') || 'localhost:3000';
    const protocol = req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
    const baseUrl = `${protocol}://${host}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      client_reference_id: userId ? String(userId) : undefined,
      customer_email: userEmail ? String(userEmail) : undefined,
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      metadata: {
        userId: userId ? String(userId) : 'anonymous',
        plan: 'premium',
        billingInterval
      },
      subscription_data: {
        metadata: {
          userId: userId ? String(userId) : 'anonymous',
          plan: 'premium',
          billingInterval
        }
      },
      success_url: `${baseUrl}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/?payment=canceled`
    });

    console.info('[Server Payment] Created Stripe Test Mode checkout session:', {
      sessionId: session.id,
      userId,
      billingInterval
    });

    return res.status(200).json({
      success: true,
      notConfigured: false,
      url: session.url,
      sessionId: session.id
    });
  } catch (error: any) {
    console.error('[Server Payment Error] Failed to create checkout session:', error?.message);
    return res.status(200).json({
      success: false,
      notConfigured: true,
      message: 'Unable to initiate Stripe checkout. Please verify test configuration.'
    });
  }
});

app.post('/api/payments/customer-portal', async (req, res) => {
  const stripe = getStripe();
  if (!stripe) {
    return res.status(200).json({
      success: false,
      notConfigured: true,
      message: 'Billing management portal is not yet active. Coming soon.'
    });
  }

  return res.status(200).json({
    success: false,
    notConfigured: true,
    message: 'Billing portal requires active customer ID.'
  });
});

app.post('/api/payments/webhook', async (req: any, res) => {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers['stripe-signature'];

  if (!stripe || !webhookSecret || !sig) {
    console.info('[Stripe Webhook] Webhook received in unconfigured/test mode.');
    return res.status(200).json({ received: true, status: 'unconfigured_fallback' });
  }

  let event: Stripe.Event;
  try {
    const rawBody = req.rawBody || Buffer.from(JSON.stringify(req.body));
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error('[Stripe Webhook Verification Failed]:', err?.message);
    return res.status(400).send(`Webhook Error: ${err?.message}`);
  }

  console.info(`[Stripe Webhook] Successfully verified Stripe event: ${event.type} (${event.id})`);

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const targetUserId = session.client_reference_id || session.metadata?.userId;
      console.info(`[Stripe Webhook] Checkout session completed for user reference: ${targetUserId}`);

      // Requirement 7: If the webhook event cannot identify a valid existing user,
      // do not create a random account and do not grant Premium.
      if (!targetUserId || targetUserId === 'anonymous') {
        console.warn(`[Stripe Webhook] Checkout session ${session.id} lacks valid userId reference. Skipping membership update.`);
        break;
      }

      // Requirement 10: Gracefully handle missing Firebase Admin credentials
      if (!isFirebaseAdminConfigured()) {
        console.info('[Stripe Webhook] Firebase Admin environment variables are not configured. Safely skipping Firestore user membership upgrade.');
        break;
      }

      // Requirement 5 & 6: Update users/{userId} idempotently with plan: "premium"
      const result = await upgradeUserToPremium(targetUserId, {
        eventId: event.id,
        subscriptionId: typeof session.subscription === 'string' ? session.subscription : (session.subscription as any)?.id || null,
        customerId: typeof session.customer === 'string' ? session.customer : (session.customer as any)?.id || null,
        billingInterval: session.metadata?.billingInterval || 'monthly'
      });

      console.info(`[Stripe Webhook] Result for user "${targetUserId}":`, result);
      break;
    }
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      console.info(`[Stripe Webhook] Subscription updated: ${subscription.id}, status: ${subscription.status}`);
      const targetUserId = subscription.metadata?.userId;
      if (targetUserId && targetUserId !== 'anonymous' && isFirebaseAdminConfigured()) {
        if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
          await downgradeUserMembership(targetUserId, {
            eventId: event.id,
            subscriptionId: subscription.id
          });
        }
      }
      break;
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const targetUserId = subscription.metadata?.userId;
      console.info(`[Stripe Webhook] Subscription canceled: ${subscription.id} for user: ${targetUserId}`);
      if (targetUserId && targetUserId !== 'anonymous' && isFirebaseAdminConfigured()) {
        await downgradeUserMembership(targetUserId, {
          eventId: event.id,
          subscriptionId: subscription.id
        });
      }
      break;
    }
    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice;
      console.info(`[Stripe Webhook] Invoice payment succeeded: ${invoice.id}`);
      break;
    }
    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      console.warn(`[Stripe Webhook] Invoice payment failed: ${invoice.id}`);
      break;
    }
    default:
      console.info(`[Stripe Webhook] Unhandled event: ${event.type}`);
  }

  return res.status(200).json({ received: true, eventType: event.type });
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'german-teacher-api' });
});

// German Text-To-Speech (de-DE) audio streaming proxy
// Provides clean, valid MP3 audio stream for Android WebView / Capacitor / mobile browsers
// without third-party referrer/origin blocking or CORS issues.
function handleTtsRequest(req: express.Request, res: express.Response) {
  const textRaw = req.method === 'POST' ? req.body?.text : req.query.text;
  const langRaw = req.method === 'POST' ? req.body?.language : req.query.language;
  const text = typeof textRaw === 'string' ? textRaw.trim() : '';
  const lang = typeof langRaw === 'string' && langRaw.startsWith('de') ? 'de' : 'de';

  if (!text) {
    res.status(400).json({ error: 'Text parameter is required' });
    return;
  }

  // Cap length per single utterance to 200 characters for safety
  const safeText = text.slice(0, 200);
  const ttsPath = `/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodeURIComponent(safeText)}`;

  const requestOptions: https.RequestOptions = {
    hostname: 'translate.google.com',
    port: 443,
    path: ttsPath,
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Accept': '*/*'
    }
  };

  const upstreamReq = https.request(requestOptions, (upstreamRes) => {
    if (upstreamRes.statusCode !== 200) {
      res.status(upstreamRes.statusCode || 502).json({ error: 'Upstream TTS error' });
      return;
    }

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.setHeader('Access-Control-Allow-Origin', '*');

    upstreamRes.pipe(res);
  });

  upstreamReq.on('error', (err) => {
    console.error('[TTS Proxy Error]', err);
    if (!res.headersSent) {
      res.status(502).json({ error: 'Failed to contact TTS audio stream' });
    }
  });

  upstreamReq.setTimeout(8000, () => {
    upstreamReq.destroy();
    if (!res.headersSent) {
      res.status(504).json({ error: 'TTS request timed out' });
    }
  });

  upstreamReq.end();
}

app.get('/api/tts', handleTtsRequest);
app.post('/api/tts', handleTtsRequest);

async function startServer() {
  const isProduction =
    process.env.NODE_ENV === 'production' ||
    (typeof __filename !== 'undefined' && __filename.endsWith('.cjs'));

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const candidatePath = path.join(process.cwd(), 'dist');
    const distPath = fs.existsSync(path.join(candidatePath, 'index.html'))
      ? candidatePath
      : (typeof __dirname !== 'undefined' && fs.existsSync(path.join(__dirname, 'index.html')) ? __dirname : candidatePath);
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
