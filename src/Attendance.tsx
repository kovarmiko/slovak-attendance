import React, { useState, useEffect, useMemo } from 'react';
import { utils, writeFile } from 'xlsx';
import classes from './Attendance.module.scss';
import { TimeRecord, ShiftType, Summary, VacationType } from './types';
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
  const [firstNameError, setFirstNameError] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<boolean>(false);
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
  }, [activeDates, shiftType]);

  // Handlers
  const toggleVacation = (vacationOption: VacationType, checked: boolean) => {
    setVacations((prev) => {
      const existing = Array.from(prev).find(
        ({ key }) => key === vacationOption.key
      );
      if (existing) prev.delete(existing);
      if (checked) prev.add(vacationOption);
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

  useEffect(() => {
    if (firstName) setFirstNameError(false);
  }, [firstName]);

  useEffect(() => {
    if (lastName) setLastNameError(false);
  }, [lastName]);

  const handlePrint = () => {
    const isFirstNameValid = firstName.trim().length > 0;
    const isLastNameValid = lastName.trim().length > 0;
    setFirstNameError(!isFirstNameValid);
    setLastNameError(!isLastNameValid);
    if (isFirstNameValid && isLastNameValid) {
      window.print();
    } else {
      const el = document.getElementById(
        !isFirstNameValid ? 'firstName' : 'lastName'
      );
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const buildExportData = () => {
    const header = [
      'Deň',
      'Dátum',
      'Mimo práce',
      'Príchod',
      'Odchod',
      'Obed Odchod',
      'Obed Príchod',
    ];
    const rows: string[][] = [];

    for (let d = 1; d <= daysCount; d++) {
      const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(
        d
      ).padStart(2, '0')}`;
      const dt = new Date(year, month, d);
      const wd = dt.getDay();
      const isHoliday = HOLIDAYS_2025.includes(iso);
      const isWeekend = wd === 0 || wd === 6;
      const dayName = dt.toLocaleDateString('sk-SK', { weekday: 'long' });
      const dateDM = `${d}.${month + 1}.`;

      if (isWeekend) {
        rows.push([dayName, dateDM, '', '', '', '', '']);
        continue;
      }
      if (isHoliday) {
        rows.push([dayName, dateDM, '', 'Štátny sviatok', '', '', '']);
        continue;
      }

      const vacation = Array.from(vacations).find(({ key }) => key === iso);
      const rec = times[iso] || {};

      if (vacation) {
        const label =
          outOfOfficeOptions
            .flatMap((o) => Object.entries(o))
            .find(([k]) => k === vacation.value)?.[1] || '';
        rows.push([dayName, dateDM, label as string, '', '', '', '']);
      } else {
        rows.push([
          dayName,
          dateDM,
          '',
          rec.in || '',
          rec.out || '',
          shiftType === 'regular' ? '12:00' : '',
          shiftType === 'regular' ? '12:40' : '',
        ]);
      }
    }
    return { header, rows };
  };

  const handleDownloadCSV = () => {
    const { header, rows } = buildExportData();
    const csv = [header, ...rows]
      .map((r) => r.map((s) => `"${s.replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_${month + 1}_${year}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadExcel = () => {
    const { header, rows } = buildExportData();
    const wb = utils.book_new();
    const ws = utils.aoa_to_sheet([header, ...rows]);
    utils.book_append_sheet(wb, ws, 'Attendance');
    writeFile(wb, `attendance_${month + 1}_${year}.xlsx`);
  };

  // Summary calculation
  useEffect(() => {
    const summaryHolder: Summary = { ...defaultSummary };
    summaryHolder.workedDays = activeDates.length - vacations.size;

    if (shiftType === 'shortened') {
      let totalHours = 0;
      activeDates.forEach((iso) => {
        const isVacation = Array.from(vacations).some((v) => v.key === iso);
        if (isVacation) return;
        const rec = times[iso];
        if (!rec?.in || !rec?.out) return;
        const [inH, inM] = rec.in.split(':').map(Number);
        const [outH, outM] = rec.out.split(':').map(Number);
        const diff = outH * 60 + outM - (inH * 60 + inM);
        totalHours += diff / 60;
      });
      summaryHolder.workedHours = Math.round(totalHours * 100) / 100;
    }

    Array.from(vacations).forEach(({ value }) => (summaryHolder[value] += 1));
    setSummary(summaryHolder);
  }, [vacations, activeDates, times, shiftType]);

  return (
    <div className={classes.attendance}>
      <header>
        <div className='flex items-center justify-center'>
          <h1 className='text-3xl font-semibold tracking-tight'>Dochádzka</h1>
        </div>
        <div className={`${classes.period} text-center print:text-left`}>
          <label>Obdobie:</label>
          <span>
            {currentDate.toLocaleDateString('sk-SK', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
      </header>
      <Controls
        setCurrentDate={setCurrentDate}
        shiftType={shiftType}
        setShiftType={setShiftType}
        buttonClass={anotherMonthButtonClass}
      />
      <UserInfo
        firstName={firstName}
        lastName={lastName}
        setFirstName={setFirstName}
        setLastName={setLastName}
        firstNameError={firstNameError}
        lastNameError={lastNameError}
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
      <div className='flex justify-between pt-2'>
        <div className='space-x-2 print:hidden'>
          <button
            onClick={handlePrint}
            className='bg-green-500 hover:bg-green-600 text-white font-medium py-0 px-2 rounded'
          >
            Tlačiť
          </button>
          <button
            onClick={handleDownloadCSV}
            className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-0 px-2 rounded'
          >
            Download CSV
          </button>
          <button
            onClick={handleDownloadExcel}
            className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-0 px-2 rounded'
          >
            Download Excel
          </button>
        </div>
        <SummaryDisplay summary={summary} shiftType={shiftType} />
      </div>
    </div>
  );
}
