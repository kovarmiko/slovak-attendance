import React, { useState } from 'react';
import Attendance from './Attendance';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sidebar isOpen={open} />
      <div
        className={`transition-transform duration-300 ${open ? 'translate-x-64' : ''}`}
      >
        <Header onMenuClick={() => setOpen((o) => !o)} />
        <Attendance />
      </div>
    </>
  );
}

export default App;
