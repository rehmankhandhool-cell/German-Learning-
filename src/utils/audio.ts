/**
 * Unified Audio synthesis and playback helper for German pronunciation (de-DE).
 * 
 * Supports:
 * 1. Physical Android devices (Capacitor APK & Android WebView):
 *    - Priority 1: Native Android TextToSpeech engine via Capacitor (@capacitor-community/text-to-speech)
 *      with active verification of de-DE / de language support, service initialization retry,
 *      and safety timeout to prevent hanging.
 *    - Priority 2: Server-side audio stream fallback (/api/tts?text=...&language=de-DE).
 *    - Priority 3: WebView browser speechSynthesis fallback.
 * 2. iOS devices (Capacitor APK):
 *    - Native Capacitor TextToSpeech with server audio stream fallback.
 * 3. Desktop & Mobile Web Browsers (Chrome, Firefox, Safari, Edge):
 *    - Standard Web Speech API (speechSynthesis) prioritizing German voices,
 *      falling back to the server audio stream.
 * 
 * Safe Concurrency & Reliability:
 * - Cancels preceding speech immediately to avoid overlapping audio.
 * - Prevents duplicate playback when transitioning between fallbacks.
 * - Never crashes the application if an audio failure occurs.
 */
import { Capacitor } from '@capacitor/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { getApiUrl } from './apiConfig';

let currentSpeechId = 0;
let activeAudio: HTMLAudioElement | null = null;
let cachedNativeGermanTag: string | null = null;
let isNativeChecked = false;

/**
 * Returns the German TTS server endpoint URL.
 */
function getGermanTtsUrl(text: string): string {
  const endpoint = `/api/tts?text=${encodeURIComponent(text)}&language=de-DE`;
  return getApiUrl(endpoint);
}

/**
 * Splits longer German text into natural pronounceable chunks (under 160 characters)
 * respecting sentence boundaries (. ! ?) and clause boundaries (, ; :).
 */
function chunkGermanText(text: string, maxLen = 160): string[] {
  if (text.length <= maxLen) return [text];

  const chunks: string[] = [];
  const sentences = text.match(/[^.!?]+[.!?]*/g) || [text];

  let current = '';
  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;
    if ((current + ' ' + trimmed).trim().length <= maxLen) {
      current = (current + ' ' + trimmed).trim();
    } else {
      if (current) chunks.push(current);
      if (trimmed.length <= maxLen) {
        current = trimmed;
      } else {
        const parts = trimmed.split(/([,;:]\s*)/);
        let sub = '';
        for (const part of parts) {
          if ((sub + part).length <= maxLen) {
            sub += part;
          } else {
            if (sub.trim()) chunks.push(sub.trim());
            sub = part;
          }
        }
        if (sub.trim()) current = sub.trim();
        else current = '';
      }
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks.length > 0 ? chunks : [text.slice(0, maxLen)];
}

/**
 * Displays a non-intrusive in-app banner/toast if audio playback fails or German voice data is missing.
 */
function showAudioNotice(message: string): void {
  if (typeof document === 'undefined') return;

  const existingToast = document.getElementById('german-audio-toast');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.id = 'german-audio-toast';
  toast.className =
    'fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-slate-900/95 text-white border border-amber-500/40 text-xs font-semibold shadow-2xl flex items-center gap-2 max-w-[90vw] animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-auto';
  toast.innerHTML = `
    <span class="text-amber-400 font-bold">🔊 Audio Notice:</span>
    <span class="text-slate-200">${message}</span>
  `;

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/**
 * Utility helper to pause execution.
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Actively checks and verifies German language support in the native device TextToSpeech engine.
 * Handles the asynchronous initialization window of Android TTS service by retrying.
 * Checks 'de-DE', 'de', and the supported language catalog.
 * Returns the best supported tag (e.g. 'de-DE' or 'de'), or null if unsupported.
 */
async function verifyNativeGermanTag(): Promise<string | null> {
  if (!Capacitor.isNativePlatform()) {
    return null;
  }

  if (isNativeChecked && cachedNativeGermanTag !== null) {
    return cachedNativeGermanTag;
  }

  // Attempt verification with up to 4 retries in case Android TTS service is still binding
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      // 1. First test explicit de-DE support
      const deDeRes = await TextToSpeech.isLanguageSupported({ lang: 'de-DE' });
      if (deDeRes && deDeRes.supported) {
        cachedNativeGermanTag = 'de-DE';
        isNativeChecked = true;
        return 'de-DE';
      }

      // 2. Test generic German 'de' support
      const deRes = await TextToSpeech.isLanguageSupported({ lang: 'de' });
      if (deRes && deRes.supported) {
        cachedNativeGermanTag = 'de';
        isNativeChecked = true;
        return 'de';
      }

      // 3. Inspect available languages from the device engine
      const langListRes = await TextToSpeech.getSupportedLanguages();
      if (langListRes && Array.isArray(langListRes.languages)) {
        const hasDe = langListRes.languages.find(
          (l) => typeof l === 'string' && (l.toLowerCase().startsWith('de-') || l.toLowerCase() === 'de' || l.toLowerCase().startsWith('de_'))
        );
        if (hasDe) {
          const resolvedTag = hasDe.includes('-') ? hasDe : 'de-DE';
          cachedNativeGermanTag = resolvedTag;
          isNativeChecked = true;
          return resolvedTag;
        }
      }

      // If supported is reported as false but TTS is initialized, break early
      break;
    } catch (err: any) {
      const errMsg = err?.message || String(err);
      // If service is not yet initialized, wait and retry
      if (errMsg.includes('Not yet initialized') || errMsg.includes('unavailable')) {
        await delay(200);
        continue;
      }
      // Other error: break and fallback
      break;
    }
  }

  // If language check was inconclusive, fallback to 'de-DE' for a direct speak test
  return 'de-DE';
}

