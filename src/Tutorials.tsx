export default function Tutorials(): JSX.Element {
  return (
    <article className='max-w-3xl mx-auto space-y-10 text-gray-800 leading-relaxed'>
      <header className='space-y-2'>
        <h1 className='text-3xl font-semibold tracking-tight'>
          Návod k vyplneniu dochádzky
        </h1>
        <p className='text-sm text-gray-500'>
          Stručné pokyny pre vyplnenie, tlač a označovanie neprítomnosti.
        </p>
      </header>

      <section className='space-y-3'>
        <h2 className='text-2xl font-semibold'>Osobné údaje</h2>
        <p>
          V týchto dvoch poliach si vyplňte vaše meno a priezvisko. Tieto údaje
          sa zobrazia pri tlači.
        </p>
      </section>

      <section className='space-y-3'>
        <h2 className='text-2xl font-semibold'>Prepínanie mesiaca</h2>
        <p>
          Tieto dve tlačidlá slúžia na prepínanie mesiaca. Ak sa vám napríklad
          zobrazuje
          <span className='font-semibold'> Obdobie: máj 2025</span> a želáte si
          vyplniť dochádzku za jún, stlačte tlačidlo &nbsp;
          <kbd className='inline-block align-middle border px-2 py-0.5 rounded text-sm font-mono bg-gray-100'>
            Nasledujúci mesiac
          </kbd>
          &nbsp; raz. V prípade, že potrebujete iný mesiac, opakujte stláčanie v
          smere, v akom potrebujete.
        </p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-2xl font-semibold'>Režimy dochádzky</h2>
        <p>Na stránke sa nachádza prepínač na dochádzkový mód.</p>

        <dl className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='space-y-1 rounded-lg border p-4'>
            <dt className='font-semibold'>Štandardný mód</dt>
            <dd className='text-gray-600'>
              Slúži pre dochádzku zamestnancov na trvalý pracovný pomer.
            </dd>
          </div>

          <div className='space-y-1 rounded-lg border p-4'>
            <dt className='font-semibold'>Skrátený mód</dt>
            <dd className='text-gray-600'>
              Určený pre dôchodcov a brigádnikov, ktorí môžu odpracovať iba 40
              hodín týždenne.
            </dd>
          </div>
        </dl>

        <p
          role='note'
          className='border-l-4 border-amber-400 bg-amber-50 p-4 text-amber-900'
        >
          <em>
            Prosím, vezmite na vedomie, že skrátený režim neobsahuje údaje o
            obedoch, v súlade so štandardom.
          </em>
        </p>
      </section>

      <section className='space-y-3'>
        <h2 className='text-2xl font-semibold'>Označenie neprítomnosti</h2>
        <p>
          <span>
            Stĺpec <span className='font-semibold'>Mimo práce</span> Vám
            umožnuje zvoliť si dni kedy ste nepracovali.
          </span>
        </p>
        <p className='inline-flex items-center gap-2'>
          <span>Kliknutím na tento checkbox</span>
          <span
            aria-hidden='true'
            className='inline-flex h-5 w-5 items-center justify-center rounded border'
          >
            ☑️
          </span>
          <span>si viete vybrať také dni.</span>
        </p>
        <p>
          Po výbere sa zobrazí zoznam dôvodov neprítomnosti. Tu si môžete vybrať
          jeden zo štandardných dôvodov. Prednastaveným dôvodom je{' '}
          <span className='font-semibold'>dovolenka</span>.
        </p>
      </section>

      <section className='space-y-3'>
        <h2 className='text-2xl font-semibold'>Súhrn a výpočet hodín</h2>
        <p>
          Vyberte všetky dni, kedy ste neboli v práci. Zvoľte dôvody a potom sa
          vám v spodnej časti nástroja zobrazí súhrn. Nástroj predpokladá
          8-hodinový pracovný deň a 40 minút na obed, ktorý nie je zahrnutý v
          hodinách.
        </p>
      </section>

      <section className='space-y-3'>
        <h2 className='text-2xl font-semibold'>Tlač</h2>
        <p>
          Keď budete hotoví, stlačte &nbsp;
          <kbd className='inline-block align-middle border px-2 py-0.5 rounded text-sm font-mono bg-gray-100'>
            Tlačiť
          </kbd>
          &nbsp;a náhľad tlače sa vám zobrazí, odkiaľ môžete spustiť tlač alebo
          uložiť súbor ako PDF.
        </p>
      </section>
    </article>
  );
}
