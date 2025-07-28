import React, { useState, useEffect, useMemo } from 'react';
import { styles } from './styles';
import {
  TimeRecord,
  ShiftType,
  Summary,
  VacationType,
} from './types';
import { HOLIDAYS_2025, defaultSummary } from './constants';
import UserInfo from './components/UserInfo';
import Controls from './components/Controls';
import AttendanceTable from './components/AttendanceTable';
import SummaryDisplay from './components/SummaryDisplay';

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

  // Derived data
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
    [workDates, shiftType],
  );
  const activeSet = useMemo(() => new Set<string>(activeDates), [activeDates]);

  const anotherMonthButtonClass =
    'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded';

  // Prefill times when switching month/shift
  useEffect(() => {
    const timesKeys = Object.keys(times);
    const needsReset =
      timesKeys.length !== activeDates.length || !activeDates.every((k) => timesKeys.includes(k));

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
  }, [year, month, shiftType]);

  // Handlers
  const toggleVacation = (vacationOption: VacationType, checked: boolean) => {
    setVacations((prev) => {
      const existing = Array.from(prev).find(({ key }) => key === vacationOption.key);
      if (existing) prev.delete(existing);
      if (checked) prev.add(vacationOption);
      return new Set(prev);
    });
  };

  const handleTimeChange = (iso: string, field: keyof TimeRecord, value: string) => {
    setTimes((prev) => ({
      ...prev,
      [iso]: { ...(prev[iso] || {}), [field]: value },
    }));
  };

  // Summary calculation
  useEffect(() => {
    const summaryHolder: Summary = { ...defaultSummary };
    summaryHolder.workedDays = activeDates.length - vacations.size;
    Array.from(vacations).forEach(({ value }) => (summaryHolder[value] += 1));
    setSummary(summaryHolder);
  }, [vacations, activeDates]);

  return (
    <>
      <style>{styles}</style>
      <div>
        <h1>Dochádzka</h1>
        <UserInfo
          firstName={firstName}
          lastName={lastName}
          setFirstName={setFirstName}
          setLastName={setLastName}
        />
        <div className='period'>
          <label>Obdobie:</label>
          <span>
            {currentDate.toLocaleDateString('sk-SK', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
        <Controls
          setCurrentDate={setCurrentDate}
          shiftType={shiftType}
          setShiftType={setShiftType}
          buttonClass={anotherMonthButtonClass}
        />
        <div className='overflow-x-auto'>
          <AttendanceTable
            year={year}
            month={month}
            daysCount={daysCount}
            activeSet={activeSet}
            vacations={vacations}
            toggleVacation={toggleVacation}
            times={times}
            handleTimeChange={handleTimeChange}
            shiftType={shiftType}
            outOfOfficeOptions={outOfOfficeOptions}
          />
        </div>
        <SummaryDisplay summary={summary} />
      </div>
    </>
  );
}
