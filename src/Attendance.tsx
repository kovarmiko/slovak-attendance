import React, { useState, useEffect, useMemo } from 'react';
import { styles } from './styles';

// --------------------
//  Module-level constants
// --------------------
const HOLIDAYS_2025: string[] = [
  '2025-01-01',
  '2025-01-06',
  '2025-04-18',
  '2025-04-21',
  '2025-05-01',
  '2025-05-08',
  '2025-07-05',
  '2025-08-29',
  '2025-09-01',
  '2025-09-15',
  '2025-11-01',
  '2025-11-17',
  '2025-12-24',
  '2025-12-25',
  '2025-12-26',
];

// Types
interface TimeRecord {
  in?: string;
  out?: string;
}
type ShiftType = 'regular' | 'shortened';
interface Summary {
  workedDays: number;
  vacation: number;
  pn: number;
  ocr: number;
  unpaid: number;
  compensatory: number;
  other: number;
  doctor: number;
}

type VacationType = { key: string; value: keyof Summary };

const defaultSummary = {
  workedDays: 0,
  vacation: 0,
  pn: 0,
  ocr: 0,
  unpaid: 0,
  compensatory: 0,
  other: 0,
  doctor: 0,
};

export default function Attendance(): JSX.Element {
  // State
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [shiftType, setShiftType] = useState<ShiftType>('regular');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [vacations, setVacations] = useState<Set<VacationType>>(new Set());
  const [times, setTimes] = useState<Record<string, TimeRecord>>({});
  const [summary, setSummary] = useState<Summary>({ ...defaultSummary });

  // Helpers
  const daysInMonth = (year: number, month: number): number =>
    new Date(year, month + 1, 0).getDate();

  // Calendar data
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysCount = daysInMonth(year, month);
  const outOfOfficeOptions: Array<Partial<Record<keyof Summary, string>>> = [
    { vacation: 'Dovolenka' },
    { doctor: 'Lekár' },
    { pn: 'PN' },
    { ocr: 'OČR' },
    { unpaid: 'Neplatene voľno' },
    { compensatory: 'Nahradné voľno' },
    { other: 'Iné' },
  ];

  // --------------------
  //  Derived data (memoised)
  // --------------------
  const workDates: string[] = useMemo(() => {
    const arr: string[] = [];
    for (let d = 1; d <= daysCount; d++) {
      const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(
        d
      ).padStart(2, '0')}`;
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
          out: shiftType === 'regular' ? '15:40' : '12:00',
        };
      });
      setTimes(newTimes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month, shiftType]);

  // Handlers
  const toggleVacation = (vacationOption: VacationType, checked: boolean) => {
    setVacations((prev) => {
      const existing = Array.from(prev).find(({ key }) => {
        return key === vacationOption.key;
      });

      if (existing) {
        prev.delete(existing);
      }
      if (checked) {
        prev.add(vacationOption);
      }
      return new Set(prev);
    });
  };

  const handleTimeChange = (
    iso: string,
    field: keyof TimeRecord,
    value: string
  ) => {
    setTimes((prev) => ({
      ...prev,
      [iso]: { ...(prev[iso] || {}), [field]: value },
    }));
  };

  // --------------------
  //  Summary calculation (days only)
  // --------------------
  useEffect(() => {
    const summaryHolder: Summary = { ...defaultSummary };
    const vacationsArray = Array.from(vacations);

    summaryHolder.workedDays = activeDates.length - vacationsArray.length;

    Array.from(vacations).forEach(({ value }) => (summaryHolder[value] += 1));

    setSummary(summaryHolder);
  }, [vacations, activeDates, activeSet]);

  // Helper for d.m. format
  const formatDM = (date: Date) => `${date.getDate()}.${date.getMonth() + 1}.`;

  // --------------------
  //  Render
  // --------------------
  return (
    <>
      <style>{styles}</style>
      <div>
        <h1>Dochádzka</h1>

        <div className='user-info'>
          <label className='mr-2'>Meno a&nbsp;priezvisko:</label>
          <input
            id='firstName'
            className='mr-2'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='krstné meno'
          />{' '}
          <input
            id='lastName'
            className='mr-2'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='priezvisko'
          />
          <span id='printName'>
            {firstName} {lastName}
          </span>
        </div>

        <div className='period'>
          <label>Obdobie:</label>
          <span>
            {currentDate.toLocaleDateString('sk-SK', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>

        <div className='controls'>
          <button
            className={`${anotherMonthButtonClass} mr-2`}
            onClick={() =>
              setCurrentDate((cd) => {
                const d = new Date(cd); // clone to avoid mutation
                d.setMonth(d.getMonth() - 1);
                return d;
              })
            }
          >
            « Predchádzajúci mesiac
          </button>
          <button
            className={`${anotherMonthButtonClass} mr-2`}
            onClick={() =>
              setCurrentDate((cd) => {
                const d = new Date(cd); // clone to avoid mutation
                d.setMonth(d.getMonth() + 1);
                return d;
              })
            }
          >
            Nasledujúci mesiac »
          </button>
          <label className='mr-2'>
            <input
              type='radio'
              name='shiftToggle'
              checked={shiftType === 'regular'}
              onChange={() => setShiftType('regular')}
            />{' '}
            Štandardný
          </label>
          <label>
            <input
              type='radio'
              name='shiftToggle'
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
              <th className='vacation'>Mimo práce</th>
              <th>Príchod</th>
              <th>Odchod</th>
              <th>Obed Odchod</th>
              <th>Obed Príchod</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: daysCount }, (_, i) => i + 1).map((d) => {
              const iso = `${year}-${String(month + 1).padStart(
                2,
                '0'
              )}-${String(d).padStart(2, '0')}`;
              const dt = new Date(year, month, d);
              const wd = dt.getDay();
              const isHoliday = HOLIDAYS_2025.includes(iso);
              const isWeekend = wd === 0 || wd === 6;
              const dateDM = formatDM(dt);

              if (isWeekend)
                return (
                  <tr key={iso} className='weekend'>
                    <td>
                      {dt.toLocaleDateString('sk-SK', { weekday: 'long' })}
                    </td>
                    <td>{dateDM}</td>
                    <td className='vacation'></td>
                    <td colSpan={4}></td>
                  </tr>
                );

              if (isHoliday)
                return (
                  <tr key={iso} className='day-name'>
                    <td>
                      {dt.toLocaleDateString('sk-SK', { weekday: 'long' })}
                    </td>
                    <td>{dateDM}</td>
                    <td className='vacation'></td>
                    <td colSpan={4}>Štátny sviatok</td>
                  </tr>
                );

              const active = activeSet.has(iso);
              const vac = Array.from(vacations).some(({ key }) => key === iso);
              const rec = times[iso] || {};

              return (
                <tr key={iso}>
                  <td>{dt.toLocaleDateString('sk-SK', { weekday: 'long' })}</td>
                  <td>{dateDM}</td>
                  <td className='vacation'>
                    <input
                      type='checkbox'
                      checked={vac}
                      onChange={(e) =>
                        toggleVacation({ key: iso, value: 'vacation' }, e.target.checked)
                      }
                    />
                  </td>

                  {!vac ? (
                    <>
                      <td>
                        <input
                          type='time'
                          value={rec.in || ''}
                          onChange={(e) =>
                            handleTimeChange(iso, 'in', e.target.value)
                          }
                          disabled={!active}
                        />
                      </td>
                      <td>
                        <input
                          type='time'
                          value={rec.out || ''}
                          onChange={(e) =>
                            handleTimeChange(iso, 'out', e.target.value)
                          }
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
                    <td colSpan={4}>
                      <select
                        onChange={(e) =>
                          toggleVacation({
                            key: iso,
                            value: e.target.value as keyof Summary,
                          }, true)
                        }
                      >
                        {outOfOfficeOptions.flatMap((o, i) =>
                          Object.entries(o).map(([key, label]) => (
                            <option key={`${key}-${i}`} value={key}>
                              {label}
                            </option>
                          ))
                        )}
                      </select>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div id='summary'>
          {summary.workedDays > 0 && (
            <span>Odpracované dni: {summary.workedDays}</span>
          )}
          {summary.vacation > 0 && (
            <span>Dovolenkové dni: {summary.vacation}</span>
          )}
          {summary.doctor > 0 && <span>Dovolenkové dni: {summary.doctor}</span>}
          {summary.pn > 0 && <span>PN: {summary.pn}</span>}
          {summary.ocr > 0 && <span>OČR: {summary.ocr}</span>}
          {summary.unpaid > 0 && <span>Neplatené voľno: {summary.unpaid}</span>}
          {summary.other > 0 && <span>Iné: {summary.other}</span>}
          {summary.compensatory > 0 && (
            <span>Náhradné voľno: {summary.compensatory}</span>
          )}
        </div>
      </div>
    </>
  );
}