/**
 * Plays German audio stream via HTML5 Audio element.
 * Connects to /api/tts. Safely verifies response before proceeding.
 */
function playGermanAudioStream(cleanText: string, speechId: number): Promise<void> {
  return new Promise((resolve, reject) => {
    if (speechId !== currentSpeechId) {
      resolve();
      return;
    }

    const chunks = chunkGermanText(cleanText);
    let chunkIndex = 0;
    let hasPlayedAnyChunk = false;

    const playNext = () => {
      if (speechId !== currentSpeechId || chunkIndex >= chunks.length) {
        if (speechId === currentSpeechId) {
          activeAudio = null;
        }
        resolve();
        return;
      }

      const chunk = chunks[chunkIndex++];
      const url = getGermanTtsUrl(chunk);
      const audio = new Audio(url);
      activeAudio = audio;

      let isResolvedOrRejected = false;
      const cleanup = () => {
        audio.onplay = null;
        audio.onended = null;
        audio.onerror = null;
      };

      // Load timeout: if server does not respond with playable audio within 6s, fail over cleanly
      const loadTimeout = setTimeout(() => {
        if (!isResolvedOrRejected) {
          isResolvedOrRejected = true;
          cleanup();
          try {
            audio.pause();
          } catch (_e) {
            // ignore
          }
          if (!hasPlayedAnyChunk) {
            reject(new Error('Audio stream timed out'));
          } else {
            resolve();
          }
        }
      }, 6000);

      audio.onplay = () => {
        clearTimeout(loadTimeout);
        hasPlayedAnyChunk = true;
      };

      audio.onended = () => {
        clearTimeout(loadTimeout);
        cleanup();
        hasPlayedAnyChunk = true;
        if (speechId === currentSpeechId) {
          playNext();
        } else {
          resolve();
        }
      };

      audio.onerror = (err) => {
        clearTimeout(loadTimeout);
        cleanup();
        console.warn('[Audio] Stream error on chunk:', err);
        if (speechId === currentSpeechId && chunkIndex < chunks.length && hasPlayedAnyChunk) {
          playNext();
        } else {
          if (!hasPlayedAnyChunk) {
            reject(new Error('Audio stream unavailable'));
          } else {
            resolve();
          }
        }
      };

      audio.play().catch((playErr) => {
        clearTimeout(loadTimeout);
        cleanup();
        console.warn('[Audio] audio.play() rejected:', playErr);
        if (!hasPlayedAnyChunk) {
          reject(playErr);
        } else {
          resolve();
        }
      });
    };

    playNext();
  });
}

/**
 * Plays German text using the Web SpeechSynthesis API.
 */
function playBrowserSpeechSynthesis(cleanText: string, speechId: number, rate: number = 0.88): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      reject(new Error('speechSynthesis unavailable'));
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'de-DE';
      utterance.rate = Math.max(0.6, Math.min(1.2, rate));
      utterance.pitch = 1.0;

      // Select German voice if present
      const voices = window.speechSynthesis.getVoices();
      const germanVoice =
        voices.find(
          (v) =>
            v.lang.startsWith('de') &&
            (v.name.includes('Google') ||
              v.name.includes('Natural') ||
              v.name.includes('Hedda') ||
              v.name.includes('Stefan'))
        ) || voices.find((v) => v.lang.startsWith('de'));

      if (germanVoice) {
        utterance.voice = germanVoice;
      }

      let isFinished = false;
      const finish = () => {
        if (!isFinished) {
          isFinished = true;
          if (speechId === currentSpeechId) resolve();
        }
      };

      utterance.onend = finish;
      utterance.onerror = (e) => {
        if (!isFinished) {
          isFinished = true;
          console.warn('[Audio] speechSynthesis utterance error:', e);
          reject(new Error('speechSynthesis failed'));
        }
      };

      // Fallback timeout in case browser drops onend
      setTimeout(() => {
        if (!isFinished) {
          isFinished = true;
          resolve();
        }
      }, Math.max(3000, cleanText.length * 80));

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Stops any active speech playback across Native Mobile TTS, Streaming Audio, and Web SpeechSynthesis.
 */
