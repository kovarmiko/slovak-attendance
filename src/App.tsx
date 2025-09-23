import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Attendance from './Attendance';
import About from './About';
import FAQ from './FAQ';
import Tutorials from './Tutorials';
import Guides from './Guides';
import Terms from './Terms';
import Privacy from './Privacy';
import Contact from './Contact';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import Checklist from './guides/checklist';
import ComputeMonthlyHours from './guides/computeMonthlyHours';
import ExportTips from './guides/exportTips';
import HolidaysAndAttendance from './guides/holidaysAndAttendance';
import LunchBreaksLaw from './guides/lunchBreaksLaw';
import PartTimeAndAgreements from './guides/partTimeAndAgreements';
import PnOcrDoctor from './guides/pnOcrDoctor';
import PrivacySecurity from './guides/privacySecurity';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header open={open} onMenuClick={() => setOpen((o) => !o)} />
      <div className='content flex pb-8'>
        <Sidebar isOpen={open} />
        <div className='p-6 mt-6 flex-1 pt-8 md:pt-4'>
          <Routes>
            <Route path='/' element={<About />} />
            <Route path='/about' element={<Navigate to='/' replace />} />
            <Route path='/faq' element={<FAQ />} />
            <Route path='/tutorials' element={<Tutorials />} />
            <Route path='/guides' element={<Guides />} />
            <Route path='/guides/vypocet-hodin-za-mesiac' element={<ComputeMonthlyHours />} />
            <Route path='/guides/sviatky-a-dochadzka-2025-2027' element={<HolidaysAndAttendance />} />
            <Route path='/guides/pn-ocr-lekar-ako-vykazovat' element={<PnOcrDoctor />} />
            <Route path='/guides/skratene-uvazky-brigady-dohody' element={<PartTimeAndAgreements />} />
            <Route path='/guides/prestavka-na-obed-co-hovori-zakon' element={<LunchBreaksLaw />} />
            <Route path='/guides/export-do-csv-a-excelu-tipy' element={<ExportTips />} />
            <Route path='/guides/kontrolny-zoznam-pred-odovzdanim' element={<Checklist />} />
            <Route path='/guides/ochrana-sukromia-a-bezpecnost' element={<PrivacySecurity />} />
            <Route path='/terms' element={<Terms />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/attendance' element={<Attendance />} />
          </Routes>
        </div>
      </div>
      <Footer />
      <CookieConsent />
    </>
  );
}

export default App;
