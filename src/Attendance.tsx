import React, { useState, useEffect, useMemo } from 'react';
import classes from './Attendance.module.scss';
import { TimeRecord, ShiftType, Summary, VacationType } from './types';
import { getHolidays, defaultSummary } from './constants';
import UserInfo from './components/UserInfo';
import Controls from './components/Controls';
import AttendanceTable from './components/AttendanceTable';
import SummaryDisplay from './components/SummaryDisplay';

export default function Attendance(): JSX.Element {
  // State
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [shiftType, setShiftType] = useState<ShiftType>('regular');
  const [companyName, setCompanyName] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [firstNameError, setFirstNameError] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<boolean>(false);
  const [vacations, setVacations] = useState<Set<VacationType>>(new Set());
  const [times, setTimes] = useState<Record<string, TimeRecord>>({});
  const [summary, setSummary] = useState<Summary>({ ...defaultSummary });
  const [doctorVisits, setDoctorVisits] = useState<number>(0);

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
      const HOLIDAYS = getHolidays(year);
      if (wd >= 1 && wd <= 5 && !HOLIDAYS.includes(iso)) arr.push(iso);
    }
    return arr;
  }, [year, month, daysCount]);

  const activeDates: string[] = useMemo(
    () => (shiftType === 'shortened' ? workDates.slice(0, 8) : workDates),
    [workDates, shiftType]
  );
  const activeSet = useMemo(() => new Set<string>(activeDates), [activeDates]);

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
          lunchMinutes: shiftType === 'regular' ? 40 : undefined,
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

  const handleLunchChange = (iso: string, lunchMinutes: number) => {
    setTimes((prev) => {
      const rec = prev[iso] || {};
      const next: TimeRecord = { ...rec, lunchMinutes };
      if (rec.in) {
        const [inH, inM] = rec.in.split(':').map(Number);
        const total = inH * 60 + inM + 8 * 60 + lunchMinutes; // 8h work + lunch
        const outH = Math.floor((total % (24 * 60)) / 60);
        const outM = total % 60;
        next.out = `${String(outH).padStart(2, '0')}:${String(outM).padStart(2, '0')}`;
      }
      return { ...prev, [iso]: next };
    });
  };

  useEffect(() => {
    if (firstName) setFirstNameError(false);
  }, [firstName]);

  useEffect(() => {
    if (lastName) setLastNameError(false);
  }, [lastName]);

  const formattedPeriod = currentDate.toLocaleDateString('sk-SK', {
    month: 'long',
    year: 'numeric',
  });

  const activeWorkingDays = activeDates.length;
  const displayName = [firstName, lastName].filter(Boolean).join(' ');
  const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
  const holidaysCount = getHolidays(year).filter((iso) =>
    iso.startsWith(monthKey)
  ).length;

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
    const formatWorkedHours = (rec: TimeRecord | undefined) => {
      if (!rec?.in || !rec?.out) return '';
      const [inH, inM] = rec.in.split(':').map(Number);
      const [outH, outM] = rec.out.split(':').map(Number);
      if (Number.isNaN(inH) || Number.isNaN(inM) || Number.isNaN(outH) || Number.isNaN(outM)) {
        return '';
      }
      let totalMinutes = outH * 60 + outM - (inH * 60 + inM);
      if (shiftType === 'regular') {
        totalMinutes -= rec.lunchMinutes ?? 40;
      }
      if (totalMinutes <= 0) return '';
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours}:${String(minutes).padStart(2, '0')}`;
    };

    const header = [
      'Deň',
      'Dátum',
      'Mimo práce',
      'Príchod',
      'Odchod',
      'Obed Odchod',
      'Obed Príchod',
      'Odpracované hodiny',
    ];
    const rows: string[][] = [];

    for (let d = 1; d <= daysCount; d++) {
      const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(
        d
      ).padStart(2, '0')}`;
      const dt = new Date(year, month, d);
      const wd = dt.getDay();
      const HOLIDAYS = getHolidays(year);
      const isHoliday = HOLIDAYS.includes(iso);
      const isWeekend = wd === 0 || wd === 6;
      const dayName = dt.toLocaleDateString('sk-SK', { weekday: 'long' });
      const dateDM = `${d}.${month + 1}.`;

      if (isWeekend) {
        rows.push([dayName, dateDM, '', '', '', '', '', '']);
        continue;
      }
      if (isHoliday) {
        rows.push([dayName, dateDM, '', 'Štátny sviatok', '', '', '', '']);
        continue;
      }

      const vacation = Array.from(vacations).find(({ key }) => key === iso);
      const rec = times[iso] || {};

      if (vacation) {
        const label =
          outOfOfficeOptions
            .flatMap((o) => Object.entries(o))
            .find(([k]) => k === vacation.value)?.[1] || '';
        rows.push([dayName, dateDM, label as string, '', '', '', '', '']);
      } else {
        rows.push([
          dayName,
          dateDM,
          '',
          rec.in || '',
          rec.out || '',
          shiftType === 'regular' ? '12:00' : '',
          shiftType === 'regular'
            ? `${String(12 + Math.floor((rec.lunchMinutes ?? 40) / 60)).padStart(2, '0')}:${String((rec.lunchMinutes ?? 40) % 60).padStart(2, '0')}`
            : '',
          formatWorkedHours(rec),
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

  const handleDownloadExcel = async () => {
    const { header, rows } = buildExportData();
    const xlsx = await import('xlsx');
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.aoa_to_sheet([header, ...rows]);
    xlsx.utils.book_append_sheet(wb, ws, 'Attendance');
    xlsx.writeFile(wb, `attendance_${month + 1}_${year}.xlsx`);
  };

  // Summary calculation
  useEffect(() => {
    const summaryHolder: Summary = { ...defaultSummary };
    summaryHolder.workedDays = activeDates.length - vacations.size;

    let totalHours = 0;
    activeDates.forEach((iso) => {
      const isVacation = Array.from(vacations).some((v) => v.key === iso);
      if (isVacation) return;
      const rec = times[iso];
      if (!rec?.in || !rec?.out) return;
      const [inH, inM] = rec.in.split(':').map(Number);
      const [outH, outM] = rec.out.split(':').map(Number);
      let diff = outH * 60 + outM - (inH * 60 + inM);
      if (shiftType === 'regular') diff -= rec.lunchMinutes ?? 40;
      totalHours += diff / 60;
    });
    summaryHolder.workedHours = Math.round(totalHours * 100) / 100;

    Array.from(vacations).forEach(({ value }) => (summaryHolder[value] += 1));
    setSummary(summaryHolder);
  }, [vacations, activeDates, times, shiftType]);

  return (
    <div
      className={`${classes.attendance} mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 print:px-0`}
    >
      <section className='hidden print:block text-black print:mb-4'>
        <h1 className='text-center text-2xl font-semibold'>Dochádzka</h1>
        <div className='mt-5 space-y-1 text-sm'>
          <p>
            <span className='font-semibold'>Spoločnosť:</span>{' '}
            {companyName || '________________'}
          </p>
          <p>
            <span className='font-semibold'>Obdobie:</span> {formattedPeriod}
          </p>
          <p>
            <span className='font-semibold'>Meno a priezvisko:</span>{' '}
            {displayName || '________________'}
          </p>
        </div>
      </section>

      <section className='relative overflow-hidden rounded-3xl border border-slate-900/25 bg-gradient-to-br from-slate-900 via-slate-800 to-sky-700 px-6 py-10 text-slate-50 shadow-2xl print:hidden'>
        <div className='absolute left-10 top-6 h-36 w-36 rounded-full bg-sky-400/35 blur-3xl' aria-hidden='true' />
        <div className='absolute bottom-0 right-10 h-40 w-40 rounded-full bg-indigo-400/25 blur-3xl' aria-hidden='true' />
        <div className='relative z-10 grid gap-8 md:grid-cols-[1.7fr_minmax(0,1fr)] md:items-center'>
          <div className='space-y-5'>
            <span className='inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-slate-100'>Dochádzka</span>
            <h1 className='font-heading text-4xl font-semibold leading-tight sm:text-5xl'>Kontrolujte dochádzku s istotou a eleganciou</h1>
            <p className='max-w-2xl text-base text-slate-200/90'>Všetky príchody, odchody aj dni mimo práce máte na jednom mieste. Sledujte priebeh mesiaca, upravujte prestávky a pripravte dokument na podpis bez zbytočných tabuliek.</p>
            <div className='flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-200/80'>
              <span className='inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1'>
                <span className='h-2 w-2 rounded-full bg-emerald-300' aria-hidden='true' />
                Dáta zostávajú vo vašom prehliadači
              </span>
              <span className='inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1'>
                <span className='h-2 w-2 rounded-full bg-sky-300' aria-hidden='true' />
                Export do CSV, XLSX aj tlač
              </span>
            </div>
          </div>
          <div className='rounded-3xl border border-white/30 bg-white/15 p-6 text-slate-100 shadow-lg backdrop-blur-xl'>
            <p className='text-xs uppercase tracking-[0.4em] text-slate-200'>Aktuálne obdobie</p>
            <p className='mt-2 font-heading text-3xl font-semibold capitalize'>{formattedPeriod}</p>
            <p className='mt-4 text-sm text-slate-200/90'>
              Aktívnych pracovných dní: <span className='font-semibold text-white'>{activeWorkingDays}</span>
            </p>
            <p className='text-sm text-slate-200/75'>Režim: {shiftType === 'regular' ? 'štandardný' : 'skrátený'}</p>
          </div>
        </div>
      </section>

      <Controls setCurrentDate={setCurrentDate} shiftType={shiftType} setShiftType={setShiftType} />

      <UserInfo
        companyName={companyName}
        setCompanyName={setCompanyName}
        firstName={firstName}
        lastName={lastName}
        setFirstName={setFirstName}
        setLastName={setLastName}
        firstNameError={firstNameError}
        lastNameError={lastNameError}
      />

      <section className='rounded-[32px] border border-slate-200/70 bg-white/80 p-6 shadow-2xl backdrop-blur-xl print:mx-0 print:mt-6 print:border-0 print:bg-transparent print:p-0 print:shadow-none print:backdrop-blur-none md:p-8'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
          <div className='print:hidden'>
            <h2 className='font-heading text-2xl font-semibold text-slate-900'>Mesačný prehľad</h2>
            <p className='text-sm text-slate-500'>Úpravy sa ukladajú priebežne, bez nutnosti registrácie.</p>
          </div>
          <div className='flex items-center gap-2 text-xs text-slate-500 print:hidden'>
            <span className='inline-flex h-2 w-2 rounded-full bg-emerald-400' aria-hidden='true' />
            Kliknutím do buniek priamo meníte časy alebo prestávky.
          </div>
        </div>
        <div className='mt-6 overflow-x-auto print:overflow-visible'>
          <AttendanceTable
            year={year}
            month={month}
            daysCount={daysCount}
            activeSet={activeSet}
            vacations={vacations}
            toggleVacation={toggleVacation}
            times={times}
            handleTimeChange={handleTimeChange}
            handleLunchChange={handleLunchChange}
            shiftType={shiftType}
            outOfOfficeOptions={outOfOfficeOptions}
          />
        </div>
      </section>

      <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between print:mt-4 print:flex print:flex-col print:items-start print:gap-2'>
        <div className='flex flex-wrap gap-3 print:hidden'>
          <button
            onClick={handlePrint}
            className='inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300'
          >
            Tlačiť
          </button>
          <button
            onClick={handleDownloadCSV}
            className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-sky-200 hover:text-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200'
          >
            Stiahnuť CSV
          </button>
          <button
            onClick={handleDownloadExcel}
            className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-sky-200 hover:text-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200'
          >
            Stiahnuť Excel
          </button>
        </div>
        <SummaryDisplay
          summary={summary}
          holidaysCount={holidaysCount}
          doctorVisits={doctorVisits}
          setDoctorVisits={setDoctorVisits}
        />
      </div>
    </div>
  );
}
