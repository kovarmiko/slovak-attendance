import { HelpCircle, BookOpen, ClipboardList, Home, FileText } from 'lucide-react';
import classes from './Sidebar.module.scss';

interface SidebarProps {
  isOpen: boolean;
  currentPage: string;
}

export default function Sidebar({ isOpen, currentPage }: SidebarProps) {
  return (
    <aside className={`${classes.sidebar} print:hidden ${isOpen ? classes.open : ''}`}>
      <div className={classes.sidebar__content}>
        <nav className='flex flex-col space-y-2 p-2'>
          <a
            href='/about'
            className={`flex items-center gap-2 px-2 py-1 rounded no-underline text-gray-700 hover:text-gray-900 hover:bg-gray-100 ${
              currentPage === '/about'
                ? 'bg-gray-200 text-gray-900 font-medium'
                : ''
            }`}
          >
            <Home size={16} />
            Domov
          </a>
          <a
            href='/attendance'
            className={`flex items-center gap-2 px-2 py-1 rounded no-underline text-gray-700 hover:text-gray-900 hover:bg-gray-100 ${
              currentPage === '/attendance'
                ? 'bg-gray-200 text-gray-900 font-medium'
                : ''
            }`}
          >
            <ClipboardList size={16} />
            Dochádzka
          </a>
          <a
            href='/tutorials'
            className={`flex items-center gap-2 px-2 py-1 rounded no-underline text-gray-700 hover:text-gray-900 hover:bg-gray-100 ${
              currentPage === '/tutorials'
                ? 'bg-gray-200 text-gray-900 font-medium'
                : ''
            }`}
          >
            <BookOpen size={16} />
            Návody
          </a>

          <a
            href='/faq'
            className={`flex items-center gap-2 px-2 py-1 rounded no-underline text-gray-700 hover:text-gray-900 hover:bg-gray-100 ${
              currentPage === '/faq'
                ? 'bg-gray-200 text-gray-900 font-medium'
                : ''
            }`}
          >
            <HelpCircle size={16} />
            Časté otázky
          </a>
          <a
            href='/terms'
            className={`flex items-center gap-2 px-2 py-1 rounded no-underline text-gray-700 hover:text-gray-900 hover:bg-gray-100 ${
              currentPage === '/terms'
                ? 'bg-gray-200 text-gray-900 font-medium'
                : ''
            }`}
          >
            <FileText size={16} />
            Podmienky používania
          </a>
        </nav>
      </div>
    </aside>
  );
}
