import React from 'react';
import AdUnit from '../components/AdUnit';

export default function PartTimeAndAgreements(): JSX.Element {
  return (
    <article className='max-w-3xl mx-auto space-y-6 py-8 text-gray-800 leading-relaxed'>
      <header className='space-y-2'>
        <h1 className='text-3xl font-semibold'>Skrátený úväzok, brigády a dohody: špecifiká dochádzky</h1>
        <p className='text-gray-600'>Ako si zjednodušiť rozpis a mať prehľad o hodinách.</p>
      </header>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Kedy použiť skrátený režim</h2>
        <p>
          Skrátený režim je vhodný pre brigádnikov, dôchodcov a dohodárov. V aplikácii sa aktivuje prepínačom a
          obmedzí sa počet aktívnych dní, pričom prestávky na obed sa nezohľadňujú.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Plánovanie</h2>
        <ul className='list-disc list-inside'>
          <li>rozložte si pracovné dni rovnomerne,</li>
          <li>vyhnite sa náhodným skokom dĺžky pracovnej zmeny,</li>
          <li>pri kolíziách použite <em>Kompenzačné voľno</em> alebo <em>Iné</em> s poznámkou.</li>
        </ul>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Zhrnutie</h2>
        <p>
          Sledujte mesačný súčet hodín v súhrne a uistite sa, že zodpovedá obmedzeniam vašej dohody. Pri kontrole
          overte aj dovolenky a sviatky.
        </p>
      </section>
      <AdUnit />
    </article>
  );
}
