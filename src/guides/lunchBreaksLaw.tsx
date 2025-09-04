import React from 'react';
import AdUnit from '../components/AdUnit';

export default function LunchBreaksLaw(): JSX.Element {
  return (
    <article className='max-w-3xl mx-auto space-y-6 py-8 text-gray-800 leading-relaxed'>
      <header className='space-y-2'>
        <h1 className='text-3xl font-semibold'>Prestávka na obed: Čo hovorí zákon a prax</h1>
        <p className='text-gray-600'>Základné povinnosti a odporúčané nastavenia v dochádzke.</p>
      </header>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Legislatívne minimum</h2>
        <p>
          Zamestnanec má pri práci dlhšej ako 6 hodín nárok na bezpečnostnú prestávku, zvyčajne 30 minút. V praxi býva
          obed 30–60 min podľa interných pravidiel. Aplikácia umožňuje 30/40/50/60 min v štandardnom móde.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Najčastejšie voľby</h2>
        <ul className='list-disc list-inside'>
          <li>30 min pri kratších zmenách,</li>
          <li>40 min ako vyvážený kompromis,</li>
          <li>60 min pri dlhších zmenách alebo firemných politikách.</li>
        </ul>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Tipy</h2>
        <ul className='list-disc list-inside'>
          <li>pri tlači sa výber nezobrazuje – ostane len výsledný čas,</li>
          <li>dĺžka obeda sa započíta do <em>odchodu</em>, nie do pracovného času,</li>
          <li>pri skrátenom režime sa obedy neriešia.</li>
        </ul>
      </section>
      <AdUnit />
    </article>
  );
}
