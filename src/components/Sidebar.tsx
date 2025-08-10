interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/50'
          onClick={onClose}
        />
      )}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar content goes here */}
      </div>
    </>
  );
}
