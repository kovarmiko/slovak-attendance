import React, { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkConsent = async () => {
      const consent = localStorage.getItem('cookie-consent');
      if (consent) {
        return;
      }

      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        if (data?.in_eu) {
          setVisible(true);
        }
      } catch (err) {
        console.error('Failed to determine EU status', err);
      }
    };

    checkConsent();
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className='fixed bottom-0 left-0 w-full bg-gray-800 text-white text-sm p-4 flex flex-col sm:flex-row items-center justify-center gap-2 z-50'>
      <span>
        This site uses advertisement/marketing cookies. By using this site, you agree to their use.
      </span>
      <button
        onClick={() => window.open('https://support.google.com/adsense/answer/7549925?hl=en', '_blank')}
        className='bg-gray-700 text-white px-4 py-1 rounded'
      >
        Learn more
      </button>
      <button
        onClick={accept}
        className='bg-white text-gray-800 px-4 py-1 rounded'
      >
        Accept
      </button>
    </div>
  );
}

