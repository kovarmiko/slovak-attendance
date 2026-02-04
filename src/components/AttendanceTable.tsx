import {
  ShiftType,
  Summary,
  VacationType,
  TimeRecord,
} from '../types';
import { getHolidays } from '../constants';
import React from 'react';
import classes from './AttendanceTable.module.scss';

interface Props {
  year: number;
  month: number;
  daysCount: number;
  activeSet: Set<string>;
  vacations: Set<VacationType>;
  toggleVacation: (v: VacationType, checked: boolean) => void;
  times: Record<string, TimeRecord>;
  handleTimeChange: (
    iso: string,
    field: keyof TimeRecord,
    value: string,
  ) => void;
  handleLunchChange: (iso: string, lunchMinutes: number) => void;
  shiftType: ShiftType;
  outOfOfficeOptions: Array<Partial<Record<keyof Summary, string>>>;
}

const formatDM = (date: Date) => `${date.getDate()}.${date.getMonth() + 1}.`;

const formatWorkedHours = (
  rec: TimeRecord | undefined,
  shiftType: ShiftType,
) => {
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

export default function AttendanceTable({
  year,
  month,
  daysCount,
  activeSet,
  vacations,
  toggleVacation,
  times,
  handleTimeChange,
  handleLunchChange,
  shiftType,
  outOfOfficeOptions,
}: Props) {
  return (
    <table className={`${classes.table} text-sm text-slate-700`}>
      <thead>
        <tr>
          <th className={classes.dayColumn}>Deň</th>
          <th className={classes.dateColumn}>Dátum</th>
          <th className={classes.vacation}>Mimo práce</th>
          <th>Príchod</th>
          <th>Odchod</th>
          <th>Obed Odchod</th>
          <th>Obed Príchod</th>
          <th className={classes.workedHours}>Odpracované hodiny</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: daysCount }, (_, i) => i + 1).map((d) => {
          const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
          const dt = new Date(year, month, d);
          const wd = dt.getDay();
          const HOLIDAYS = getHolidays(year);
          const isHoliday = HOLIDAYS.includes(iso);
          const isWeekend = wd === 0 || wd === 6;
          const dateDM = formatDM(dt);

          if (isWeekend)
            return (
              <tr key={iso} className={classes.weekend}>
                <td className={classes.dayColumn}>
                  {dt.toLocaleDateString('sk-SK', { weekday: 'long' })}
                </td>
                <td className={classes.dateColumn}>{dateDM}</td>
                <td className={classes.vacation}></td>
                <td colSpan={5}></td>
              </tr>
            );

          if (isHoliday)
            return (
              <tr key={iso} className={classes.dayName}>
                <td className={classes.dayColumn}>
                  {dt.toLocaleDateString('sk-SK', { weekday: 'long' })}
                </td>
                <td className={classes.dateColumn}>{dateDM}</td>
                <td className={classes.vacation}></td>
                <td colSpan={5}>Štátny sviatok</td>
              </tr>
            );

          const active = activeSet.has(iso);
          const vac = Array.from(vacations).some(({ key }) => key === iso);
          const rec = times[iso] || {};

          return (
            <tr key={iso}>
              <td className={classes.dayColumn}>
                {dt.toLocaleDateString('sk-SK', { weekday: 'long' })}
              </td>
              <td className={classes.dateColumn}>{dateDM}</td>
              <td className={classes.vacation}>
                <input
                  type='checkbox'
                  checked={vac}
                  onChange={(e) =>
                    toggleVacation({ key: iso, value: 'vacation' }, e.target.checked)
                  }
                  className='h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-sky-200'
                />
              </td>
              {!vac ? (
                <>
                  <td>
                    <input
                      type='time'
                      value={rec.in || ''}
                      onChange={(e) => handleTimeChange(iso, 'in', e.target.value)}
                      disabled={!active}
                      className='w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-center text-sm font-medium text-slate-800 shadow-sm transition focus:border-sky-300 focus:outline-none focus:ring-1 focus:ring-sky-100 disabled:cursor-not-allowed disabled:bg-slate-100/70'
                    />
                  </td>
                  <td>
                    <input
                      type='time'
                      value={rec.out || ''}
                      onChange={(e) => handleTimeChange(iso, 'out', e.target.value)}
                      disabled={!active}
                      className='w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-center text-sm font-medium text-slate-800 shadow-sm transition focus:border-sky-300 focus:outline-none focus:ring-1 focus:ring-sky-100 disabled:cursor-not-allowed disabled:bg-slate-100/70'
                    />
                  </td>
                  {shiftType === 'regular' ? (
                    <>
                      <td className='font-semibold text-slate-700'>12:00</td>
                      <td>
                        <div className='flex items-center justify-center gap-3'>
                          <span className='text-sm font-semibold text-slate-800'>
                            {`${String(12 + Math.floor((rec.lunchMinutes ?? 40) / 60)).padStart(2, '0')}:${String((rec.lunchMinutes ?? 40) % 60).padStart(2, '0')}`}
                          </span>
                          <select
                            className='print:hidden rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 shadow-sm transition hover:border-sky-200 focus:border-sky-300 focus:outline-none focus:ring-1 focus:ring-sky-100'
                            value={rec.lunchMinutes ?? 40}
                            onChange={(e) =>
                              handleLunchChange(iso, Number(e.target.value))
                            }
                            disabled={!active}
                          >
                            {[30, 40, 50, 60].map((m) => (
                              <option key={m} value={m}>{m} min</option>
                            ))}
                          </select>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td></td>
                      <td></td>
                    </>
                  )}
                  <td className={classes.workedHours}>
                    {formatWorkedHours(rec, shiftType)}
                  </td>
                </>
              ) : (
                <td colSpan={5}>
                  <select
                    onChange={(e) =>
                      toggleVacation(
                        { key: iso, value: e.target.value as keyof Summary },
                        true,
                      )
                    }
                    className='w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm font-medium text-slate-700 shadow-sm focus:border-sky-300 focus:outline-none focus:ring-1 focus:ring-sky-100'
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
  );
}
