import { Capacitor } from '@capacitor/core';

/**
 * Resolves the backend API base URL for both Web and native Capacitor environments.
 * 
 * - In web browsers: returns '' so all existing relative paths (/api/*) work with Vite & Express.
 * - In native Capacitor apps (Android/iOS): returns VITE_API_BASE_URL or defaults to the
 *   live German Teacher production domain (https://germanteacher.store).
 */
export function getApiBaseUrl(): string {
  const customBase = (import.meta as any).env?.VITE_API_BASE_URL;
  if (customBase && typeof customBase === 'string') {
    return customBase.replace(/\/+$/, '');
  }

  // When running inside a native mobile app shell
  if (Capacitor.isNativePlatform()) {
    return 'https://germanteacher.store';
  }

  // Web browser environment uses standard relative routing
  return '';
}

/**
 * Returns a fully qualified or relative URL depending on the runtime platform.
 */
export function getApiUrl(endpoint: string): string {
  const base = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}${cleanEndpoint}`;
}
