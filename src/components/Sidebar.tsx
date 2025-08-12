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
      Working on the main menu. Check back soon!
    </aside>
  );
}