'use client';

import { useSyncExternalStore } from 'react';

// Visitor's analytics-cookie choice (GDPR / ePrivacy): stored only in this
// browser (localStorage). No choice yet → nothing is tracked.

export type ConsentChoice = 'granted' | 'denied';

const STORAGE_KEY = 'pd-physio-analytics-consent';
const CHANGE_EVENT = 'pd-consent-change';
const OPEN_EVENT = 'pd-consent-open';

function read(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: choice }));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

/**
 * Current choice: 'granted' | 'denied' | null (not decided yet).
 * 'unknown' during server rendering and hydration, so nothing flashes.
 */
export function useConsent(): ConsentChoice | null | 'unknown' {
  return useSyncExternalStore(subscribe, read, () => 'unknown');
}

/** Re-open the consent banner (footer "Cookie-beállítások"). */
export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenConsentSettings(handler: () => void) {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}
