export type ConsentValue = 'granted' | 'denied';

export type ConsentState = {
  analytics_storage: ConsentValue;
};

const LS_KEY = 'cookie-consent-v2';

export const defaultConsent: ConsentState = {
  analytics_storage: 'denied',
};

export function readConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    return parsed;
  } catch {
    return null;
  }
}

export function saveConsent(state: ConsentState) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage failures; consent still applies for the current page view.
  }
  dispatchConsentChanged(state);
}

export function onConsentChange(cb: (state: ConsentState) => void): () => void {
  const handler = (e: Event) => {
    const ce = e as CustomEvent<ConsentState>;
    cb(ce.detail);
  };
  window.addEventListener('consentChanged', handler);
  return () => window.removeEventListener('consentChanged', handler);
}

export function openConsentModal() {
  window.dispatchEvent(new Event('openConsent'));
}

function dispatchConsentChanged(state: ConsentState) {
  try {
    const evt = new CustomEvent<ConsentState>('consentChanged', { detail: state });
    window.dispatchEvent(evt);
  } catch {
    // Older or restricted environments may not allow CustomEvent dispatch.
  }
}
