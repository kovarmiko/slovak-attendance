import React from 'react';

export default function Privacy(): JSX.Element {
  return (
    <div className="flex items-center justify-center min-h-full py-10">
      <div className="max-w-2xl w-full bg-white/90 border border-gray-200 rounded-lg shadow p-6 space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center">Ochrana súkromia</h1>
        <p className="text-gray-700">
          Vaše súkromie je pre nás dôležité. Táto politika opisuje, aké údaje zbierame a ako ich používame.
        </p>
        <p className="text-gray-700">
          Webová stránka používa súbory cookies na zabezpečenie správneho fungovania a na anonymné meranie návštevnosti.
          Cookies si môžete vo svojom prehliadači kedykoľvek vypnúť alebo vymazať.
        </p>
        <p className="text-gray-700">
          Zhromaždené údaje nepredávame ani neposkytujeme tretím stranám a slúžia výhradne na zlepšovanie našich služieb.
        </p>
      </div>
    </div>
  );
}

