import { App as CapApp } from '@capacitor/app';
import { Capacitor, PluginListenerHandle } from '@capacitor/core';

export type BackButtonHandler = () => boolean | Promise<boolean>;

interface RegisteredHandler {
  id: string;
  priority: number; // Higher number executed first
  handler: BackButtonHandler;
}

/**
 * BackButtonManager coordinates Android hardware/system back button events.
 * 
 * Order of priority:
 * 1. Active open modals (Priority 100) -> closes modal
 * 2. Mobile navigation drawer/menu (Priority 90) -> closes drawer
 * 3. In-app section navigation history (Priority 50) -> pops previous section
 * 4. App exit confirmation guard (Priority 10) -> double-press confirmation prevents accidental exits
 *
 * Web behavior is completely unaffected as this only binds native listeners when
 * Capacitor.isNativePlatform() is true.
 */
class BackButtonManager {
  private handlers: RegisteredHandler[] = [];
  private isInitialized = false;
  private listenerPromise: Promise<PluginListenerHandle> | null = null;

  public init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    if (Capacitor.isNativePlatform()) {
      try {
        this.listenerPromise = CapApp.addListener('backButton', async ({ canGoBack }) => {
          // Sort descending by priority so top-priority (modals, drawers) runs first
          const sorted = [...this.handlers].sort((a, b) => b.priority - a.priority);

          for (const item of sorted) {
            try {
              const handled = await item.handler();
              if (handled) {
                // Successfully consumed by a modal, drawer, or navigation step
                return;
              }
            } catch (err) {
              console.error(`Error in back button handler "${item.id}":`, err);
            }
          }

          // Fallback if no handlers consumed it: if webview history can go back, navigate back
          if (canGoBack) {
            window.history.back();
          }
        });
      } catch (err) {
        console.warn('Capacitor App backButton listener initialization warning:', err);
      }
    }
  }

  /**
   * Registers a back-button handler with a priority number.
   * Higher priority runs first. Return true from handler to stop propagation.
   * Returns an unregister function for easy use in useEffect cleanup.
   */
  public register(id: string, priority: number, handler: BackButtonHandler): () => void {
    this.handlers = this.handlers.filter((h) => h.id !== id);
    this.handlers.push({ id, priority, handler });

    return () => {
      this.unregister(id);
    };
  }

  public unregister(id: string) {
    this.handlers = this.handlers.filter((h) => h.id !== id);
  }
}

export const backButtonManager = new BackButtonManager();
