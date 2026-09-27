import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';

/**
 * Safely opens an external URL using Capacitor Browser on native platforms (iOS / Android)
 * and standard window.open in web browsers, ensuring external sites do not hijack or break
 * the internal German Teacher native WebView navigation.
 */
export async function openExternalUrl(url: string): Promise<void> {
  if (!url) return;

  if (Capacitor.isNativePlatform()) {
    try {
      await Browser.open({ url, presentationStyle: 'popover' });
      return;
    } catch (err) {
      console.warn('Capacitor Browser.open error, fallback to window.open:', err);
    }
  }

  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

/**
 * Checks whether a given URL is internal to German Teacher or an external website.
 */
export function isExternalUrl(url: string): boolean {
  if (!url) return false;
  if (url.startsWith('/') || url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('tel:')) {
    return false;
  }
  try {
    const parsed = new URL(url, window.location.origin);
    const hostname = parsed.hostname.toLowerCase();
    return !(
      hostname === 'germanteacher.store' ||
      hostname.endsWith('.germanteacher.store') ||
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === window.location.hostname
    );
  } catch {
    return false;
  }
}
