import React from 'react';
import ProtectedEmail from './components/ProtectedEmail';

export default function Contact(): JSX.Element {
  return (
    <div className="flex items-center justify-center min-h-full py-10">
      <div className="max-w-2xl w-full bg-white/90 border border-gray-200 rounded-lg shadow p-6 space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center">Kontakt</h1>
        <p className="text-gray-700">
          Máte otázky, spätnú väzbu alebo návrhy na zlepšenie? Ozvite sa nám.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 text-gray-800">
          <div className="space-y-1">
            <h2 className="font-semibold">Prevádzkovateľ</h2>
            <p>Pinit, s.r.o.</p>
            <p>IČO: 54 416 841</p>
            <p>Slovenská republika</p>
          </div>
          <div className="space-y-1">
            <h2 className="font-semibold">Kontakt</h2>
            <div className='flex items-center gap-2'>
              <span className='shrink-0'>Email:</span>
              <ProtectedEmail user='info' domain='vykazuje.me' />
            </div>
            <p>Web: <a href="https://vykazuje.me" className="text-blue-600 hover:underline">vykazuje.me</a></p>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          Na túto adresu prosím neposielajte osobné údaje. Neposkytujeme individuálnu technickú podporu
          k zariadeniam; odpovedáme na otázky k samotnej aplikácii a jej fungovaniu.
        </p>
      </div>
    </div>
  );
}
