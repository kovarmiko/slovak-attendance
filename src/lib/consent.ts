export type ConsentValue = 'granted' | 'denied';

export type ConsentState = {
  ad_storage: ConsentValue;
  ad_user_data: ConsentValue;
  ad_personalization: ConsentValue;
  analytics_storage: ConsentValue;
};

const LS_KEY = 'cookie-consent-v2';

export const defaultConsent: ConsentState = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
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
  } catch {}
  updateGtagConsent(state);
  dispatchConsentChanged(state);
}

export function hasAdConsent(state?: ConsentState): boolean {
  const s = state ?? readConsent();
  if (!s) return false;
  return (
    s.ad_storage === 'granted' &&
    s.ad_user_data === 'granted' &&
    s.ad_personalization === 'granted'
  );
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
  try {
    // If a certified CMP implementing TCF v2 is present, ask it to display UI
    const w = window as any;
    if (typeof w.__tcfapi === 'function') {
      try {
        w.__tcfapi('displayConsentUi', 2, () => {});
        return;
      } catch {}
    }
  } catch {}
  window.dispatchEvent(new Event('openConsent'));
}

function dispatchConsentChanged(state: ConsentState) {
  try {
    const evt = new CustomEvent<ConsentState>('consentChanged', { detail: state });
    window.dispatchEvent(evt);
  } catch {}
}

function updateGtagConsent(state: ConsentState) {
  // Ensure dataLayer/gtag presence (matches snippet in index.html)
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.gtag = w.gtag || function gtag() {
    w.dataLayer.push(arguments);
  };

  // Update Google Consent Mode v2 settings
  try {
    w.gtag('consent', 'update', {
      ad_storage: state.ad_storage,
      ad_user_data: state.ad_user_data,
      ad_personalization: state.ad_personalization,
      analytics_storage: state.analytics_storage,
    });
  } catch {}
}
