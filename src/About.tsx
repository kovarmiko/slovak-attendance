import React from 'react';
import classes from './About.module.scss';

export default function About(): JSX.Element {
  return (
    <div className="flex items-center justify-center min-h-full py-10">
      <div className="max-w-3xl w-full bg-white/90 border border-gray-200 rounded-lg shadow p-6 text-center space-y-6">
        <span className={`${classes.vsymbol} text-xl font-bold p-2`}>Vykazujeme</span>
        <h1 className="text-3xl md:text-4xl font-bold">Rýchlo. Intuitívne. Moderne.</h1>
        <div className="text-gray-700 space-y-3 text-left">
          <p>
            <strong>Vykazujeme</strong> je jednoduchý a prehľadný nástroj na vytvorenie mesačnej dochádzky.
            Vyplňte príchody a odchody, označte dni mimo práce a jedným klikom vytlačte alebo uložte.
          </p>
          <ul className="list-disc list-inside">
            <li>Podpora <em>štandardného</em> aj <em>skráteného</em> režimu práce</li>
            <li>Automatický výpočet odpracovaných dní a hodín</li>
            <li>Možnosť zvoliť dĺžku prestávky na obed (30/40/50/60 min)</li>
            <li>Export do CSV a Excelu, tlač do PDF</li>
            <li>Slovenské štátne sviatky sú zahrnuté automaticky</li>
          </ul>
          <p>
            Údaje zostávajú iba vo vašom prehliadači – nič neposielame na server. Pozrite si viac v
            <a href="/tutorials" className="text-blue-600 hover:underline"> návodoch</a> alebo rovno prejdite na
            <a href="/attendance" className="text-blue-600 hover:underline"> dochádzku</a>. Máte otázky?
            Pozrite <a href="/faq" className="text-blue-600 hover:underline">časté otázky</a> alebo nás
            <a href="/contact" className="text-blue-600 hover:underline"> kontaktujte</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
