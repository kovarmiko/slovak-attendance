import React from 'react';

export default function Navigation() {
  return (
    <nav className="mt-12 flex flex-wrap justify-center gap-4 text-sm">
      <a href="#/about" className="text-blue-600 hover:underline">
        Domov
      </a>
      <a href="#/attendance" className="text-blue-600 hover:underline">
        Dochádzka
      </a>
      <a href="#/tutorials" className="text-blue-600 hover:underline">
        Návody
      </a>
      <a href="#/faq" className="text-blue-600 hover:underline">
        Časté otázky
      </a>
      <a href="#/terms" className="text-blue-600 hover:underline">
        Podmienky používania
      </a>
    </nav>
  );
}
