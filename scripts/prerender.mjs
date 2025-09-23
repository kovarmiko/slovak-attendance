import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { mkdir, readFile, rm, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
});

// Component entry points and metadata for routes we want to prerender
const pages = {
  index: {
    path: '/',
    url: '/src/About.tsx',
    title: 'Vykazujeme – O projekte',
    description: 'Informácie o projekte Vykazujeme.',
  },
  faq: {
    path: '/faq',
    url: '/src/FAQ.tsx',
    title: 'Vykazujeme – FAQ',
    description: 'Často kladené otázky k službe Vykazujeme.',
  },
  tutorials: {
    path: '/tutorials',
    url: '/src/Tutorials.tsx',
    title: 'Vykazujeme – Tutoriály',
    description: 'Návody na používanie služby Vykazujeme.',
  },
  guides: {
    path: '/guides',
    url: '/src/Guides.tsx',
    title: 'Vykazujeme – Články',
    description: 'Praktické články a návody k dochádzke, PN, OČR, exportom a sviatkom.',
  },
  terms: {
    path: '/terms',
    url: '/src/Terms.tsx',
    title: 'Vykazujeme – Podmienky',
    description: 'Podmienky používania služby Vykazujeme.',
  },
  privacy: {
    path: '/privacy',
    url: '/src/Privacy.tsx',
    title: 'Vykazujeme – Ochrana súkromia',
    description: 'Informácie o spracúvaní údajov a súboroch cookie.',
  },
  contact: {
    path: '/contact',
    url: '/src/Contact.tsx',
    title: 'Vykazujeme – Kontakt',
    description: 'Kontakt na prevádzkovateľa Vykazujeme.',
  },
  attendance: {
    path: '/attendance',
    url: '/src/Attendance.tsx',
    title: 'Vykazujeme – Dochádzka',
    description: 'Jednoduchý nástroj na generovanie a evidenciu pracovnej dochádzky.',
  },
  guideMonthlyHours: {
    path: '/guides/vypocet-hodin-za-mesiac',
    url: '/src/guides/computeMonthlyHours.tsx',
    title: 'Ako vypočítať odpracované hodiny za mesiac',
    description: 'Metodika výpočtu odpracovaných hodín pre štandardný a skrátený režim.',
  },
  guideHolidays: {
    path: '/guides/sviatky-a-dochadzka-2025-2027',
    url: '/src/guides/holidaysAndAttendance.tsx',
    title: 'Sviatky a dochádzka 2025–2027',
    description: 'Ako zohľadniť štátne sviatky v mesačnej dochádzke.',
  },
  guidePnOcr: {
    path: '/guides/pn-ocr-lekar-ako-vykazovat',
    url: '/src/guides/pnOcrDoctor.tsx',
    title: 'PN, OČR a lekár: Ako ich správne vykazovať',
    description: 'Praktický návod na označovanie neprítomnosti bez chýb.',
  },
  guidePartTime: {
    path: '/guides/skratene-uvazky-brigady-dohody',
    url: '/src/guides/partTimeAndAgreements.tsx',
    title: 'Skrátený úväzok, brigády a dohody: špecifiká dochádzky',
    description: 'Ako správne plánovať rozpis a kontrolovať súčet hodín.',
  },
  guideLunch: {
    path: '/guides/prestavka-na-obed-co-hovori-zakon',
    url: '/src/guides/lunchBreaksLaw.tsx',
    title: 'Prestávka na obed: Čo hovorí zákon a prax',
    description: 'Základné povinnosti a odporúčané nastavenia v dochádzke.',
  },
  guideExport: {
    path: '/guides/export-do-csv-a-excelu-tipy',
    url: '/src/guides/exportTips.tsx',
    title: 'Export do CSV a Excelu: Praktické tipy',
    description: 'Ako pracovať s exportmi bez chýb s časom a diakritikou.',
  },
  guideChecklist: {
    path: '/guides/kontrolny-zoznam-pred-odovzdanim',
    url: '/src/guides/checklist.tsx',
    title: 'Kontrolný zoznam pred odovzdaním dochádzky',
    description: 'Rýchla kontrola krokov, aby dokument prešiel bez pripomienok.',
  },
  guidePrivacy: {
    path: '/guides/ochrana-sukromia-a-bezpecnost',
    url: '/src/guides/privacySecurity.tsx',
    title: 'Ochrana súkromia a bezpečnosť údajov v dochádzke',
    description: 'Ako pracovať s osobnými údajmi bezpečne a v súlade s GDPR.',
  },
};

