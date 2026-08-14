/**
 * Storage Abstraction with Graceful Fallback
 * 
 * PERSISTENCE DISCLAIMER & ARCHITECTURE NOTE:
 * This abstraction checks for an asynchronous `window.storage` object (injected by host environments
 * supporting multi-user or synchronized storage) and transparently falls back to `localStorage`.
 * 
 * The `localStorage` fallback is PER-BROWSER/PER-DEVICE ONLY. It does not sync across different
 * users or devices, which makes it ideal for local practice history, but it is not a shared multi-user database backend.
 */

interface CustomWindowStorage {
  get?: (key: string, shared?: boolean) => Promise<string | null>;
  set?: (key: string, value: string, shared?: boolean) => Promise<void>;
}

declare global {
  interface Window {
    storage?: CustomWindowStorage;
  }
}

export const PLAYERS_STORAGE_KEY = 'in_progress_players_v1';
export const HISTORY_STORAGE_KEY = 'in_progress_history_v1';
export const THEME_STORAGE_KEY = 'in_progress_theme_v1';
export const CURRENT_USER_STORAGE_KEY = 'erc_active_user_v1';

export async function safeGet<T>(key: string, defaultValue: T): Promise<T> {
  try {
    if (window.storage && typeof window.storage.get === 'function') {
      const raw = await window.storage.get(key, false);
      if (raw) {
        return JSON.parse(raw) as T;
      }
    }
  } catch (err) {
    console.warn(`[storage] window.storage.get failed for key "${key}", falling back to localStorage:`, err);
  }

  try {
    const localRaw = localStorage.getItem(key);
    if (localRaw) {
      return JSON.parse(localRaw) as T;
    }
  } catch (err) {
    console.warn(`[storage] localStorage.getItem failed for key "${key}":`, err);
  }

  return defaultValue;
}

export async function safeSet<T>(key: string, value: T): Promise<void> {
  const jsonString = JSON.stringify(value);

  let windowStorageSuccess = false;
  try {
    if (window.storage && typeof window.storage.set === 'function') {
      await window.storage.set(key, jsonString, false);
      windowStorageSuccess = true;
    }
  } catch (err) {
    console.warn(`[storage] window.storage.set failed for key "${key}":`, err);
  }

  try {
    localStorage.setItem(key, jsonString);
  } catch (err) {
    if (!windowStorageSuccess) {
      console.error(`[storage] localStorage.setItem failed for key "${key}":`, err);
    }
  }
}
