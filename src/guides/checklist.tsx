import React from 'react';

export default function Checklist(): JSX.Element {
  return (
    <article className='max-w-3xl mx-auto space-y-6 py-8 text-gray-800 leading-relaxed'>
      <header className='space-y-2'>
        <h1 className='text-3xl font-semibold'>Kontrolný zoznam pred odovzdaním dochádzky</h1>
        <p className='text-gray-600'>Päť minút kontroly ušetrí hodiny vracania dokumentu.</p>
      </header>

      <ol className='list-decimal list-inside space-y-2'>
        <li>Je nastavený správny mesiac a rok?</li>
        <li>Sedia všetky sviatky a víkendy bez príchodu/odchodu?</li>
        <li>Sú správne označené PN/OČR/Dovolenka a bez vyplnených časov?</li>
        <li>Pasuje súčet odpracovaných dní/hodín s dohodou?</li>
        <li>Je dokument čitateľný, bez nadbytočných poznámok a chýb?</li>
      </ol>

      <p>
        Po kontrole použite <strong>Tlačiť</strong> a <em>Uložiť ako PDF</em> alebo export do Excelu/CSV podľa požiadaviek
        zamestnávateľa.
      </p>
    </article>
  );
}

