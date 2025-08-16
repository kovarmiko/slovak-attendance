import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Attendance from './Attendance';
import About from './About';
import FAQ from './FAQ';
import Tutorials from './Tutorials';
import Terms from './Terms';
import Privacy from './Privacy';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header open={open} onMenuClick={() => setOpen((o) => !o)} />
      <div className='content flex pb-8'>
        <Sidebar isOpen={open} />
        <div className='p-6 mt-6 flex-1 pt-16 md:pt-0'>
          <Routes>
            <Route path='/about' element={<About />} />
            <Route path='/faq' element={<FAQ />} />
            <Route path='/tutorials' element={<Tutorials />} />
            <Route path='/terms' element={<Terms />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/attendance' element={<Attendance />} />
            <Route path='/' element={<Navigate to='/about' replace />} />
          </Routes>
        </div>
      </div>
      <Footer />
      <CookieConsent />
    </>
  );
}

export default App;
