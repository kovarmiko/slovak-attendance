import React from 'react';
import { openConsentModal } from './lib/consent';
import ProtectedEmail from './components/ProtectedEmail';

export default function Privacy(): JSX.Element {
  return (
    <div className='flex items-center justify-center min-h-full py-10'>
      <div className='max-w-2xl w-full bg-white/90 border border-gray-200 rounded-lg shadow p-6 space-y-4'>
        <h1 className='text-3xl md:text-4xl font-bold text-center'>
          Ochrana súkromia
        </h1>
        <p className='text-xs text-gray-500 text-center'>
          Naposledy aktualizované: 3. 9. 2025
        </p>

        <section className='space-y-2'>
          <h2 className='text-xl font-semibold'>Prehľad</h2>
          <p className='text-gray-700'>
            Vaše súkromie je dôležité. Na tejto stránke vysvetľujeme, aké údaje
            spracúvame, na aký účel a aké máte možnosti voľby.
          </p>
        </section>

        <section className='space-y-2'>
          <h2 className='text-xl font-semibold'>
            Cookies a súvisiace technológie
          </h2>
          <p className='text-gray-700'>
            Na stránke používame súbory cookie potrebné na základné fungovanie
            webu (napr. bezpečnosť, predvoľby). Na základe vášho súhlasu môžeme
            používať aj analytické cookies.
          </p>
          <ul className='list-disc list-inside text-gray-700 space-y-1'>
            <li>
              <strong>Funkčné a bezpečnostné</strong>: nevyhnutné pre chod webu.
            </li>
            <li>
              <strong>Analytické</strong>: anonymné meranie návštevnosti (iba ak
              udelíte súhlas).
            </li>
          </ul>
        </section>

        <section className='space-y-2'>
          <h2 className='text-xl font-semibold'>Analytika a súhlas</h2>
          <p className='text-gray-700'>
            Analytické cookies používame iba po vašom súhlase a slúžia na
            anonymné meranie návštevnosti a zlepšovanie služby. Štandardne sú
            analytické cookies nastavené na <em>odmietnuté</em>.
          </p>
        </section>

        <section className='space-y-2'>
          <h2 className='text-xl font-semibold'>Správa súhlasu</h2>
          <p className='text-gray-700'>
            Vaše voľby môžete kedykoľvek zmeniť alebo odvolať. Kliknite na
            tlačidlo nižšie a otvorte nastavenia cookies.
          </p>
          <button
            onClick={openConsentModal}
            className='bg-gray-900 text-white px-4 py-1 rounded'
          >
            Nastavenia cookies
          </button>
        </section>

        <section className='space-y-2'>
          <h2 className='text-xl font-semibold'>Kontaktné údaje</h2>
          <p className='text-gray-700'>
            Prevádzkovateľ: Pinit, s.r.o. — Slovenská republika (IČO: 54 416
            841).
            <br />
            Kontakt:{' '}
            <a
              href='mailto:info@vykazuje.me'
              className='text-blue-600 underline'
            >
              <ProtectedEmail user='info' domain='vykazuje.me' />
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
