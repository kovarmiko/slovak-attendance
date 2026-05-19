import React, { useEffect, useMemo, useState } from 'react';
import {
  ConsentState,
  defaultConsent,
  readConsent,
  saveConsent,
} from '../lib/consent';

export default function CookieConsent() {
  const existing = useMemo(() => readConsent(), []);
  const [visible, setVisible] = useState(!existing);
  const [customizing, setCustomizing] = useState(false);
  const [state, setState] = useState<ConsentState>(existing || defaultConsent);

  useEffect(() => {
    const open = () => setVisible(true);
    window.addEventListener('openConsent', open);
    return () => window.removeEventListener('openConsent', open);
  }, []);

  const acceptAll = () => {
    const next: ConsentState = {
      analytics_storage: 'granted',
    };
    saveConsent(next);
    setVisible(false);
  };

  const rejectAll = () => {
    saveConsent({ ...defaultConsent });
    setVisible(false);
  };

  const saveCustom = () => {
    saveConsent(state);
    setVisible(false);
    setCustomizing(false);
  };

  if (!visible) return null;

  return (
    <div className='fixed bottom-0 left-0 w-full bg-gray-900 text-white text-sm p-4 z-50 shadow-lg'>
      <div className='max-w-5xl mx-auto flex flex-col gap-3'>
        <div className='flex flex-col gap-2'>
          <span className='font-medium'>Nastavenia súborov cookie</span>
          <p className='text-gray-200'>
            Používame súbory cookie na základné fungovanie webu a, s vaším
            súhlasom, aj na anonymnú analýzu návštevnosti. Vaše voľby môžete
            kedykoľvek zmeniť v časti „Nastavenia cookies“.
          </p>
        </div>

        {customizing ? (
          <div className='bg-gray-800/70 p-3 rounded'>
            <fieldset className='space-y-2'>
              <legend className='font-medium'>Analytika</legend>
              <label className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  checked={state.analytics_storage === 'granted'}
                  onChange={(e) =>
                    setState((s) => ({ ...s, analytics_storage: e.target.checked ? 'granted' : 'denied' }))
                  }
                />
                Analytické cookies
              </label>
            </fieldset>
          </div>
        ) : null}

        <div className='flex flex-wrap gap-2 justify-end'>
          {!customizing ? (
            <>
              <button
                onClick={rejectAll}
                className='bg-gray-700 hover:bg-gray-600 text-white px-4 py-1 rounded'
              >
                Odmietnuť všetko
              </button>
              <button
                onClick={() => setCustomizing(true)}
                className='bg-white text-gray-900 hover:bg-gray-100 px-4 py-1 rounded'
              >
                Prispôsobiť
              </button>
              <button
                onClick={acceptAll}
                className='bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded'
              >
                Prijať všetko
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setCustomizing(false)}
                className='bg-gray-700 hover:bg-gray-600 text-white px-4 py-1 rounded'
              >
                Späť
              </button>
              <button
                onClick={saveCustom}
                className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded'
              >
                Uložiť voľby
              </button>
            </>
          )}
        </div>

        <div className='text-xs text-gray-300'>
          Viac informácií v časti{' '}
          <a href='/privacy' className='underline'>Ochrana súkromia</a>.
        </div>
      </div>
    </div>
  );
}
