import React from 'react';

export default function PrivacySecurity(): JSX.Element {
  return (
    <article className='max-w-3xl mx-auto space-y-6 py-8 text-gray-800 leading-relaxed'>
      <header className='space-y-2'>
        <h1 className='text-3xl font-semibold'>Ochrana súkromia a bezpečnosť údajov v dochádzke</h1>
        <p className='text-gray-600'>Ako pracovať s osobnými údajmi zodpovedne a bezpečne.</p>
      </header>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Minimálny rozsah údajov</h2>
        <p>
          Zadávajte iba údaje, ktoré sú potrebné: meno, priezvisko a čas príchodu/odchodu. Citlivé údaje do dokladov
          nepatria. Aplikácia <em>Vykazujeme</em> spracúva údaje lokálne v prehliadači.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Bezpečné zdieľanie</h2>
        <ul className='list-disc list-inside'>
          <li>pri posielaní PDF použite heslo alebo zabezpečený firemný kanál,</li>
          <li>archivujte dokumenty na dôveryhodnom mieste,</li>
          <li>po prenose citlivé súbory vymažte zo zdieľaných zariadení.</li>
        </ul>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Súlad s GDPR</h2>
        <p>
          Základné informácie nájdete v časti <a href='/privacy' className='text-blue-700 underline'>Ochrana súkromia</a>.
          Pri otázkach kontaktujte prevádzkovateľa na <a href='mailto:info@vykazuje.me' className='text-blue-700 underline'>info@vykazuje.me</a>.
        </p>
      </section>
    </article>
  );
}

