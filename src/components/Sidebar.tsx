import { Info, HelpCircle, BookOpen, ClipboardList } from 'lucide-react';
import classes from './Sidebar.module.scss';

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside className={`${classes.sidebar} ${isOpen ? classes.open : ''}`}>
      <div className={classes.sidebar__content}>
        <nav className="flex flex-col space-y-2 p-2">
          <a
            href="#/about"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 no-underline"
          >
            <Info size={16} />
            About
          </a>
          <a
            href="#/faq"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 no-underline"
          >
            <HelpCircle size={16} />
            FAQ
          </a>
          <a
            href="#/tutorials"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 no-underline"
          >
            <BookOpen size={16} />
            Tutorials
          </a>
          <a
            href="#/attendance"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 no-underline"
          >
            <ClipboardList size={16} />
            Attendance
          </a>
        </nav>
      </div>
    </aside>
  );
}
