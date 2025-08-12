import React from 'react';

export default function Terms(): JSX.Element {
  return (
    <div className="flex items-center justify-center min-h-full py-10">
      <div className="max-w-2xl w-full bg-white/90 border border-gray-200 rounded-lg shadow p-6 space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center">Podmienky používania</h1>
        <p className="text-gray-700">
          Tento nástroj je dostupný zadarmo pre všetkých používateľov. Používaním stránky súhlasíte s nasledujúcimi
          pravidlami:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Softvér je možné používať bezplatne a bez obmedzení.</li>
          <li>Autor nezodpovedá za prípadné škody spôsobené používaním nástroja.</li>
          <li>Nástroj je poskytovaný "tak ako je" bez akejkoľvek záruky správnosti alebo dostupnosti.</li>
          <li>Je zakázané využívať nástroj na nelegálne účely alebo na poškodenie iných osôb.</li>
          <li>Prevádzkovateľ si vyhradzuje právo kedykoľvek upraviť alebo ukončiť poskytovanie služby.</li>
        </ul>
      </div>
    </div>
  );
}

