import React from 'react';
import AdUnit from '../components/AdUnit';

export default function ExportTips(): JSX.Element {
  return (
    <article className='max-w-3xl mx-auto space-y-6 py-8 text-gray-800 leading-relaxed'>
      <header className='space-y-2'>
        <h1 className='text-3xl font-semibold'>Export do CSV a Excelu: Praktické tipy</h1>
        <p className='text-gray-600'>Ako predísť chybám s formátmi, diakritikou a časom.</p>
      </header>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Kedy použiť CSV</h2>
        <p>
          CSV je ľahký a univerzálny formát. Vhodné na import do iných systémov. Pri otvorení v Exceli zvoľte kódovanie
          UTF‑8 a oddeľovač čiarka, aby sa správne zobrazila diakritika a stĺpce.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Kedy použiť Excel</h2>
        <p>
          Excel (XLSX) lepšie zachová typy buniek a vyžaduje menej nastavovania. Je ideálny na interné spracovanie
          alebo archiváciu.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Tipy na formát času</h2>
        <ul className='list-disc list-inside'>
          <li>formát buniek nastavte na <em>Čas</em> alebo <em>Vlastný</em> (hh:mm),</li>
          <li>pri CSV nepreformátujte príchod/odchod na dátum,</li>
          <li>pred exportom skontrolujte, že polia neobsahujú medzery naviac.</li>
        </ul>
      </section>
      <AdUnit />
    </article>
  );
}
