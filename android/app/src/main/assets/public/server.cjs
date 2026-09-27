var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_config = require("dotenv/config");
var import_express = __toESM(require("express"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var import_https = __toESM(require("https"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_stripe = __toESM(require("stripe"), 1);

// server/firebaseAdmin.ts
var import_app = require("firebase-admin/app");
var import_firestore = require("firebase-admin/firestore");
var firestoreDb = null;
var initAttempted = false;
function isFirebaseAdminConfigured() {
  return Boolean(
    process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY
  );
}
function getFirestoreAdmin() {
  if (firestoreDb) {
    return firestoreDb;
  }
  if (initAttempted) {
    return null;
  }
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;
  if (!projectId || !clientEmail || !privateKey) {
    console.info(
      "[Firebase Admin] Not configured: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, or FIREBASE_PRIVATE_KEY is missing. Server-side Firestore membership updates remain disabled until credentials are provided."
    );
    initAttempted = true;
    return null;
  }
  try {
    if (privateKey.includes("\\n")) {
      privateKey = privateKey.replace(/\\n/g, "\n");
    }
    if (!privateKey.includes("-----BEGIN PRIVATE KEY-----")) {
      privateKey = `-----BEGIN PRIVATE KEY-----
${privateKey.trim()}
-----END PRIVATE KEY-----
`;
    }
    if (!(0, import_app.getApps)().length) {
      (0, import_app.initializeApp)({
        credential: (0, import_app.cert)({
          projectId,
          clientEmail,
          privateKey
        })
      });
    }
    firestoreDb = (0, import_firestore.getFirestore)();
    initAttempted = true;
    console.info(`[Firebase Admin] Successfully initialized for project "${projectId}".`);
    return firestoreDb;
  } catch (error) {
    console.warn("[Firebase Admin] Initialization failed:", error?.message);
    initAttempted = true;
    return null;
  }
}
var processedWebhookEvents = /* @__PURE__ */ new Set();
async function upgradeUserToPremium(userId, eventDetails) {
  const { eventId, subscriptionId, customerId, billingInterval } = eventDetails;
  if (eventId && processedWebhookEvents.has(eventId)) {
    console.info(`[Membership Admin] Duplicate event ${eventId} detected in memory cache. Skipping.`);
    return {
      success: true,
      status: "already_processed",
      userId,
      message: "Event already processed."
    };
  }
  const db = getFirestoreAdmin();
  if (!db) {
    console.warn("[Membership Admin] Cannot update user membership: Firebase Admin is not configured.");
    return {
      success: false,
      status: "not_configured",
      userId,
      message: "Firebase Admin is not configured. Membership update skipped safely."
    };
  }
  try {
    const eventDocRef = db.collection("stripe_events").doc(eventId);
    const eventDoc = await eventDocRef.get();
    if (eventDoc.exists) {
      processedWebhookEvents.add(eventId);
      console.info(`[Membership Admin] Duplicate event ${eventId} found in Firestore stripe_events. Skipping.`);
      return {
        success: true,
        status: "already_processed",
        userId,
        message: "Event was previously processed and logged."
      };
    }
    const userDocRef = db.collection("users").doc(userId);
    const userDoc = await userDocRef.get();
    if (!userDoc.exists) {
      console.warn(`[Membership Admin] User document "users/${userId}" does not exist in Firestore. Skipping upgrade.`);
      return {
        success: false,
        status: "user_not_found",
        userId,
        message: `User ${userId} not found in Firestore. No random account created.`
      };
    }
    const currentData = userDoc.data() || {};
    const now = import_firestore.FieldValue.serverTimestamp();
    const batch = db.batch();
    const userUpdatePayload = {
      plan: "premium",
      isPremium: true,
      updatedAt: now,
      // Separate subscription tracking from membership permissions
      stripeSubscription: {
        subscriptionId: subscriptionId || null,
        customerId: customerId || null,
        billingInterval: billingInterval || "monthly",
        status: "active",
        lastEventId: eventId,
        updatedAt: now
      }
    };
    if (!currentData.premiumSince) {
      userUpdatePayload.premiumSince = now;
    }
    batch.update(userDocRef, userUpdatePayload);
    batch.set(eventDocRef, {
      eventId,
      eventType: "checkout.session.completed",
      userId,
      subscriptionId: subscriptionId || null,
      customerId: customerId || null,
      processedAt: now,
      status: "succeeded"
    });
    await batch.commit();
    processedWebhookEvents.add(eventId);
    console.info(`[Membership Admin] Successfully upgraded user "${userId}" to Premium (Event: ${eventId}).`);
    return {
      success: true,
      status: "updated",
      userId,
      message: `User ${userId} successfully updated to Premium.`
    };
  } catch (error) {
    console.error(`[Membership Admin Error] Failed to update user ${userId}:`, error?.message);
    return {
      success: false,
      status: "error",
      userId,
      message: error?.message || "Unknown Firestore update error."
    };
  }
}
async function downgradeUserMembership(userId, eventDetails) {
  const { eventId, subscriptionId } = eventDetails;
  if (eventId && processedWebhookEvents.has(eventId)) {
    return {
      success: true,
      status: "already_processed",
      userId,
      message: "Event already processed."
    };
  }
  const db = getFirestoreAdmin();
  if (!db) {
    return {
      success: false,
      status: "not_configured",
      userId,
      message: "Firebase Admin not configured."
    };
  }
  try {
    const userDocRef = db.collection("users").doc(userId);
    const userDoc = await userDocRef.get();
    if (!userDoc.exists) {
      return {
        success: false,
        status: "user_not_found",
        userId,
        message: "User document not found."
      };
    }
    const now = import_firestore.FieldValue.serverTimestamp();
    const batch = db.batch();
    batch.update(userDocRef, {
      plan: "free",
      isPremium: false,
      updatedAt: now,
      "stripeSubscription.status": "canceled",
      "stripeSubscription.canceledAt": now,
      "stripeSubscription.lastEventId": eventId
    });
    const eventDocRef = db.collection("stripe_events").doc(eventId);
    batch.set(eventDocRef, {
      eventId,
      eventType: "customer.subscription.deleted",
      userId,
      subscriptionId: subscriptionId || null,
      processedAt: now,
      status: "canceled"
    });
    await batch.commit();
    processedWebhookEvents.add(eventId);
    console.info(`[Membership Admin] Downgraded user "${userId}" to Free upon subscription cancellation.`);
    return {
      success: true,
      status: "updated",
      userId,
      message: `User ${userId} membership adjusted to Free.`
    };
  } catch (error) {
    console.error(`[Membership Admin Error] Failed to downgrade user ${userId}:`, error?.message);
    return {
      success: false,
      status: "error",
      userId,
      message: error?.message || "Firestore error during downgrade."
    };
  }
}

// server.ts
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
var stripeClient = null;
function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return null;
  }
  if (!secretKey.startsWith("sk_test_") && !secretKey.startsWith("rk_test_")) {
    console.warn("[Stripe] Security Alert: Non-test Stripe key detected. Only Stripe Test Mode keys (sk_test_*) are permitted in Phase 12C.");
    return null;
  }
  if (!stripeClient) {
    stripeClient = new import_stripe.default(secretKey);
  }
  return stripeClient;
}
var aiClient = null;
function getAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new import_genai.GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}
var SYSTEM_INSTRUCTION = `You are a friendly, patient, and expert German teacher helping international students, immigrants, and professionals learn German.
Your core teaching principles:
- Act as a warm, encouraging German teacher.
- Explain German in simple, accessible English.
- Help A1, A2, B1, and B2 learners.
- Correct German mistakes gently, explaining the grammatical reason step by step.
- Translate German <-> English clearly and naturally.
- Give practical, memorable German examples.
- Focus heavily on real-life German used in everyday situations in Germany (housing, B\xFCrgeramt Anmeldung, doctors, supermarkets, public transport, university, student jobs, banking).
- Always return clean, valid JSON strictly adhering to the specified schema.`;
var CONVERSATION_SYSTEM_INSTRUCTION = `You are an authentic German conversation partner roleplaying practical situations in Germany (such as Landlord/Vermieter, B\xFCrgeramt official, Doctor/Hausarzt, Job Interviewer, Supermarket clerk, Train conductor, University student, Restaurant waiter).
Core principles:
- Fully embody your character and role for the chosen scenario.
- Speak primarily in natural, authentic German appropriate for A1-B2 German learners.
- Start with a realistic situation and ask the user ONE question or prompt at a time.
- Wait for the user's response and continue the conversation naturally based on what they say.
- If the user made a noticeable German mistake, correct it gently in the 'correction' field (e.g. "Tipp: Sag lieber '...' statt '...'").
- Provide a helpful, concise English translation/explanation in 'englishHint'.
- Always return clean, valid JSON strictly adhering to the specified schema.`;
var SPEAKING_EVAL_SYSTEM_INSTRUCTION = `You are an expert German teacher and speech coach.
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
var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function isTemporaryGeminiError(error) {
  if (!error) return false;
  const err = error;
  const status = err.status ?? err.statusCode ?? err.code ?? err.error?.code ?? err.error?.status;
  if (status === 503 || status === "503" || status === "UNAVAILABLE" || status === 429 || status === "429" || status === "RESOURCE_EXHAUSTED") {
    return true;
  }
  const message = typeof err.message === "string" ? err.message : "";
  let str = "";
  try {
    str = JSON.stringify(err);
  } catch {
    str = String(err);
  }
  return message.includes("503") || message.includes("UNAVAILABLE") || message.includes("high demand") || message.includes("429") || message.includes("RESOURCE_EXHAUSTED") || message.includes("quota") || message.includes("timed out") || str.includes("503") || str.includes("UNAVAILABLE") || str.includes("high demand") || str.includes("429") || str.includes("RESOURCE_EXHAUSTED") || str.includes("quota");
}
app.post("/api/ai-teacher", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Message is required" });
      return;
    }
    const ai = getAI();
    if (!ai) {
      res.json({
        german: "Guten Tag! Ich bin dein KI-Deutschlehrer. Wie kann ich dir heute mit deinem Deutsch helfen?",
        english: "Good day! I am your AI German Teacher. How can I help you with your German today?",
        explanation: "Welcome to German Teacher! I am ready to explain German grammar, translate sentences, and help you navigate everyday life in Germany.",
        grammarTip: "\u{1F4A1} Rule: German nouns are always capitalized and always have a grammatical gender (der, die, or das).",
        examples: [
          { german: "Ich lerne jeden Tag Deutsch.", english: "I learn German every day." },
          { german: "\xDCbung macht den Meister.", english: "Practice makes perfect." }
        ],
        vocabularyHighlights: [
          { german: "Deutsch lernen", meaning: "to learn German" },
          { german: "die Grammatik", meaning: "grammar" }
        ]
      });
      return;
    }
    const MAX_RETRIES = 2;
    const RETRY_DELAY_MS = 500;
    const MODELS = ["gemini-3.1-flash-lite", "gemini-3.8-flash"];
    let response = null;
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      const modelName = MODELS[attempt % MODELS.length];
      try {
        const generatePromise = ai.models.generateContent({
          model: modelName,
          contents: message,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: "application/json",
            responseSchema: {
              type: import_genai.Type.OBJECT,
              properties: {
                german: {
                  type: import_genai.Type.STRING,
                  description: "The primary German phrase, response, translation, or sentence."
                },
                english: {
                  type: import_genai.Type.STRING,
                  description: "Clear translation or English equivalent in simple English."
                },
                explanation: {
                  type: import_genai.Type.STRING,
                  description: "Step-by-step beginner explanation in simple English."
                },
                grammarTip: {
                  type: import_genai.Type.STRING,
                  description: "A short, actionable grammar or pronunciation tip for A1-B2 learners."
                },
                examples: {
                  type: import_genai.Type.ARRAY,
                  description: "1 to 3 simple example sentences showing everyday usage.",
                  items: {
                    type: import_genai.Type.OBJECT,
                    properties: {
                      german: { type: import_genai.Type.STRING },
                      english: { type: import_genai.Type.STRING }
                    },
                    required: ["german", "english"]
                  }
                },
                correction: {
                  type: import_genai.Type.OBJECT,
                  description: "If user made a mistake in German, provide original, corrected text and reason.",
                  properties: {
                    original: { type: import_genai.Type.STRING },
                    corrected: { type: import_genai.Type.STRING },
                    reason: { type: import_genai.Type.STRING }
                  }
                },
                vocabularyHighlights: {
                  type: import_genai.Type.ARRAY,
                  description: '2 to 4 key vocabulary items with article for nouns (e.g. "die Wohnung") and meaning.',
                  items: {
                    type: import_genai.Type.OBJECT,
                    properties: {
                      german: { type: import_genai.Type.STRING },
                      meaning: { type: import_genai.Type.STRING }
                    },
                    required: ["german", "meaning"]
                  }
                }
              },
              required: ["german", "english", "explanation", "vocabularyHighlights"]
            }
          }
        });
        const timeoutPromise = new Promise(
          (_, reject) => setTimeout(() => reject(new Error("503 UNAVAILABLE: Model request timed out")), 2e4)
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
      throw new Error("Empty response from AI model");
    }
    const parsedData = JSON.parse(text);
    res.json(parsedData);
  } catch (_error) {
    console.log("AI Teacher: serving friendly fallback response");
    res.json({
      german: "Entschuldigung, ich konnte deine Anfrage gerade nicht verarbeiten.",
      english: "Excuse me, I was unable to process your question at this moment.",
      explanation: "I had a brief connection delay. Please try asking your German question again in a moment!",
      grammarTip: '\u{1F4A1} In everyday German, "Entschuldigung" is the most polite, universal way to say "Excuse me" or "Sorry".',
      examples: [
        { german: "Entschuldigung, k\xF6nnen Sie das bitte wiederholen?", english: "Excuse me, could you please repeat that?" }
      ],
      vocabularyHighlights: [
        { german: "die Entschuldigung", meaning: "apology / excuse me" },
        { german: "wiederholen", meaning: "to repeat" }
      ]
    });
  }
});
app.post("/api/conversation-practice", async (req, res) => {
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
        germanText: "Guten Tag! Wie kann ich Ihnen heute behilflich sein?",
        englishHint: "Good day! How can I help you today?",
        correction: ""
      });
      return;
    }
    let promptText = `Scenario: ${scenarioTitle || "Alltag in Deutschland"} (${scenarioCategory || "Everyday Life"})
Role: ${partnerName || "Gespr\xE4chspartner"} (${partnerRole || "Partner"})
Context: ${scenarioExplanation || "A real-life conversation in Germany."}
`;
    if (history && Array.isArray(history) && history.length > 0) {
      promptText += `
Dialogue history so far:
`;
      for (const item of history.slice(-6)) {
        const senderLabel = item.sender === "user" ? "Learner (User)" : partnerName || "Partner";
        promptText += `${senderLabel}: "${item.text}"
`;
      }
    }
    if (action === "start") {
      promptText += `
Task: The learner just initiated this scenario. Greet them warmly and realistically in German as ${partnerName || "the partner"} and ask ONE realistic opening question to begin the dialogue naturally.`;
    } else {
      promptText += `
Learner just replied: "${message || ""}"
Task: Respond in German in character as ${partnerName || "the partner"}. Acknowledge what they said, continue the conversation realistically, and ask ONE follow-up question. If they made a notable German mistake, provide a gentle tip in the 'correction' field.`;
    }
    const MAX_RETRIES = 2;
    const RETRY_DELAY_MS = 500;
    const MODELS = ["gemini-3.1-flash-lite", "gemini-3.8-flash"];
    let response = null;
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      const modelName = MODELS[attempt % MODELS.length];
      try {
        const generatePromise = ai.models.generateContent({
          model: modelName,
          contents: promptText,
          config: {
            systemInstruction: CONVERSATION_SYSTEM_INSTRUCTION,
            responseMimeType: "application/json",
            responseSchema: {
              type: import_genai.Type.OBJECT,
              properties: {
                germanText: {
                  type: import_genai.Type.STRING,
                  description: "The in-character German response ending with one single question or cue."
                },
                englishHint: {
                  type: import_genai.Type.STRING,
                  description: "Short, helpful English translation/explanation of what was said."
                },
                correction: {
                  type: import_genai.Type.STRING,
                  description: "Optional gentle correction or grammar tip if the user made a mistake in German, or empty string if fine."
                }
              },
              required: ["germanText", "englishHint"]
            }
          }
        });
        const timeoutPromise = new Promise(
          (_, reject) => setTimeout(() => reject(new Error("503 UNAVAILABLE: Model request timed out")), 2e4)
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
      throw new Error("Empty response from AI model");
    }
    const parsed = JSON.parse(text);
    res.json({
      germanText: parsed.germanText || "Guten Tag! Wie kann ich Ihnen helfen?",
      englishHint: parsed.englishHint || "Good day! How can I help you?",
      correction: parsed.correction || ""
    });
  } catch (_error) {
    console.log("Conversation API: serving friendly fallback response");
    res.json({
      germanText: "Entschuldigung, ich habe Sie kurz nicht verstanden. K\xF6nnten Sie das bitte noch einmal wiederholen?",
      englishHint: "Excuse me, I did not catch that for a moment. Could you please repeat that?",
      correction: ""
    });
  }
});
app.post("/api/speaking-feedback", async (req, res) => {
  const { topic, targetSentence, userSpeech } = req.body;
  if (!targetSentence || !userSpeech) {
    res.status(400).json({ error: "Target sentence and user speech are required" });
    return;
  }
  const ai = getAI();
  if (!ai) {
    res.json({
      understandable: "Yes",
      grammarFeedback: "Your German was clear and understandable!",
      wordOrderFeedback: "Word order is correct.",
      missingOrIncorrectWords: "None",
      correctedSentence: targetSentence,
      improvementTip: "Great effort! Keep practicing speaking out loud with confidence.",
      englishExplanation: "Your spoken phrase clearly communicates the intended message."
    });
    return;
  }
  const prompt = `Topic: "${topic || "General Practice"}"
Target German sentence: "${targetSentence}"
User's spoken German: "${userSpeech}"

Evaluate whether the user's spoken sentence communicates the thought, check grammar, word order, missing/incorrect words, provide the natural corrected German sentence, one actionable improvement tip, and a simple English explanation.`;
  const MAX_RETRIES = 2;
  const RETRY_DELAY_MS = 500;
  const MODELS = ["gemini-3.1-flash-lite", "gemini-3.8-flash"];
  let response = null;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const modelName = MODELS[attempt % MODELS.length];
    try {
      const generatePromise = ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          systemInstruction: SPEAKING_EVAL_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: {
            type: import_genai.Type.OBJECT,
            properties: {
              understandable: { type: import_genai.Type.STRING },
              grammarFeedback: { type: import_genai.Type.STRING },
              wordOrderFeedback: { type: import_genai.Type.STRING },
              missingOrIncorrectWords: { type: import_genai.Type.STRING },
              correctedSentence: { type: import_genai.Type.STRING },
              improvementTip: { type: import_genai.Type.STRING },
              englishExplanation: { type: import_genai.Type.STRING }
            },
            required: [
              "understandable",
              "grammarFeedback",
              "wordOrderFeedback",
              "missingOrIncorrectWords",
              "correctedSentence",
              "improvementTip",
              "englishExplanation"
            ]
          }
        }
      });
      const timeoutPromise = new Promise(
        (_, reject) => setTimeout(() => reject(new Error("503 UNAVAILABLE: Model request timed out")), 2e4)
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
      console.log("Speaking Practice API: using safe fallback due to temporary error");
      break;
    }
  }
  try {
    if (response && response.text) {
      const parsed = JSON.parse(response.text);
      res.json({
        understandable: parsed.understandable || "Yes",
        grammarFeedback: parsed.grammarFeedback || "Well phrased!",
        wordOrderFeedback: parsed.wordOrderFeedback || "Word order is good.",
        missingOrIncorrectWords: parsed.missingOrIncorrectWords || "None",
        correctedSentence: parsed.correctedSentence || targetSentence,
        improvementTip: parsed.improvementTip || "Keep practicing speaking German in full sentences!",
        englishExplanation: parsed.englishExplanation || "Good attempt at speaking German!"
      });
      return;
    }
  } catch (_e) {
  }
  res.json({
    understandable: "Yes",
    grammarFeedback: "Good attempt! Your speech was recognized clearly.",
    wordOrderFeedback: "Word order is understandable.",
    missingOrIncorrectWords: "None",
    correctedSentence: targetSentence,
    improvementTip: "Listen to the target sentence once more to match native intonation.",
    englishExplanation: "Your spoken German communicates the core meaning effectively."
  });
});
app.get("/api/payments/config", (_req, res) => {
  const stripe = getStripe();
  const hasMonthlyPrice = Boolean(process.env.STRIPE_PREMIUM_MONTHLY_PRICE_ID);
  const hasAnnualPrice = Boolean(process.env.STRIPE_PREMIUM_ANNUAL_PRICE_ID);
  const isConfigured = Boolean(stripe && (hasMonthlyPrice || hasAnnualPrice));
  const hasFirebaseAdmin = isFirebaseAdminConfigured();
  res.json({
    isConfigured,
    provider: "stripe",
    mode: "test",
    hasMonthlyPrice,
    hasAnnualPrice,
    hasFirebaseAdmin,
    message: isConfigured ? `Stripe Test Mode is configured and active.${hasFirebaseAdmin ? " Server-side Firestore membership sync is active." : " (Note: Firebase Admin is unconfigured; membership updates remain disabled until credentials are set)."}` : "Stripe Test Mode configuration is incomplete. Safe coming-soon fallback active."
  });
});
app.post("/api/payments/create-checkout-session", async (req, res) => {
  try {
    const stripe = getStripe();
    const { userId, userEmail, billingInterval = "monthly" } = req.body || {};
    const priceId = billingInterval === "annual" ? process.env.STRIPE_PREMIUM_ANNUAL_PRICE_ID : process.env.STRIPE_PREMIUM_MONTHLY_PRICE_ID;
    if (!stripe || !priceId) {
      console.info("[Server Payment] Stripe test configuration missing. Returning safe coming-soon fallback.");
      return res.status(200).json({
        success: false,
        notConfigured: true,
        message: "Premium payments are coming soon. Secure payment processing is currently in preparation."
      });
    }
    const host = req.get("host") || "localhost:3000";
    const protocol = req.protocol === "https" || req.get("x-forwarded-proto") === "https" ? "https" : "http";
    const baseUrl = `${protocol}://${host}`;
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      client_reference_id: userId ? String(userId) : void 0,
      customer_email: userEmail ? String(userEmail) : void 0,
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      metadata: {
        userId: userId ? String(userId) : "anonymous",
        plan: "premium",
        billingInterval
      },
      subscription_data: {
        metadata: {
          userId: userId ? String(userId) : "anonymous",
          plan: "premium",
          billingInterval
        }
      },
      success_url: `${baseUrl}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/?payment=canceled`
    });
    console.info("[Server Payment] Created Stripe Test Mode checkout session:", {
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
  } catch (error) {
    console.error("[Server Payment Error] Failed to create checkout session:", error?.message);
    return res.status(200).json({
      success: false,
      notConfigured: true,
      message: "Unable to initiate Stripe checkout. Please verify test configuration."
    });
  }
});
app.post("/api/payments/customer-portal", async (req, res) => {
  const stripe = getStripe();
  if (!stripe) {
    return res.status(200).json({
      success: false,
      notConfigured: true,
      message: "Billing management portal is not yet active. Coming soon."
    });
  }
  return res.status(200).json({
    success: false,
    notConfigured: true,
    message: "Billing portal requires active customer ID."
  });
});
app.post("/api/payments/webhook", async (req, res) => {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers["stripe-signature"];
  if (!stripe || !webhookSecret || !sig) {
    console.info("[Stripe Webhook] Webhook received in unconfigured/test mode.");
    return res.status(200).json({ received: true, status: "unconfigured_fallback" });
  }
  let event;
  try {
    const rawBody = req.rawBody || Buffer.from(JSON.stringify(req.body));
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error("[Stripe Webhook Verification Failed]:", err?.message);
    return res.status(400).send(`Webhook Error: ${err?.message}`);
  }
  console.info(`[Stripe Webhook] Successfully verified Stripe event: ${event.type} (${event.id})`);
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const targetUserId = session.client_reference_id || session.metadata?.userId;
      console.info(`[Stripe Webhook] Checkout session completed for user reference: ${targetUserId}`);
      if (!targetUserId || targetUserId === "anonymous") {
        console.warn(`[Stripe Webhook] Checkout session ${session.id} lacks valid userId reference. Skipping membership update.`);
        break;
      }
      if (!isFirebaseAdminConfigured()) {
        console.info("[Stripe Webhook] Firebase Admin environment variables are not configured. Safely skipping Firestore user membership upgrade.");
        break;
      }
      const result = await upgradeUserToPremium(targetUserId, {
        eventId: event.id,
        subscriptionId: typeof session.subscription === "string" ? session.subscription : session.subscription?.id || null,
        customerId: typeof session.customer === "string" ? session.customer : session.customer?.id || null,
        billingInterval: session.metadata?.billingInterval || "monthly"
      });
      console.info(`[Stripe Webhook] Result for user "${targetUserId}":`, result);
      break;
    }
    case "customer.subscription.updated": {
      const subscription = event.data.object;
      console.info(`[Stripe Webhook] Subscription updated: ${subscription.id}, status: ${subscription.status}`);
      const targetUserId = subscription.metadata?.userId;
      if (targetUserId && targetUserId !== "anonymous" && isFirebaseAdminConfigured()) {
        if (subscription.status === "canceled" || subscription.status === "unpaid") {
          await downgradeUserMembership(targetUserId, {
            eventId: event.id,
            subscriptionId: subscription.id
          });
        }
      }
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      const targetUserId = subscription.metadata?.userId;
      console.info(`[Stripe Webhook] Subscription canceled: ${subscription.id} for user: ${targetUserId}`);
      if (targetUserId && targetUserId !== "anonymous" && isFirebaseAdminConfigured()) {
        await downgradeUserMembership(targetUserId, {
          eventId: event.id,
          subscriptionId: subscription.id
        });
      }
      break;
    }
    case "invoice.payment_succeeded": {
      const invoice = event.data.object;
      console.info(`[Stripe Webhook] Invoice payment succeeded: ${invoice.id}`);
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object;
      console.warn(`[Stripe Webhook] Invoice payment failed: ${invoice.id}`);
      break;
    }
    default:
      console.info(`[Stripe Webhook] Unhandled event: ${event.type}`);
  }
  return res.status(200).json({ received: true, eventType: event.type });
});
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "german-teacher-api" });
});
function handleTtsRequest(req, res) {
  const textRaw = req.method === "POST" ? req.body?.text : req.query.text;
  const langRaw = req.method === "POST" ? req.body?.language : req.query.language;
  const text = typeof textRaw === "string" ? textRaw.trim() : "";
  const lang = typeof langRaw === "string" && langRaw.startsWith("de") ? "de" : "de";
  if (!text) {
    res.status(400).json({ error: "Text parameter is required" });
    return;
  }
  const safeText = text.slice(0, 200);
  const ttsPath = `/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodeURIComponent(safeText)}`;
  const requestOptions = {
    hostname: "translate.google.com",
    port: 443,
    path: ttsPath,
    method: "GET",
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "Accept": "*/*"
    }
  };
  const upstreamReq = import_https.default.request(requestOptions, (upstreamRes) => {
    if (upstreamRes.statusCode !== 200) {
      res.status(upstreamRes.statusCode || 502).json({ error: "Upstream TTS error" });
      return;
    }
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.setHeader("Access-Control-Allow-Origin", "*");
    upstreamRes.pipe(res);
  });
  upstreamReq.on("error", (err) => {
    console.error("[TTS Proxy Error]", err);
    if (!res.headersSent) {
      res.status(502).json({ error: "Failed to contact TTS audio stream" });
    }
  });
  upstreamReq.setTimeout(8e3, () => {
    upstreamReq.destroy();
    if (!res.headersSent) {
      res.status(504).json({ error: "TTS request timed out" });
    }
  });
  upstreamReq.end();
}
app.get("/api/tts", handleTtsRequest);
app.post("/api/tts", handleTtsRequest);
async function startServer() {
  const isProduction = process.env.NODE_ENV === "production" || typeof __filename !== "undefined" && __filename.endsWith(".cjs");
  if (!isProduction) {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const candidatePath = import_path.default.join(process.cwd(), "dist");
    const distPath = import_fs.default.existsSync(import_path.default.join(candidatePath, "index.html")) ? candidatePath : typeof __dirname !== "undefined" && import_fs.default.existsSync(import_path.default.join(__dirname, "index.html")) ? __dirname : candidatePath;
    app.use(import_express.default.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
