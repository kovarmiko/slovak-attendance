import { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className='flex items-center bg-[#ffff99] p-4'>
        <button
          onClick={() => setOpen(true)}
          className='mr-2 text-gray-800'
          aria-label='Open menu'
        >
          <Menu />
        </button>
        <h1 className='text-xl font-bold'>Vykazujeme</h1>
      </header>
      <Sidebar isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
