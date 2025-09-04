import React from 'react';

export default function HolidaysAndAttendance(): JSX.Element {
  return (
    <article className='max-w-3xl mx-auto space-y-6 py-8 text-gray-800 leading-relaxed'>
      <header className='space-y-2'>
        <h1 className='text-3xl font-semibold'>Sviatky a dochádzka 2025–2027</h1>
        <p className='text-gray-600'>Ako správne započítať štátne sviatky do mesačnej dochádzky.</p>
      </header>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Prečo riešiť sviatky</h2>
        <p>
          Štátne sviatky sa nezapočítavajú do pracovných dní a znižujú počet dní, ktoré treba vyplniť.
          <em>Vykazujeme</em> sviatky eviduje pre roky 2025–2027 a automaticky ich vynechá v tabuľke.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Pohyblivé sviatky</h2>
        <p>
          Veľkonočné sviatky (Veľký piatok a Veľkonočný pondelok) sa menia každý rok. Aplikácia ich vypočíta podľa
          dátumu Veľkej noci a správne ich označí.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Základné odporúčania</h2>
        <ul className='list-disc list-inside'>
          <li>nevyplňujte príchod/odchod na sviatok,</li>
          <li>ak musí byť dochádzka jednotne formátovaná, nechajte políčka prázdne,</li>
          <li>ak ste pracovali počas sviatku, riaďte sa internými pravidlami firmy (náhradné voľno/príplatky).</li>
        </ul>
      </section>
    </article>
  );
}
