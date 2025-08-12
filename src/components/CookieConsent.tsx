import React, { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setVisible(true);
    }
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
        This site uses cookies only for Google AdSense. By using this site, you agree to the use of cookies for ads.
      </span>
      <button
        onClick={accept}
        className='bg-white text-gray-800 px-4 py-1 rounded'
      >
        Accept
      </button>
    </div>
  );
}

