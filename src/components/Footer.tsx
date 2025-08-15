import React from 'react';

export default function Footer() {
  return (
    <footer className='fixed left-0 bottom-0 w-full bg-black text-white text-xs p-2'>
      Pinit, s.r.o (2025). All rights reserved.{' '}
      <a href='#/privacy' className='text-gray-300 hover:underline'>Ochrana súkromia</a>
    </footer>
  );
}
