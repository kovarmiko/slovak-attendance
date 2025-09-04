import { useEffect, useRef } from 'react';
import { hasAdConsent, onConsentChange, readConsent } from '../lib/consent';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdUnit(): JSX.Element {
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    const init = () => {
      const el = insRef.current as HTMLElement | null;
      if (!el) return;
      if (el.getAttribute('data-adsbygoogle-status') === 'done') return;
      try {
        (window.adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {
        console.warn(e);
      }
    };

    const loadScript = () => {
      const scriptId = 'adsbygoogle-init';
      const existing = document.getElementById(scriptId);
      if (!existing) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.async = true;
        script.src =
          'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2501951323412290';
        script.crossOrigin = 'anonymous';
        script.onload = init;
        document.head.appendChild(script);
      } else {
        init();
      }
    };

    const maybeLoadViaCMP = () => {
      const w = window as any;
      if (typeof w.__tcfapi === 'function') {
        // Listen for TCF updates and load ads after user action (consent or reject)
        const handler = (_tcData: any, success: boolean) => {
          if (!success) return;
          try {
            w.__tcfapi('getTCData', 2, (tcData: any, ok: boolean) => {
              if (!ok) return;
              const applies = tcData?.gdprApplies;
              const status = tcData?.eventStatus; // 'tcloaded' | 'useractioncomplete' | 'cmpuishown'
              if (applies === false) {
                loadScript();
              } else if (status === 'useractioncomplete') {
                // User made a choice (accept or reject). Load script and let Consent Mode enforce behavior.
                loadScript();
              }
            });
          } catch {}
        };
        // Initial check + subscribe
        try {
          w.__tcfapi('addEventListener', 2, handler);
        } catch {}
        return true;
      }
      return false;
    };

    // If a certified CMP is present, rely on it; otherwise, use our stored consent
    const usingCMP = maybeLoadViaCMP();
    if (!usingCMP) {
      const tryLocal = () => {
        if (hasAdConsent(readConsent() || undefined)) loadScript();
      };
      tryLocal();
      const unsubscribe = onConsentChange(() => tryLocal());
      return unsubscribe;
    }
    return () => {};
  }, []);

  return (
    <ins
      ref={insRef}
      className="adsbygoogle block my-6"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-2501951323412290"
      data-ad-slot="1234567890"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
