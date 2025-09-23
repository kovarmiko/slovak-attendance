import { Summary, ShiftType } from '../types';
import classes from './SummaryDisplay.module.scss';

export default function SummaryDisplay({
  summary,
  shiftType,
}: {
  summary: Summary;
  shiftType: ShiftType;
}) {
  const items: Array<{ label: string; value: number }> = [];

  if (shiftType === 'shortened') {
    if (summary.workedHours > 0)
      items.push({ label: 'Odpracované hodiny', value: summary.workedHours });
  } else if (summary.workedDays > 0) {
    items.push({ label: 'Odpracované dni', value: summary.workedDays });
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
      {items.map((item) => (
        <span
          key={item.label}
          className='inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm ring-1 ring-inset ring-slate-200 backdrop-blur-sm print:bg-transparent print:shadow-none print:ring-0 print:text-black'
        >
          <span className='h-2 w-2 rounded-full bg-sky-400 print:hidden' aria-hidden='true' />
          {item.label}:
          <span className='font-heading text-sm font-semibold text-slate-900 print:text-black'>
            {item.value}
          </span>
        </span>
      ))}
    </div>
  );
}
