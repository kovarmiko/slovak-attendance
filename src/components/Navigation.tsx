import React from 'react';

export default function Navigation() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <nav className="mt-12 flex flex-wrap justify-center gap-4 text-sm">
      <a
        href="/"
        onClick={scrollToTop}
        className="text-blue-600 hover:underline"
      >
        Domov
      </a>
      <a
        href="/attendance"
        onClick={scrollToTop}
        className="text-blue-600 hover:underline"
      >
        Dochádzka
      </a>
      <a
        href="/tutorials"
        onClick={scrollToTop}
        className="text-blue-600 hover:underline"
      >
        Návody
      </a>
      <a
        href="/guides"
        onClick={scrollToTop}
        className="text-blue-600 hover:underline"
      >
        Články
      </a>
      <a
        href="/faq"
        onClick={scrollToTop}
        className="text-blue-600 hover:underline"
      >
        Časté otázky
      </a>
      <a
        href="/terms"
        onClick={scrollToTop}
        className="text-blue-600 hover:underline"
      >
        Podmienky používania
      </a>
      <a
        href="/privacy"
        onClick={scrollToTop}
        className="text-blue-600 hover:underline"
      >
        Ochrana súkromia
      </a>
      <a
        href="/contact"
        onClick={scrollToTop}
        className="text-blue-600 hover:underline"
      >
        Kontakt
      </a>
    </nav>
  );
}
