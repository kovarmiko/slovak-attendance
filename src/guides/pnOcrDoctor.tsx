import React from 'react';

export default function PnOcrDoctor(): JSX.Element {
  return (
    <article className='max-w-3xl mx-auto space-y-6 py-8 text-gray-800 leading-relaxed'>
      <header className='space-y-2'>
        <h1 className='text-3xl font-semibold'>PN, OČR a lekár: Ako ich správne vykazovať</h1>
        <p className='text-gray-600'>Ako označiť dni mimo práce a vyhnúť sa chybám.</p>
      </header>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Základné typy neprítomnosti</h2>
        <ul className='list-disc list-inside'>
          <li><strong>PN</strong>: práceneschopnosť potvrdená lekárom,</li>
          <li><strong>OČR</strong>: starostlivosť o člena rodiny,</li>
          <li><strong>Lekár</strong>: návšteva lekára v pracovnom čase,</li>
          <li><strong>Dovolenka</strong>, <strong>Neplatené voľno</strong>, <strong>Kompenzačné</strong>, <strong>Iné</strong>.</li>
        </ul>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Postup v aplikácii</h2>
        <ol className='list-decimal list-inside space-y-1'>
          <li>Zaškrtnite stĺpec <em>Mimo práce</em> pri danom dni.</li>
          <li>Vyberte konkrétny dôvod z rozbalovacieho zoznamu.</li>
          <li>Skontrolujte, že v riadku nie sú vyplnené časy príchodu/odchodu.</li>
        </ol>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Časté chyby</h2>
        <ul className='list-disc list-inside'>
          <li>odškrtnutie neprítomnosti bez výberu dôvodu,</li>
          <li>súbežné vyplnenie príchodu/odchodu aj neprítomnosti,</li>
          <li>nesprávny počet dní v súhrne (zabudnuté sviatky alebo víkendy).</li>
        </ul>
      </section>
    </article>
  );
}
