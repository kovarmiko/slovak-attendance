import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdUnit(): JSX.Element {
  useEffect(() => {
    const id = 'adsbygoogle-init';
    if (!document.getElementById(id)) {
      const script = document.createElement('script');
      script.id = id;
      script.async = true;
      script.src =
        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2501951323412290';
      script.crossOrigin = 'anonymous';
      script.onload = () => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      };
      document.body.appendChild(script);
    } else {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);

  return (
    <ins
      className='adsbygoogle block my-6'
      style={{ display: 'block' }}
      data-ad-client='ca-pub-2501951323412290'
      data-ad-slot='1234567890'
      data-ad-format='auto'
      data-full-width-responsive='true'
    ></ins>
  );
}
