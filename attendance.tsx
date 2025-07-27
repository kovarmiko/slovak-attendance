import React, { useState, useEffect } from 'react';

export default function Attendance() {
  // State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [shiftType, setShiftType] = useState('regular');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [vacations, setVacations] = useState(new Set()); // track vacation dates
  const [times, setTimes] = useState({}); // { 'YYYY-MM-DD': { in: '07:00', out: '15:40' }}

  // Constants
  const holidays2025 = [
    '2025-01-01','2025-01-06','2025-04-18','2025-04-21',
    '2025-05-01','2025-05-08','2025-07-05','2025-08-29',
    '2025-09-01','2025-09-15','2025-11-01','2025-11-17',
    '2025-12-24','2025-12-25','2025-12-26'
  ];

  // Helpers
  function daysInMonth(year, month) {
    return new Date(year, month+1, 0).getDate();
  }

  // Calendar computations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysCount = daysInMonth(year, month);
  const workDates = [];
  for (let d=1; d<=daysCount; d++) {
    const iso = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const dt = new Date(year, month, d);
    const wd = dt.getDay();
    if (wd>=1 && wd<=5 && !holidays2025.includes(iso)) workDates.push(iso);
  }
  const activeDates = shiftType==='shortened' ? workDates.slice(0,8) : workDates;

  // Handlers
  const toggleVacation = iso => {
    const newSet = new Set(vacations);
    if (newSet.has(iso)) newSet.delete(iso); else newSet.add(iso);
    setVacations(newSet);
  };

  const handleTimeChange = (iso, field, value) => {
    setTimes(prev => ({
      ...prev,
      [iso]: { ...(prev[iso]||{}), [field]: value }
    }));
  };

  // Summary
  const [summary, setSummary] = useState({ hours: 0, minutes: 0 });
  useEffect(() => {
    let totalMin = 0;
    activeDates.forEach(iso => {
      if (vacations.has(iso)) return;
      const rec = times[iso] || {};
      const { in: inT, out: outT } = rec;
      if (inT && outT) {
        const [h1,m1] = inT.split(':').map(Number);
        const [h2,m2] = outT.split(':').map(Number);
        const lb = shiftType==='regular' ? 40 : 0;
        const diff = (h2*60+m2)-(h1*60+m1)-lb;
        if (diff>0) totalMin += diff;
      }
    });
    setSummary({ hours: Math.floor(totalMin/60), minutes: totalMin%60 });
  }, [times, vacations, shiftType, activeDates]);

  // JSX
  return (
    <div>
      <h1>Dochádzka</h1>
      <div className="user-info">
        <label>Meno a priezvisko:</label>
        <input value={firstName} onChange={e=>setFirstName(e.target.value)} placeholder="krstné meno" />{' '}
        <input value={lastName} onChange={e=>setLastName(e.target.value)} placeholder="priezvisko" />
        <div>{firstName} {lastName}</div>
      </div>
      <div className="period">
        <label>Obdobie:</label>
        <span>{currentDate.toLocaleDateString('sk-SK',{month:'long',year:'numeric'})}</span>
      </div>
      <div className="controls">
        <button onClick={()=>setCurrentDate(cd=>new Date(cd.setMonth(cd.getMonth()-1)))}>«</button>
        <button onClick={()=>setCurrentDate(cd=>new Date(cd.setMonth(cd.getMonth()+1)))}>»</button>
        <label><input type="radio" checked={shiftType==='regular'} onChange={()=>setShiftType('regular')} /> Štandardný</label>
        <label><input type="radio" checked={shiftType==='shortened'} onChange={()=>setShiftType('shortened')} /> Skrátený</label>
      </div>
      <table>
        <thead>
          <tr>
            <th>Deň</th><th>Dátum</th><th>Dovolenka</th><th>Príchod</th><th>Odchod</th><th>Obed Out</th><th>Obed In</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({length:daysCount},(_,i)=>i+1).map(d=>{
            const iso = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
            const dt = new Date(year, month, d-1);
            const wd = dt.getDay();
            const isHoliday = holidays2025.includes(iso);
            const isWeekend = wd===0||wd===6;
            if (isWeekend) return (
              <tr key={iso} className="weekend">
                <td>{dt.toLocaleDateString('sk-SK',{weekday:'long'})}</td>
                <td>{iso}</td>
                <td colSpan={5}></td>
              </tr>
            );
            if (isHoliday) return (
              <tr key={iso} className="day-name">
                <td>{dt.toLocaleDateString('sk-SK',{weekday:'long'})}</td>
                <td>{iso}</td>
                <td></td>
                <td colSpan={4}>Štátny sviatok</td>
              </tr>
            );
            const active = activeSet.has(iso);
            const vac = vacations.has(iso);
            return (
              <tr key={iso}>
                <td>{dt.toLocaleDateString('sk-SK',{weekday:'long'})}</td>
                <td>{iso}</td>
                <td><input type="checkbox" checked={vac} onChange={()=>toggleVacation(iso)} /></td>
                {!vac ? (
                  <>  
                    <td><input type="time" value={times[iso]?.in||''} onChange={e=>handleTimeChange(iso,'in',e.target.value)} disabled={!active}/></td>
                    <td><input type="time" value={times[iso]?.out||''} onChange={e=>handleTimeChange(iso,'out',e.target.value)} disabled={!active}/></td>
                    {shiftType==='regular' ? <><td>12:00</td><td>12:40</td></> : <><td></td><td></td></>}
                  </>
                ) : <td colSpan={4}>Dovolenka</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div id="summary">Odpracované hodiny: {summary.hours}h {summary.minutes}m</div>
    </div>
  );
}
