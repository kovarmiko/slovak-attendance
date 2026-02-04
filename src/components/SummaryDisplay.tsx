import { Summary } from '../types';
import classes from './SummaryDisplay.module.scss';

export default function SummaryDisplay({
  summary,
  holidaysCount,
  doctorVisits,
  setDoctorVisits,
}: {
  summary: Summary;
  holidaysCount: number;
  doctorVisits: number;
  setDoctorVisits: (value: number) => void;
}) {
  const items: Array<{ label: string; value: number }> = [];

  if (summary.workedDays > 0) {
    items.push({ label: 'Odpracované dni', value: summary.workedDays });
  }
  if (summary.workedHours > 0) {
    items.push({ label: 'Odpracované hodiny', value: summary.workedHours });
  }

  if (summary.vacation > 0) items.push({ label: 'Dovolenkové dni', value: summary.vacation });
  if (summary.doctor > 0) items.push({ label: 'Návšteva lekára', value: summary.doctor });
  if (summary.pn > 0) items.push({ label: 'PN', value: summary.pn });
  if (summary.ocr > 0) items.push({ label: 'OČR', value: summary.ocr });
  if (summary.unpaid > 0) items.push({ label: 'Neplatené voľno', value: summary.unpaid });
  if (summary.other > 0) items.push({ label: 'Iné', value: summary.other });
  if (summary.compensatory > 0) {
    items.push({ label: 'Náhradné voľno', value: summary.compensatory });
  }

  if (items.length === 0) return null;

  return (
    <div
      className={`${classes.summary} flex flex-wrap items-center justify-end gap-2 print:w-full print:justify-start print:text-left`}
    >
      <div className='flex flex-wrap items-center justify-end gap-2 print:hidden'>
        {items.map((item) => (
          <span
            key={item.label}
            className='inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm ring-1 ring-inset ring-slate-200 backdrop-blur-sm'
          >
            <span className='h-2 w-2 rounded-full bg-sky-400' aria-hidden='true' />
            {item.label}:
            <span className='font-heading text-sm font-semibold text-slate-900'>
              {item.value}
            </span>
          </span>
        ))}
        <label className='inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm'>
          Návšteva lekára:
          <input
            type='number'
            min={0}
            className='w-16 rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-center text-xs font-semibold text-slate-700 focus:border-sky-300 focus:outline-none focus:ring-1 focus:ring-sky-100'
            value={doctorVisits}
            onChange={(e) => setDoctorVisits(Math.max(0, Number(e.target.value) || 0))}
          />
        </label>
      </div>
      <div className={classes.printSummary}>
        <div className={classes.printRow}>
          <span>Odpracované dni:</span>
          <span>{summary.workedDays}</span>
        </div>
        <div className={classes.printRow}>
          <span>Odpracované hodiny:</span>
          <span>{summary.workedHours}</span>
        </div>
        <div className={classes.printRow}>
          <span>Štátne sviatky:</span>
          <span>{holidaysCount}</span>
        </div>
        <div className={classes.printRow}>
          <span>Dovolenkové dni:</span>
          <span>{summary.vacation}</span>
        </div>
        <div className={classes.printRow}>
          <span>Návšteva lekára:</span>
          <span>{doctorVisits}</span>
        </div>
      </div>
    </div>
  );
}
