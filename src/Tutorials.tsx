import checkbox from './assets/away_from_work_checkbox.jpg';
import names from './assets/first_last_name.jpg';
import modeSelector from './assets/mode_selector.jpg';
import previousNext from './assets/previous_next_month.jpg';
import print from './assets/print_button.jpg';
import reasonOut from './assets/reason_out_extended.jpg';
import summary from './assets/summary.jpg';
import timeSelected from './assets/time_selected.jpg';
import Navigation from './components/Navigation';

export default function Tutorials(): JSX.Element {
  return (
    <>
      <article className='max-w-3xl mx-auto space-y-10 text-gray-800 leading-relaxed'>
        <header className='space-y-2'>
          <h1 className='text-3xl font-semibold tracking-tight'>
            Úvod k ovládacím provkom na stránke
          </h1>
          <p className='text-sm text-gray-500'>
            V tejto sekcii sa dočítate ako obsluhovať ovládacie prvky na stránke
          </p>
        </header>

        {/* Pôvodné vysvetlenie sekcií */}
        <section className='space-y-3'>
          <h2 className='text-2xl font-semibold'>Osobné údaje</h2>
          <img className='w-full md:w-6/12' src={names} alt='full name' />
          <p>
            Vyplňte meno a priezvisko, ktoré sa zobrazia pri tlači. Údaje sa
            nikam neposielajú.
          </p>
        </section>

        <section className='space-y-3'>
          <h2 className='text-2xl font-semibold'>Prepínanie mesiaca</h2>
          <img
            className='w-full md:w-6/12'
            src={previousNext}
            alt='prevoius next month selector'
          />
          <p>
            Pomocou tlačidiel{' '}
            <kbd className='inline-block align-middle border px-2 py-0.5 rounded text-sm font-mono bg-gray-100'>
              Predchádzajúci mesiac
            </kbd>{' '}
            a{' '}
            <kbd className='inline-block align-middle border px-2 py-0.5 rounded text-sm font-mono bg-gray-100'>
              Nasledujúci mesiac
            </kbd>{' '}
            prepínate obdobie, ktoré chcete vyplniť.
          </p>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold'>Režimy dochádzky</h2>
          <img
            className='md:w-4/12 sm:w-6/12 w-8/12'
            src={modeSelector}
            alt='mode selector'
          />
          <dl className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <div className='space-y-1 rounded-lg border p-4'>
              <dt className='font-semibold'>Štandardný mód</dt>
              <dd className='text-gray-600'>
                Pre zamestnancov na trvalý pracovný pomer.
              </dd>
            </div>
            <div className='space-y-1 rounded-lg border p-4'>
              <dt className='font-semibold'>Skrátený mód</dt>
              <dd className='text-gray-600'>
                Pre dôchodcov a brigádnikov, max. 40 hodín týždenne.
              </dd>
            </div>
          </dl>
          <p
            role='note'
            className='border-l-4 border-amber-400 bg-amber-50 p-4 text-amber-900'
          >
            <em>Skrátený režim neobsahuje údaje o obedoch.</em>
          </p>
        </section>

        <section className='space-y-3'>
          <h2 className='text-2xl font-semibold'>Označenie neprítomnosti</h2>
          <img
            className='w-full md:w-6/12'
            src={checkbox}
            alt='away from work selection'
          />

          <p>
            V stĺpci <strong>Mimo práce</strong> označte dni, kedy ste
            nepracovali, a vyberte dôvod.
          </p>
          <img src={reasonOut} alt='select reason for being out' />
        </section>

        <section className='space-y-3'>
          <h2 className='text-2xl font-semibold'>Súhrn a výpočet hodín</h2>
          <img
            className='w-full md:w-6/12'
            src={summary}
            alt='summary for the month'
          />

          <p>
            Súhrn v spodnej časti zobrazuje odpracované dni a hodiny po zadaní
            neprítomností.
          </p>
        </section>

        <section className='space-y-3'>
          <h2 className='text-2xl font-semibold'>Tlač</h2>
          <img src={print} alt='print button' />

          <p>
            Stlačte{' '}
            <kbd className='inline-block align-middle border px-2 py-0.5 rounded text-sm font-mono bg-gray-100'>
              Tlačiť
            </kbd>{' '}
            pre náhľad a uloženie alebo tlač.
          </p>
        </section>
      </article>

      <article className='max-w-3xl mx-auto space-y-10 text-gray-800 leading-relaxed mt-8'>
        <header className='space-y-2'>
          <h1 className='text-3xl font-semibold tracking-tight'>
            Návody k vyplneniu a efektívnemu používaniu dochádzky
          </h1>
          <p className='text-sm text-gray-500'>
            Dva podrobné návody, ktoré vás prevedú nielen vyplnením dochádzky,
            ale aj jej efektívnym využívaním v praxi.
          </p>
        </header>

        {/* Tutorial 1 */}
        <section className='space-y-4'>
          <h2 className='text-2xl font-bold'>
            1. Kompletný sprievodca vyplnením dochádzky
          </h2>
          <p>
            Tento návod vás prevedie celým procesom od otvorenia stránky až po
            úspešnú tlač. Je určený pre každého používateľa – či už ste
            zamestnanec na plný úväzok, brigádnik, alebo dôchodca pracujúci na
            skrátený úväzok.
          </p>
          <h3 className='text-xl font-semibold'>Krok 1: Otvorenie aplikácie</h3>
          <p>
            Po načítaní stránky <strong>vykazuje.me</strong> sa zobrazí úvodná
            obrazovka. V ľavom menu si môžete vybrať sekciu <em>Dochádzka</em>.
            Ak používate aplikáciu prvýkrát, odporúčame si prečítať aj časť s
            častými otázkami.
          </p>

          <h3 className='text-xl font-semibold'>
            Krok 2: Zadanie osobných údajov
          </h3>
          <p>
            V hornej časti formulára nájdete polia pre meno a priezvisko.
            Vyplňte ich presne tak, ako chcete, aby sa zobrazili na tlačenej
            dochádzke. Údaje zostávajú iba vo vašom prehliadači a nikam sa
            neodosielajú.
          </p>

          <h3 className='text-xl font-semibold'>Krok 3: Výber obdobia</h3>
          <p>
            Pomocou tlačidiel{' '}
            <kbd className='inline-block align-middle border px-2 py-0.5 rounded text-sm font-mono bg-gray-100'>
              Predchádzajúci mesiac
            </kbd>{' '}
            a{' '}
            <kbd className='inline-block align-middle border px-2 py-0.5 rounded text-sm font-mono bg-gray-100'>
              Nasledujúci mesiac
            </kbd>{' '}
            môžete rýchlo prechádzať medzi mesiacmi. Aktuálne zobrazené obdobie
            vidíte v hornej časti nástroja.
          </p>

          <h3 className='text-xl font-semibold'>
            Krok 4: Výber režimu dochádzky
          </h3>
          <p>
            Prepínač režimu vám umožní nastaviť <em>štandardný</em> alebo{' '}
            <em>skrátený</em> mód. Štandardný mód obsahuje všetky pracovné dni a
            časové rozvrhy pre plný úväzok. Skrátený mód má skrátený počet
            pracovných dní a hodín podľa legislatívy pre brigádnikov a
            dôchodcov.
          </p>

          <h3 className='text-xl font-semibold'>
            Krok 5: Označenie neprítomnosti
          </h3>
          <p>
            V tabuľke pri jednotlivých dňoch môžete kliknúť na zaškrtávacie
            políčko <strong>Mimo práce</strong>. Po označení sa zobrazí ponuka
            dôvodov – dovolenka, lekár, PN a iné. Je však nutné kliknúť na
            prednastavený dôvod <strong>dovolenka</strong> a ponkua s inými
            dôvodmi sa otvorí.
          </p>

          <h3 className='text-xl font-semibold'>
            Krok 6: Úprava pracovného času
          </h3>
          <p>
            Ak je potrebné zmeniť čas príchodu alebo odchodu, kliknite do
            príslušného políčka a upravte hodnotu. Časy sa okamžite zohľadnia v
            súhrne.
          </p>

          <h3 className='text-xl font-semibold'>Krok 7: Tlač alebo uloženie</h3>
          <p>
            Po dokončení kliknite na tlačidlo <kbd>Tlačiť</kbd>. Prehliadač
            otvorí náhľad tlače, kde môžete dokument priamo vytlačiť alebo
            uložiť ako PDF.
          </p>

          <p>
            Takto vyplnená dochádzka je pripravená na odovzdanie
            zamestnávateľovi alebo archívne účely. Celý proces trvá menej než
            minútu.
          </p>
        </section>

        {/* Tutorial 2 */}
        <section className='space-y-4'>
          <h2 className='text-2xl font-bold'>
            2. Tipy a triky pre efektívne používanie dochádzkového nástroja
          </h2>
          <p>
            Tento návod vám ukáže, ako z nástroja <strong>vykazuje.me</strong>{' '}
            vyťažiť maximum. Naučíte sa zrýchliť prácu, vyhnúť sa chybám a
            získať čisté a prehľadné dokumenty.
          </p>

          <h3 className='text-xl font-semibold'>
            Používajte klávesové skratky
          </h3>
          <p>
            Väčšina moderných prehliadačov umožňuje rýchle prepínanie medzi
            poliami pomocou klávesu <kbd>Tab</kbd>. Po vyplnení jedného políčka
            stlačte <kbd>Tab</kbd> na presun do ďalšieho. To vám ušetrí čas pri
            úprave viacerých dní.
          </p>

          <h3 className='text-xl font-semibold'>Rýchle zmena časov</h3>
          <p>
            Šipkami nahor a nadol dokážete pridávať alebo uberať časové hodnoty
            v prípade že ste na danom výbere. Spoznáťe to tak, že pole je
            namodro podsvietené ako na nasledujúcom obrázku:
            <img
              className='w-full md:w-3/12'
              src={timeSelected}
              alt='selected time'
            />
          </p>

          <h3 className='text-xl font-semibold'>Kontrola pred tlačou</h3>
          <p>
            Pred stlačením tlačidla <kbd>Tlačiť</kbd> si prejdite súhrn v
            spodnej časti stránky. Uistite sa, že počet odpracovaných dní a
            hodín zodpovedá realite. Ak nie, skontrolujte, či niektorý deň nie
            je nesprávne označený ako neprítomnosť.
          </p>

          <h3 className='text-xl font-semibold'>Používajte uloženie do PDF</h3>
          <p>
            Ak potrebujete dochádzku odoslať e-mailom, odporúčame použiť funkciu{' '}
            <em>Uložiť ako PDF</em>. Takto si zabezpečíte, že dokument zostane v
            nezmenenej podobe.
          </p>

          <h3 className='text-xl font-semibold'>Práca offline</h3>
          <p>
            Nástroj funguje aj bez pripojenia k internetu, ak je už raz načítaný
            v prehliadači. Môžete teda vyplniť dochádzku aj vtedy, keď ste na
            cestách alebo bez signálu.
          </p>

          <h3 className='text-xl font-semibold'>Minimalizácia chýb</h3>
          <p>
            Najčastejšie chyby vznikajú pri nesprávnom nastavení režimu
            (štandardný/skrátený). Preto vždy pred vyplnením skontrolujte, v
            akom režime sa nachádzate.
          </p>

          <h3 className='text-xl font-semibold'>Záver</h3>
          <p>
            Dodržiavaním týchto tipov bude vaša práca s dochádzkovým nástrojom
            rýchla, presná a ušetrí vám veľa času.
          </p>
        </section>
      </article>
      <Navigation />
    </>
  );
}
