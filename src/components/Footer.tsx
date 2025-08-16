import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='fixed left-0 bottom-0 w-full bg-black text-white text-xs p-2'>
      Pinit, s.r.o (2025). All rights reserved.{' '}
      <Link to='/privacy' className='text-gray-300 hover:underline'>
        Ochrana súkromia
      </Link>
    </footer>
  );
}
