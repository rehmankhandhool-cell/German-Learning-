import { getApiUrl } from '../utils/apiConfig';

export interface AIResponse {
  german: string;
  english: string;
  explanation?: string;
  grammarTip?: string;
  examples?: { german: string; english: string }[];
  correction?: {
    original: string;
    corrected: string;
    reason: string;
  };
  vocabularyHighlights: { german: string; meaning: string }[];
}

/**
 * AI German Teacher service.
 * Connects the client to the server-side Gemini API endpoint (/api/ai-teacher)
 * keeping all API keys and credentials secure on the backend.
 */
export async function sendChatMessageToAITeacher(userText: string): Promise<AIResponse> {
  const query = userText.trim();
  if (!query) {
    return {
      german: 'Wie kann ich dir heute helfen?',
      english: 'How can I help you today?',
      explanation: 'Please enter a German phrase, question, or sentence.',
      vocabularyHighlights: [{ german: 'helfen', meaning: 'to help' }]
    };
  }

  try {
    const response = await fetch(getApiUrl('/api/ai-teacher'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: query })
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const data = await response.json();
    return data as AIResponse;
  } catch (error) {
    console.error('Error contacting AI Teacher server API:', error);
    // Graceful, friendly fallback without exposing technical errors or secrets
    return {
      german: 'Entschuldigung, ich konnte deine Anfrage gerade nicht verarbeiten.',
      english: 'Excuse me, I was unable to reach the AI teacher server right now.',
      explanation: 'The German Teacher is having a brief connection pause. Please try asking your question again in a moment!',
      grammarTip: '💡 "Entschuldigung" is the most versatile word in Germany for "Excuse me" or "Sorry".',
      examples: [
        { german: 'Können Sie das bitte wiederholen?', english: 'Could you please repeat that?' }
      ],
      vocabularyHighlights: [
        { german: 'die Entschuldigung', meaning: 'apology / excuse me' },
        { german: 'wiederholen', meaning: 'to repeat' }
      ]
    };
  }
}
