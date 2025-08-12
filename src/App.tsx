import React, { useState, useEffect } from 'react';
import Attendance from './Attendance';
import About from './About';
import FAQ from './FAQ';
import Tutorials from './Tutorials';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<string>(window.location.hash || '#/about');

  useEffect(() => {
    const onHashChange = () => setPage(window.location.hash || '#/about');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const renderPage = () => {
    switch (page) {
      case '#/about':
      case '#/home':
        return <About />;
      case '#/faq':
        return <FAQ />;
      case '#/tutorials':
        return <Tutorials />;
      case '#/attendance':
      default:
        return <Attendance />;
    }
  };

  return (
    <>
      <Header onMenuClick={() => setOpen((o) => !o)} />
      <div className='content flex'>
        <Sidebar isOpen={open} currentPage={page} />
        <div className='p-6 flex-1'>
          {renderPage()}
        </div>
      </div>
    </>
  );
}

export default App;