await mkdir(distDir, { recursive: true });

// Use the built index.html from Vite as a template
const template = await readFile(path.join(distDir, 'index.html'), 'utf8');

const Navigation = (await vite.ssrLoadModule('/src/components/Navigation.tsx')).default;

for (const [name, { url, title, description, path: pagePath }] of Object.entries(pages)) {
  const routePath = pagePath === '/' ? '' : pagePath.replace(/^\/+/, '');
  const targetDir = routePath ? path.join(distDir, routePath) : distDir;

  // clean up legacy flat html files or outdated directories from previous builds
  await rm(path.join(distDir, `${name}.html`), { force: true }).catch(() => {});
  if (name !== 'index') {
    await rm(path.join(distDir, name), { recursive: true, force: true }).catch(() => {});
  }
  if (targetDir !== distDir) {
    await rm(targetDir, { recursive: true, force: true }).catch(() => {});
  }

  const mod = await vite.ssrLoadModule(url);
  const Component = mod.default;
  const body = renderToStaticMarkup(
    React.createElement(
      React.Fragment,
      null,
      React.createElement(Navigation),
      React.createElement(Component)
    )
  );
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta[^>]*name="description"[^>]*>/,
      `<meta name="description" content="${description}">`
    )
    .replace(
      /<html([^>]*?)lang=".*?"([^>]*?)>/,
      '<html$1 lang="sk"$2>'
    )
    .replace(
      /<meta[^>]*property="og:title"[^>]*>/,
      `<meta property="og:title" content="${title}">`
    )
    .replace(
      /<meta[^>]*property="og:description"[^>]*>/,
      `<meta property="og:description" content="${description}">`
    )
    .replace(
      /<link[^>]*rel="canonical"[^>]*>/,
      `<link rel="canonical" href="https://vykazuje.me${pagePath}" />`
    )
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  // Inject JSON-LD structured data
  const canonical = `https://vykazuje.me${pagePath}`;
  const graph = [
    {
      '@type': 'Organization',
      '@id': 'https://vykazuje.me/#organization',
      name: 'Pinit, s.r.o',
      url: 'https://vykazuje.me/',
      logo: 'https://vykazuje.me/favicon-32x32.png',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://vykazuje.me/#website',
      name: 'Vykazujeme',
      url: 'https://vykazuje.me/',
      inLanguage: 'sk-SK',
      publisher: { '@id': 'https://vykazuje.me/#organization' },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Vykazujeme',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: 'https://vykazuje.me/attendance',
      description,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      inLanguage: 'sk-SK',
      publisher: { '@id': 'https://vykazuje.me/#organization' },
    },
    {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      isPartOf: { '@id': 'https://vykazuje.me/#website' },
      inLanguage: 'sk-SK',
    },
  ];

  // Add page-specific structured data
  if (name === 'faq') {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Ukladáte moje osobné údaje?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'Nie. Všetko, čo na stránke zadáte, zostáva vo vašom prehliadači a nikam sa neposiela. Vaše údaje nikdy neopustia vaše zariadenie.',
          },
        },
        {
          '@type': 'Question',
          name: 'Je služba platená?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'Služba je úplne bezplatná a nevyžaduje žiadne poplatky. Môžete ju využívať neobmedzene bez akýchkoľvek záväzkov.',
          },
        },
        {
          '@type': 'Question',
          name: 'Môžem si dochádzku uložiť na neskôr?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'Momentálne neponúkame možnosť uloženia dochádzky. Vytlačte alebo exportujte ju hneď po vyplnení, aby ste o údaje neprišli.',
          },
        },
        {
          '@type': 'Question',
          name: 'Aké prestávky na obed sú podporované?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'V štandardnom móde si viete pre každý pracovný deň vybrať dĺžku obeda 30/40/50/60 min. Predvolene 40 minút. Prestávka sa započíta do času odchodu.',
          },
        },
        {
          '@type': 'Question',
          name: 'Dá sa nahlásiť nadčas?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'Zatiaľ nie. Evidenciu nadčasov plánujeme podľa záujmu používateľov.',
          },
        },
        {
          '@type': 'Question',
          name: 'Podporuje nástroj aj mobilné zariadenia?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'Áno, stránka je plne responzívna a funguje na mobiloch, tabletoch aj počítačoch.',
          },
        },
        {
          '@type': 'Question',
          name: 'Môžem upraviť už vyplnené údaje?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'Áno. Kedykoľvek môžete meniť mená, dni, časy aj dôvody neprítomnosti. Zmeny sa prejavia okamžite.',
          },
        },
        {
          '@type': 'Question',
          name: 'Ako sa počítajú odpracované hodiny?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'Od príchodu po odchod mínus zvolená dĺžka prestávky na obed v štandardnom móde. V skrátenom režime sa obedy nezohľadňujú.',
          },
        },
        {
          '@type': 'Question',
          name: 'Je možné exportovať dochádzku do CSV alebo Excelu?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'Áno, k dispozícii sú tlačidlá Download CSV a Download Excel pre uloženie na zariadenie.',
          },
        },
        {
          '@type': 'Question',
          name: 'Funguje nástroj aj offline?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'Áno, po načítaní stránky je možné pracovať aj bez pripojenia na internet.',
          },
        },
        {
          '@type': 'Question',
          name: 'Čo robiť, ak sa neotvorí tlačový náhľad?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'Skontrolujte blokovanie vyskakovacích okien, prípadne použite iný prehliadač alebo zariadenie.',
          },
        },
        {
          '@type': 'Question',
          name: 'Podporuje nástroj rôzne jazyky?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'Aktuálne je stránka v slovenčine. Preklady do češtiny a angličtiny sú v príprave.',
          },
        },
        {
          '@type': 'Question',
          name: 'Je možné pridať vlastné dôvody neprítomnosti?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'Momentálne sú dostupné prednastavené dôvody (dovolenka, PN, OČR, …). V budúcnosti plánujeme vlastné dôvody.',
          },
        },
      ],
    });
  }

  if (name === 'tutorials') {
    graph.push({
      '@type': 'Article',
      headline: 'Návody k vyplneniu a efektívnemu používaniu dochádzky',
      inLanguage: 'sk-SK',
      mainEntityOfPage: { '@id': `${canonical}#webpage` },
      author: { '@type': 'Organization', name: 'Pinit, s.r.o' },
      publisher: { '@id': 'https://vykazuje.me/#organization' },
    });
    graph.push({
      '@type': 'HowTo',
      name: 'Kompletný sprievodca vyplnením dochádzky',
      description:
        'Krok za krokom od otvorenia stránky až po tlač alebo export.',
      inLanguage: 'sk-SK',
      supply: [{ '@type': 'HowToSupply', name: 'Vyplnené údaje' }],
      tool: [{ '@type': 'HowToTool', name: 'Webový prehliadač' }],
      step: [
        { '@type': 'HowToStep', name: 'Krok 1: Otvorenie aplikácie', text: 'Otvorte vykazuje.me a prejdite do sekcie Dochádzka.' },
        { '@type': 'HowToStep', name: 'Krok 2: Zadanie osobných údajov', text: 'Vyplňte meno a priezvisko. Údaje zostávajú iba vo vašom prehliadači.' },
        { '@type': 'HowToStep', name: 'Krok 3: Výber obdobia', text: 'Pomocou tlačidiel prepínajte medzi mesiacmi.' },
        { '@type': 'HowToStep', name: 'Krok 4: Výber režimu dochádzky', text: 'Zvoľte štandardný alebo skrátený mód podľa typu pracovného pomeru.' },
        { '@type': 'HowToStep', name: 'Krok 5: Označenie neprítomnosti', text: 'Zaškrtnite dni mimo práce a vyberte dôvod neprítomnosti.' },
        { '@type': 'HowToStep', name: 'Krok 6: Úprava pracovného času', text: 'Podľa potreby upravte príchody a odchody; súhrn sa prepočíta.' },
        { '@type': 'HowToStep', name: 'Krok 7: Tlač alebo stiahnutie', text: 'Použite Tlačiť, Download CSV alebo Download Excel.' },
      ],
      totalTime: 'PT1M',
    });
  }

  // If this is a guide article, append an Article node with headline = title
  if (pagePath.startsWith('/guides')) {
    const nowIso = new Date().toISOString();
    graph.push({
      '@type': 'Article',
      headline: title,
      inLanguage: 'sk-SK',
      mainEntityOfPage: { '@id': `${canonical}#webpage` },
      author: { '@type': 'Organization', name: 'Pinit, s.r.o' },
      publisher: { '@id': 'https://vykazuje.me/#organization' },
      description,
      datePublished: nowIso,
      dateModified: nowIso,
      image: 'https://vykazuje.me/favicon-32x32.png',
    });
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': graph,
  };

  const htmlWithLd = html.replace(
    '</head>',
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n</head>`
  );

  await mkdir(targetDir, { recursive: true });
  await writeFile(path.join(targetDir, 'index.html'), htmlWithLd, 'utf8');
}

await vite.close();