export async function stopGermanSpeech(): Promise<void> {
  currentSpeechId++;

  // 1. Stop active streaming HTML5 audio
  if (activeAudio) {
    try {
      activeAudio.pause();
      activeAudio.currentTime = 0;
      activeAudio.src = '';
    } catch (_e) {
      // ignore
    }
    activeAudio = null;
  }

  // 2. Stop native mobile speech engine if running on native Capacitor
  if (Capacitor.isNativePlatform()) {
    try {
      await TextToSpeech.stop();
    } catch (_e) {
      // ignore
    }
  }

  // 3. Stop web speech engine if available
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (_e) {
      // ignore
    }
  }
}

/**
 * Speaks German text using de-DE pronunciation.
 * 
 * Execution flow:
 * - On Native Android (Capacitor APK):
 *   1. Verifies de-DE / de support on device and speaks via Native TextToSpeech.
 *   2. If native TTS is unsupported or fails, automatically falls back to the /api/tts server audio stream.
 *   3. If server audio fails, falls back to WebView speechSynthesis.
 *   4. Catches all errors safely to prevent any app crashes.
 * 
 * - On Native iOS (Capacitor APK):
 *   Uses native TextToSpeech with server audio stream fallback.
 * 
 * - On Browsers (Web / Chrome / Safari):
 *   Uses browser speechSynthesis with de-DE voice, with server audio stream fallback.
 */
export async function speakGerman(text: string, rate: number = 0.88): Promise<void> {
  // Clean text of emojis or bracketed notes for smooth pronunciation
  const cleanText = text
    .replace(/\[.*?\]/g, '')
    .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
    .trim();

  if (!cleanText) {
    return;
  }

  // Cancel preceding playback cleanly to avoid overlapping speech
  await stopGermanSpeech();
  const thisSpeechId = ++currentSpeechId;

  const isNative = Capacitor.isNativePlatform();
  const isAndroid =
    Capacitor.getPlatform() === 'android' ||
    (typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent));

  // =========================================================================
  // 1. NATIVE MOBILE APP (Physical Android APK & iOS)
  // =========================================================================
  if (isNative) {
    // Verify de-DE / de support on device
    const verifiedTag = await verifyNativeGermanTag();

    // Priority 1: Native Android / iOS TextToSpeech Engine
    if (verifiedTag) {
      try {
        const speakOptions = {
          text: cleanText,
          lang: verifiedTag,
          rate: Math.max(0.6, Math.min(1.2, rate)),
          pitch: 1.0,
          volume: 1.0,
          category: 'playback' as const,
        };

        // Safety timeout so native speak never hangs indefinitely
        const safetyTimeoutMs = Math.max(6000, cleanText.length * 85);
        const timeoutPromise = new Promise<void>((_, reject) =>
          setTimeout(() => reject(new Error('Native TTS timeout')), safetyTimeoutMs)
        );

        await Promise.race([TextToSpeech.speak(speakOptions), timeoutPromise]);

        // Successfully spoken via native engine
        if (thisSpeechId === currentSpeechId) {
          return;
        }
      } catch (nativeErr) {
        console.warn('[Audio] Native TTS unready or threw, falling back to server audio:', nativeErr);
        if (thisSpeechId !== currentSpeechId) return;
      }
    }

    // Priority 2: High-fidelity Server Audio Stream (/api/tts)
    try {
      await playGermanAudioStream(cleanText, thisSpeechId);
      if (thisSpeechId === currentSpeechId) {
        return;
      }
    } catch (streamErr) {
      console.warn('[Audio] Server audio stream failed, falling back to WebView speech synthesis:', streamErr);
      if (thisSpeechId !== currentSpeechId) return;
    }

    // Priority 3: WebView Browser SpeechSynthesis
    try {
      await playBrowserSpeechSynthesis(cleanText, thisSpeechId, rate);
      if (thisSpeechId === currentSpeechId) {
        return;
      }
    } catch (_webErr) {
      // WebView speech synthesis failed or unsupported
    }

    // If all audio channels were exhausted
    if (thisSpeechId === currentSpeechId) {
      showAudioNotice('Unable to play German pronunciation. Check your device volume or German voice settings.');
    }
    return;
  }

  // =========================================================================
  // 2. ANDROID MOBILE BROWSER (Chrome on Android)
  // =========================================================================
  if (isAndroid) {
    try {
      await playBrowserSpeechSynthesis(cleanText, thisSpeechId, rate);
      return;
    } catch (_browserErr) {
      // Fallback to server audio stream
      if (thisSpeechId === currentSpeechId) {
        try {
          await playGermanAudioStream(cleanText, thisSpeechId);
        } catch (_streamErr) {
          showAudioNotice('Pronunciation audio stream failed to load.');
        }
      }
      return;
    }
  }

  // =========================================================================
  // 3. DESKTOP BROWSERS (Chrome, Safari, Firefox, Edge)
  // =========================================================================
  try {
    await playBrowserSpeechSynthesis(cleanText, thisSpeechId, rate);
  } catch (_desktopErr) {
    if (thisSpeechId === currentSpeechId) {
      try {
        await playGermanAudioStream(cleanText, thisSpeechId);
      } catch (_streamErr) {
        showAudioNotice('Pronunciation audio stream failed to load.');
      }
    }
  }
}
