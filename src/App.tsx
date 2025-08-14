import React, { useState, useEffect } from 'react';
import Attendance from './Attendance';
import About from './About';
import FAQ from './FAQ';
import Tutorials from './Tutorials';
import Terms from './Terms';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';

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
      case '#/terms':
        return <Terms />;
      case '#/attendance':
      default:
        return <Attendance />;
    }
  };

  return (
    <>
      <Header open={open} onMenuClick={() => setOpen((o) => !o)} />
      <div className='content flex pb-8'>
        <Sidebar isOpen={open} currentPage={page} />
        <div className='p-6 mt-6 flex-1 pt-16 md:pt-0'>
          {renderPage()}
        </div>
      </div>
      <Footer />
      <CookieConsent />
    </>
  );
}

export default App;
