import React from 'react';
import classes from './About.module.scss';

export default function About(): JSX.Element {
  return (
    <div className="flex items-center justify-center min-h-full bg-gradient-to-br from-blue-50 to-blue-100 py-10">
      <div className="max-w-xl w-full bg-white/90 border border-gray-200 rounded-lg shadow p-6 text-center space-y-4">
        <span className={`${classes.vsymbol} text-xl font-bold p-2`}>Vykazujeme</span>
        <h1 className="text-3xl md:text-4xl font-bold">Rýchlo. Intuitívne. Moderne.</h1>
        <p className="text-gray-700">
          Stránka <strong>vykazuje.me</strong> vám pomáha rýchlo, intuitívne a moderne vyplniť zamestnaneckú dochádzku.
          Nestrácajte už čas v Exceli a splňte si túto úlohu za menej ako minútu. Už netreba nič vyplňovať. Všetko je
          pripravené. Stačí sa len podpísať a vyklikať si dni, kedy ste nepracovali.
        </p>
        <p className="text-gray-700">
          Pozrite si viac v <a href="#/tutorials" className="text-blue-600 hover:underline">návodoch</a> alebo rovno
          prejdite na <a href="#/attendance" className="text-blue-600 hover:underline">dochádzku</a>. Ak vám nebude
          niečo jasné, skúste <a href="#/faq" className="text-blue-600 hover:underline">časté otázky</a>.
        </p>
      </div>
    </div>
  );
}
