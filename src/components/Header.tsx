import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  open: boolean;
}

export default function Header({ onMenuClick, open }: HeaderProps) {
  return (
    <header className='flex items-center bg-[#ffff99] p-4 print:hidden fixed  md:static w-full'>
      <button
          onClick={onMenuClick}
          className='mr-2 text-gray-800'
          aria-label='Toggle menu'
        >
          {open ? <X /> : <Menu />}
        </button>
        <h1 className='text-xl font-bold'>Vykazujeme</h1>
    </header>
  );
}
