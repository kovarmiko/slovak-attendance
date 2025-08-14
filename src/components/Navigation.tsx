import React from 'react';

export default function Navigation() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="mt-12 flex flex-wrap justify-center gap-4 text-sm">
      <a
        href="#/about"
        onClick={scrollToTop}
        className="text-blue-600 hover:underline"
      >
        Domov
      </a>
      <a
        href="#/attendance"
        onClick={scrollToTop}
        className="text-blue-600 hover:underline"
      >
        Dochádzka
      </a>
      <a
        href="#/tutorials"
        onClick={scrollToTop}
        className="text-blue-600 hover:underline"
      >
        Návody
      </a>
      <a
        href="#/faq"
        onClick={scrollToTop}
        className="text-blue-600 hover:underline"
      >
        Časté otázky
      </a>
      <a
        href="#/terms"
        onClick={scrollToTop}
        className="text-blue-600 hover:underline"
      >
        Podmienky používania
      </a>
    </nav>
  );
}
