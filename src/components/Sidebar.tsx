import classes from './Sidebar.module.scss';


interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside
      className={`${classes.sidebar} ${
        isOpen ? classes.open: ''
      }`}
    >
      <nav className="flex flex-col space-y-2">
        <a href="#/about">About</a>
        <a href="#/faq">FAQ</a>
        <a href="#/tutorials">Tutorials</a>
        <a href="#/attendance">Attendance</a>
      </nav>
    </aside>
  );
}