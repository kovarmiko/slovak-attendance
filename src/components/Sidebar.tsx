interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside
      className={`${
        isOpen ? 'w-auto' : 'w-0 truncate'
      }`}
    >
      Sidebar content goes here
    </aside>
  );
}
