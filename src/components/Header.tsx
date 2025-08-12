import { Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className='flex items-center bg-[#ffff99] p-4'>
      <button
          onClick={onMenuClick}
          className='mr-2 text-gray-800'
          aria-label='Toggle menu'
        >
          <Menu />
        </button>
        <h1 className='text-xl font-bold'>Vykazujeme</h1>
    </header>
  );
}
