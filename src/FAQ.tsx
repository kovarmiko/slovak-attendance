export default function FAQ(): JSX.Element {
  return (
    <article className='max-w-3xl mx-auto space-y-8 text-gray-800 leading-relaxed'>
      <header className='space-y-2'>
        <h1 className='text-3xl font-semibold tracking-tight'>Časté otázky</h1>
        <p className='text-sm text-gray-500'>Odpovede na najčastejšie otázky k nástroju.</p>
      </header>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Ukladáte moje osobné údaje?</h2>
        <p>
          Nie. Všetko, čo na stránke zadáte, zostáva vo vašom prehliadači a nikam
          sa neposiela.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Je služba platená?</h2>
        <p>Služba je úplne bezplatná a nevyžaduje žiadne poplatky.</p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Môžem si dochádzku uložiť na neskôr?</h2>
        <p>
          Momentálne neponúkame možnosť uloženia dochádzky. Je potrebné si ju
          vytlačiť alebo exportovať hneď po vyplnení.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Aké prestávky na obed sú podporované?</h2>
        <p>Aktuálne je podporovaná iba 40-minútová prestávka na obed.</p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Dá sa nahlásiť nadčas?</h2>
        <p>Nástroj zatiaľ neumožňuje evidovať nadčasy.</p>
      </section>
    </article>
  );
}
