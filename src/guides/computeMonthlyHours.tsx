import React from 'react';
import AdUnit from '../components/AdUnit';

export default function ComputeMonthlyHours(): JSX.Element {
  return (
    <article className='max-w-3xl mx-auto space-y-6 py-8 text-gray-800 leading-relaxed'>
      <header className='space-y-2'>
        <h1 className='text-3xl font-semibold'>Ako vypočítať odpracované hodiny za mesiac</h1>
        <p className='text-gray-600'>Praktická metodika výpočtu pre štandardný aj skrátený režim.</p>
      </header>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Základný princíp</h2>
        <p>
          Odpracovaný čas sa počíta od príchodu po odchod. V <strong>štandardnom režime</strong> sa do výsledku
          nezapočítava <em>prestávka na obed</em>; v nástroji sa preto automaticky upravuje čas odchodu podľa zvolenej
          dĺžky prestávky (30/40/50/60 min). V <strong>skrátenom režime</strong> sa prestávky nepoužívajú a rátajú sa
          čisté hodiny.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Pracovné dni a sviatky</h2>
        <p>
          Do výpočtu zahrňte iba pracovné dni (pondelok–piatok) mimo štátnych sviatkov. Aplikácia <em>Vykazujeme</em>
          sviatky pre roky 2025–2027 zohľadňuje automaticky.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Príklad pre štandardný režim</h2>
        <p>
          Pri príchode o 07:00, odchode o 15:40 a obede 40 min trvá pracovný čas 8 hodín + 40 min. Ak zmeníte obed na
          60 min, odchod sa posunie na 16:00. V prehľade sa započítava vždy <em>8 hodín práce</em> denne.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Príklad pre skrátený režim</h2>
        <p>
          Pri skrátenom režime aplikácia ráta súčet rozdielov medzi príchodom a odchodom pre každý aktívny pracovný deň.
          Výsledok sa zaokrúhľuje na dve desatinné miesta.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Kontrola pred odovzdaním</h2>
        <ul className='list-disc list-inside'>
          <li>skontrolujte správny mesiac a rok,</li>
          <li>overte sviatky a víkendy,</li>
          <li>prejdite si označené PN/OČR/dovolenku,</li>
          <li>porovnajte sumár odpracovaných dní/hodín s dohodou.</li>
        </ul>
      </section>
      <AdUnit />
    </article>
  );
}
