import React from 'react';
import { Link } from 'react-router-dom';

const guides = [
  {
    path: '/guides/vypocet-hodin-za-mesiac',
    title: 'Ako vypočítať odpracované hodiny za mesiac',
    blurb:
      'Metodika výpočtu odpracovaných hodín vrátane prestávok a špecifík pri skrátenom režime.',
  },
  {
    path: '/guides/sviatky-a-dochadzka-2025-2027',
    title: 'Sviatky a dochádzka 2025–2027',
    blurb:
      'Prehľad slovenských sviatkov a odporúčania, ako ich zohľadniť v mesačnej dochádzke.',
  },
  {
    path: '/guides/pn-ocr-lekar-ako-vykazovat',
    title: 'PN, OČR a lekár: Ako ich správne vykazovať',
    blurb:
      'Praktický návod na označovanie dní mimo práce a najčastejšie chyby pri vykazovaní.',
  },
  {
    path: '/guides/skratene-uvazky-brigady-dohody',
    title: 'Skrátený úväzok, brigády a dohody: špecifiká dochádzky',
    blurb:
      'Čo sa mení pri skrátenom režime práce a ako správne plánovať rozpis.',
  },
  {
    path: '/guides/prestavka-na-obed-co-hovori-zakon',
    title: 'Prestávka na obed: Čo hovorí zákon a prax',
    blurb:
      'Základné povinnosti zamestnávateľa a odporúčané voľby dĺžky prestávky.',
  },
  {
    path: '/guides/export-do-csv-a-excelu-tipy',
    title: 'Export do CSV a Excelu: Praktické tipy',
    blurb:
      'Ako pracovať s exportmi, formátmi času a diakritikou bez chýb.',
  },
  {
    path: '/guides/kontrolny-zoznam-pred-odovzdanim',
    title: 'Kontrolný zoznam pred odovzdaním dochádzky',
    blurb:
      'Rýchla kontrola krokov, aby dokument prešiel bez pripomienok.',
  },
  {
    path: '/guides/ochrana-sukromia-a-bezpecnost',
    title: 'Ochrana súkromia a bezpečnosť údajov v dochádzke',
    blurb:
      'Ako pracovať s údajmi bezpečne a v súlade s GDPR.',
  },
];

export default function Guides(): JSX.Element {
  return (
    <div className='max-w-3xl mx-auto py-8 space-y-6'>
      <header className='space-y-2'>
        <h1 className='text-3xl font-semibold tracking-tight'>Články a praktické návody</h1>
        <p className='text-gray-600'>
          Krátke, konkrétne články, ktoré vám pomôžu vyplniť dochádzku správne a rýchlo.
        </p>
      </header>
      <ul className='space-y-3'>
        {guides.map((g) => (
          <li key={g.path} className='border rounded p-4 hover:bg-gray-50'>
            <h2 className='text-xl font-medium'>
              <Link to={g.path} className='text-blue-700 hover:underline'>
                {g.title}
              </Link>
            </h2>
            <p className='text-gray-700'>{g.blurb}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

