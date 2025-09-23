import { Menu, X, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
  open: boolean;
}

const navLinks = [
  { to: '/', label: 'Domov' },
  { to: '/attendance', label: 'Dochádzka' },
  { to: '/tutorials', label: 'Návody' },
  { to: '/guides', label: 'Články' },
  { to: '/faq', label: 'FAQ' },
];

export default function Header({ onMenuClick, open }: HeaderProps) {
  return (
    <header className='print:hidden sticky top-0 z-40 bg-transparent'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='mt-4 flex items-center justify-between rounded-2xl border border-white/40 bg-white/70 px-4 py-3 shadow-lg backdrop-blur-md supports-[backdrop-filter]:bg-white/60'>
          <div className='flex items-center gap-3'>
            <button
              type='button'
              onClick={onMenuClick}
              className='flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-700 transition hover:border-sky-200 hover:text-sky-600 md:hidden'
              aria-label='Prepínač menu'
              aria-expanded={open}
            >
              {open ? <X className='h-5 w-5' aria-hidden='true' /> : <Menu className='h-5 w-5' aria-hidden='true' />}
            </button>
            <div className='flex flex-col'>
              <span className='font-heading text-lg font-semibold text-slate-900'>Vykazujeme</span>
              <span className='text-xs uppercase tracking-[0.4em] text-slate-500'>Dochádzka pre firmy</span>
            </div>
          </div>

          <nav className='hidden items-center gap-6 md:flex'>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-heading text-sm font-medium transition hover:text-sky-600 ${
                    isActive ? 'text-sky-600' : 'text-slate-600'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className='hidden items-center gap-3 sm:flex'>
            <a
              href='/contact'
              className='inline-flex items-center justify-center rounded-full border border-slate-200/80 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:text-sky-600'
            >
              Kontakt
            </a>
            <a
              href='/attendance'
              className='group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:shadow-md'
            >
              Spustiť dochádzku
              <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' aria-hidden='true' />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
