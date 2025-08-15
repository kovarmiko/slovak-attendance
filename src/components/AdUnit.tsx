import { useEffect, useRef } from 'react';

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

      // If this slot has already been processed, do nothing.
      if (el.getAttribute('data-adsbygoogle-status') === 'done') return;

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // Swallow in dev; AdSense sometimes throws during double-invoked effects
        // when React StrictMode is on.
        console.warn(e);
      }
    };

    const scriptId = 'adsbygoogle-init';
    const existing = document.getElementById(scriptId);

    if (!existing) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src =
        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2501951323412290';
      script.crossOrigin = 'anonymous';
      script.onload = init;            // render once the library is ready
      document.head.appendChild(script);
    } else {
      init();                          // library already loaded -> render now
    }
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
