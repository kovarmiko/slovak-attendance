import {
  ShiftType,
  Summary,
  VacationType,
  TimeRecord,
} from '../types';
import { HOLIDAYS_2025 } from '../constants';
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
  shiftType: ShiftType;
  outOfOfficeOptions: Array<Partial<Record<keyof Summary, string>>>;
}

const formatDM = (date: Date) => `${date.getDate()}.${date.getMonth() + 1}.`;

export default function AttendanceTable({
  year,
  month,
  daysCount,
  activeSet,
  vacations,
  toggleVacation,
  times,
  handleTimeChange,
  shiftType,
  outOfOfficeOptions,
}: Props) {
  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>Deň</th>
          <th>Dátum</th>
          <th className={classes.vacation}>Mimo práce</th>
          <th>Príchod</th>
          <th>Odchod</th>
          <th>Obed Odchod</th>
          <th>Obed Príchod</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: daysCount }, (_, i) => i + 1).map((d) => {
          const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
          const dt = new Date(year, month, d);
          const wd = dt.getDay();
          const isHoliday = HOLIDAYS_2025.includes(iso);
          const isWeekend = wd === 0 || wd === 6;
          const dateDM = formatDM(dt);

          if (isWeekend)
            return (
              <tr key={iso} className={classes.weekend}>
                <td>{dt.toLocaleDateString('sk-SK', { weekday: 'long' })}</td>
                <td>{dateDM}</td>
                <td className={classes.vacation}></td>
                <td colSpan={4}></td>
              </tr>
            );

          if (isHoliday)
            return (
              <tr key={iso} className={classes.dayName}>
                <td>{dt.toLocaleDateString('sk-SK', { weekday: 'long' })}</td>
                <td>{dateDM}</td>
                <td className={classes.vacation}></td>
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
              <td className={classes.vacation}>
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
                      onChange={(e) => handleTimeChange(iso, 'in', e.target.value)}
                      disabled={!active}
                    />
                  </td>
                  <td>
                    <input
                      type='time'
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
                <td colSpan={4}>
                  <select
                    onChange={(e) =>
                      toggleVacation(
                        { key: iso, value: e.target.value as keyof Summary },
                        true,
                      )
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
  );
}
