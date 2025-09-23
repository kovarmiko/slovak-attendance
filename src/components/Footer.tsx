import React from 'react';
import { Link } from 'react-router-dom';
import { openConsentModal } from '../lib/consent';

export default function Footer() {
  return (
    <footer className='fixed left-0 bottom-0 z-[100] w-full bg-black text-white text-xs p-2'>
      Pinit, s.r.o (2025). All rights reserved.{' '}
      <Link to='/privacy' className='text-gray-300 hover:underline'>
        Ochrana súkromia
      </Link>
      {' · '}
      <button
        type='button'
        onClick={openConsentModal}
        className='text-gray-300 hover:underline bg-transparent border-0 p-0'
      >
        Nastavenia cookies
      </button>
    </footer>
  );
}
