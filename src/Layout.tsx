import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

type LayoutProps = {
  showSidebar?: boolean
}

export default function Layout({ showSidebar = false }: LayoutProps) {
  return (
    <>
      <Header />
      <div className="flex">
        {showSidebar && <Sidebar />}
        <Outlet />
      </div>
    </>
  );
}

