import React, { useState } from 'react';
import Attendance from './Attendance';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Header onMenuClick={() => setOpen((o) => !o)} />
      <div className='content flex'>
        <Sidebar isOpen={open} />
        <div className='p-6 flex-1'>
          <Attendance />
        </div>
      </div>
    </>
  );
}

export default App;
