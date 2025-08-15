import Navigation from './components/Navigation';
import AdUnit from './components/AdUnit';

export default function FAQ(): JSX.Element {
  return (
    <>
      <article className='max-w-3xl mx-auto space-y-8 text-gray-800 leading-relaxed'>
        <header className='space-y-2'>
          <h1 className='text-3xl font-semibold tracking-tight'>Časté otázky</h1>
          <p className='text-sm text-gray-500'>
            Odpovede na najčastejšie otázky k nástroju.
          </p>
        </header>

        <section className='space-y-2'>
          <h2 className='text-xl font-semibold'>Ukladáte moje osobné údaje?</h2>
          <p>
            Nie. Všetko, čo na stránke zadáte, zostáva vo vašom prehliadači a
            nikam sa neposiela. Znamená to, že vaše údaje nikdy neopustia vaše
            zariadenie.
          </p>
        </section>

        <section className='space-y-2'>
          <h2 className='text-xl font-semibold'>Je služba platená?</h2>
          <p>
            Služba je úplne bezplatná a nevyžaduje žiadne poplatky. Môžete ju
            využívať neobmedzene bez akýchkoľvek záväzkov.
          </p>
        </section>

        <section className='space-y-2'>
          <h2 className='text-xl font-semibold'>
            Môžem si dochádzku uložiť na neskôr?
          </h2>
          <p>
            Momentálne neponúkame možnosť uloženia dochádzky. Je potrebné si ju
            vytlačiť alebo exportovať hneď po vyplnení, aby ste o údaje neprišli.
          </p>
        </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>
          Aké prestávky na obed sú podporované?
        </h2>
        <p>
          Aktuálne je podporovaná iba 40-minútová prestávka na obed. Tento čas
          sa automaticky odpočítava z celkového počtu odpracovaných hodín.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Dá sa nahlásiť nadčas?</h2>
        <p>
          Nástroj zatiaľ neumožňuje evidovať nadčasy. Funkcia môže byť pridaná v
          budúcich aktualizáciách podľa záujmu používateľov.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>
          Podporuje nástroj aj mobilné zariadenia?
        </h2>
        <p>
          Áno, stránka je plne responzívna a funguje na mobiloch, tabletoch aj
          počítačoch. Ovládanie je prispôsobené menším obrazovkám, aby ste mohli
          dochádzku vyplniť pohodlne aj na cestách. Odporúčame mať aktuálnu
          verziu prehliadača pre najlepší zážitok.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>
          Môžem upraviť už vyplnené údaje?
        </h2>
        <p>
          Samozrejme. Kedykoľvek počas práce môžete meniť mená, dni, časy aj
          dôvody neprítomnosti. Zmeny sa okamžite prejavia v súhrne a vo výstupe
          na tlač.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>
          Ako sa počítajú odpracované hodiny?
        </h2>
        <p>
          Hodiny sa počítajú od času príchodu po čas odchodu mínus 40-minútová
          prestávka na obed. Pri skrátenom režime sa automaticky obmedzuje počet
          pracovných dní podľa legislatívy. Súhrn sa vždy prepočíta pri
          akejkoľvek zmene v tabuľke.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>
          Je možné exportovať dochádzku do Excelu?
        </h2>
        <p>
          Momentálne nástroj podporuje len tlač do PDF alebo priamo na papier.
          Export do Excelu zatiaľ nie je k dispozícii, ale je v pláne ako budúca
          funkcia.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Funguje nástroj aj offline?</h2>
        <p>
          Áno, po načítaní stránky ju môžete používať aj bez pripojenia na
          internet. Jedinou výnimkou sú aktualizácie alebo nové verzie nástroja,
          ktoré vyžadujú prístup online.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>
          Čo robiť, ak sa mi neotvorí tlačový náhľad?
        </h2>
        <p>
          Skontrolujte, či váš prehliadač neblokuje otváranie vyskakovacích
          okien. Niektoré firemné počítače majú tlačové funkcie obmedzené, vtedy
          skúste iný prehliadač alebo zariadenie. Ak problém pretrváva,
          kontaktujte technickú podporu vašej spoločnosti.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>
          Podporuje nástroj aj rôzne jazyky?
        </h2>
        <p>
          Aktuálne je stránka dostupná iba v slovenskom jazyku. Preklady do
          češtiny a angličtiny sú v príprave. Ak máte záujem o iný jazyk, môžete
          nám napísať návrh.
        </p>
      </section>

      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>
          Je možné pridať vlastné dôvody neprítomnosti?
        </h2>
        <p>
          Momentálne sú dostupné iba prednastavené dôvody ako dovolenka, PN či
          OČR. V budúcnosti plánujeme funkciu na pridanie vlastného dôvodu.
          Dovtedy môžete použiť voľbu „Iné“ a dôvod dopísať do poznámky pri
          tlači.
        </p>
      </section>
      </article>
      <AdUnit />
      <Navigation />
    </>
  );
}
