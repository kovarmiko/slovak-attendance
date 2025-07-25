import React, { useState, useEffect, useMemo } from 'react';

// --------------------
//  Module-level constants
// --------------------
const HOLIDAYS_2025: string[] = [
  '2025-01-01', '2025-01-06', '2025-04-18', '2025-04-21', '2025-05-01',
  '2025-05-08', '2025-07-05', '2025-08-29', '2025-09-01', '2025-09-15',
  '2025-11-01', '2025-11-17', '2025-12-24', '2025-12-25', '2025-12-26'
];

// Types
interface TimeRecord { in?: string; out?: string; }
type ShiftType = 'regular' | 'shortened';
interface Summary { workedDays: number; vacationDays: number; }

export default function Attendance(): JSX.Element {
  // State
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [shiftType, setShiftType] = useState<ShiftType>('regular');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [vacations, setVacations] = useState<Set<string>>(new Set());
  const [times, setTimes] = useState<Record<string, TimeRecord>>({});
  const [summary, setSummary] = useState<Summary>({ workedDays: 0, vacationDays: 0 });

  // Styles injection
  const styles = `
    body { font-family: sans-serif; padding: 20px; }
    h1 { text-align: center; }
    .controls { text-align: center; margin-bottom: 10px; }
    .user-info { margin-bottom: 10px; }
    .period { margin-bottom: 20px; }
    .period label { font-weight: normal; margin-right: 5px; }
    .period span, #printName { font-weight: bold; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: center; }
    th { background: #f0f0f0; }
    .day-name { background: #ffff99; }
    .weekend td, tr > td:first-child { background: #ffff99; }
    #summary { margin-top: 20px; font-weight: bold; text-align: right; }
    @media print {.vacation, .controls, .shift-toggle, #firstName, #lastName, .vacationChk { display: none !important; } }
  `;

  // Helpers
  const daysInMonth = (year: number, month: number): number =>
    new Date(year, month + 1, 0).getDate();

  // Calendar data
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysCount = daysInMonth(year, month);

  // --------------------
  //  Derived data (memoised)
  // --------------------
  const workDates: string[] = useMemo(() => {
    const arr: string[] = [];
    for (let d = 1; d <= daysCount; d++) {
      const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const wd = new Date(year, month, d).getDay();
      if (wd >= 1 && wd <= 5 && !HOLIDAYS_2025.includes(iso)) arr.push(iso);
    }
    return arr;
  }, [year, month, daysCount]);

  const activeDates: string[] = useMemo(
    () => (shiftType === 'shortened' ? workDates.slice(0, 8) : workDates),
    [workDates, shiftType]
  );

  const activeSet = useMemo(() => new Set<string>(activeDates), [activeDates]);

  const anotherMonthButtonClass =
    'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded';

  // Prefill times when switching month/shift
  useEffect(() => {
    const timesKeys = Object.keys(times);
    const needsReset =
      timesKeys.length !== activeDates.length ||
      !activeDates.every((k) => timesKeys.includes(k));

    if (needsReset) {
      const newTimes: Record<string, TimeRecord> = {};
      activeDates.forEach((iso) => {
        newTimes[iso] = {
          in: '07:00',
          out: shiftType === 'regular' ? '15:40' : '12:00'
        };
      });
      setTimes(newTimes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month, shiftType]);

  // Handlers
  const toggleVacation = (iso: string) => {
    setVacations((prev) => {
      const next = new Set(prev);
      next.has(iso) ? next.delete(iso) : next.add(iso);
      return next;
    });
  };

  const handleTimeChange = (
    iso: string,
    field: keyof TimeRecord,
    value: string
  ) => {
    setTimes((prev) => ({ ...prev, [iso]: { ...(prev[iso] || {}), [field]: value } }));
  };

  // --------------------
  //  Summary calculation (days only)
  // --------------------
  useEffect(() => {
    const vacationDays = Array.from(vacations).filter((iso) => activeSet.has(iso)).length;
    const workedDays = activeDates.length - vacationDays;
    setSummary({ workedDays, vacationDays });
  }, [vacations, activeDates, activeSet]);

  // Render
  return (
    <>
      <style>{styles}</style>
      <div>
        <h1>Dochádzka</h1>

        <div className="user-info">
          <label className="mr-2">Meno a&nbsp;priezvisko:</label>
          <input
            id="firstName"
            className="mr-2"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="krstné meno"
          />{' '}
          <input
            id="lastName"
            className="mr-2"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="priezvisko"
          />
          <span id="printName">
            {firstName} {lastName}
          </span>
        </div>

        <div className="period">
          <label>Obdobie:</label>
          <span>
            {currentDate.toLocaleDateString('sk-SK', { month: 'long', year: 'numeric' })}
          </span>
        </div>

        <div className="controls">
          <button
            className={`${anotherMonthButtonClass} mr-2`}
            onClick={() =>
              setCurrentDate((cd) => new Date(cd.setMonth(cd.getMonth() - 1)))
            }
          >
            « Predchádzajúci mesiac
          </button>
          <button
            className={`${anotherMonthButtonClass} mr-2`}
            onClick={() =>
              setCurrentDate((cd) => new Date(cd.setMonth(cd.getMonth() + 1)))
            }
          >
            Nasledujúci mesiac »
          </button>
          <label className="mr-2">
            <input
              type="radio"
              name="shiftToggle"
              checked={shiftType === 'regular'}
              onChange={() => setShiftType('regular')}
            />{' '}
            Štandardný
          </label>
          <label>
            <input
              type="radio"
              name="shiftToggle"
              checked={shiftType === 'shortened'}
              onChange={() => setShiftType('shortened')}
            />{' '}
            Skrátený
          </label>
        </div>

        <table>
          <thead>
            <tr>
              <th>Deň</th>
              <th>Dátum</th>
              <th className="vacation">Dovolenka</th>
              <th>Príchod</th>
              <th>Odchod</th>
              <th>Obed Out</th>
              <th>Obed In</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: daysCount }, (_, i) => i + 1).map((d) => {
              const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(
                2,
                '0'
              )}`;
              // FIX: use the exact day (no -1) so weekday matches ISO date
              const dt = new Date(year, month, d);
              const wd = dt.getDay();
              const isHoliday = HOLIDAYS_2025.includes(iso);
              const isWeekend = wd === 0 || wd === 6;

              if (isWeekend)
                return (
                  <tr key={iso} className="weekend">
                    <td>{dt.toLocaleDateString('sk-SK', { weekday: 'long' })}</td>
                    <td>{iso}</td>
                    <td colSpan={5}></td>
                  </tr>
                );

              if (isHoliday)
                return (
                  <tr key={iso} className="day-name">
                    <td>{dt.toLocaleDateString('sk-SK', { weekday: 'long' })}</td>
                    <td>{iso}</td>
                    <td></td>
                    <td colSpan={4}>Štátny sviatok</td>
                  </tr>
                );

              const active = activeSet.has(iso);
              const vac = vacations.has(iso);
              const rec = times[iso] || {};

              return (
                <tr key={iso}>
                  <td>{dt.toLocaleDateString('sk-SK', { weekday: 'long' })}</td>
                  <td>{iso}</td>
                  <td className="vacation">
                    <input
                      type="checkbox"
                      checked={vac}
                      onChange={() => toggleVacation(iso)}
                    />
                  </td>

                  {!vac ? (
                    <>
                      <td>
                        <input
                          type="time"
                          value={rec.in || ''}
                          onChange={(e) => handleTimeChange(iso, 'in', e.target.value)}
                          disabled={!active}
                        />
                      </td>
                      <td>
                        <input
                          type="time"
                          value={rec.out || ''}
                          onChange={(e) => handleTimeChange(iso, 'out', e.target.value)}
                          disabled={!active}
                        />
                      </td>
                      {shiftType === 'regular' ? (
                        <>
                          <td>12:00</td>
                          <td>12:40</td>
                        </>
                      ) : (
                        <>
                          <td></td>
                          <td></td>
                        </>
                      )}
                    </>
                  ) : (
                    <td colSpan={4}>Dovolenka</td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div id="summary">
          Odpracované dni: {summary.workedDays}
          <br />
          Dovolenkové dni: {summary.vacationDays}
        </div>
      </div>
    </>
  );
}
