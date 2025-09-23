import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { ShiftType } from '../types';
import classes from './Controls.module.scss';

interface Props {
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  shiftType: ShiftType;
  setShiftType: React.Dispatch<React.SetStateAction<ShiftType>>;
}

const shiftOptions: Array<{ value: ShiftType; label: string }> = [
  { value: 'regular', label: 'Štandardný' },
  { value: 'shortened', label: 'Skrátený' },
];

export default function Controls({ setCurrentDate, shiftType, setShiftType }: Props) {
  const changeMonth = (diff: number) => {
    setCurrentDate((cd) => {
      const d = new Date(cd);
      d.setMonth(d.getMonth() + diff);
      return d;
    });
  };

  return (
    <div
      className={`${classes.controls} flex flex-col gap-4 rounded-3xl border border-slate-200/70 bg-white/80 p-5 shadow-lg backdrop-blur-lg print:hidden md:flex-row md:items-center md:justify-between`}
    >
      <div className='flex w-full flex-col gap-2 print:hidden sm:flex-row sm:items-center sm:justify-between md:justify-start md:gap-3'>
        <p className='flex items-center gap-2 text-sm font-medium text-slate-600'>
          <Sparkles className='h-4 w-4 text-sky-500' aria-hidden='true' />
          Vyberte sledované obdobie
        </p>
        <div className='flex flex-wrap gap-3'>
          <button
            type='button'
            onClick={() => changeMonth(-1)}
            className='inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-sky-200 hover:text-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200'
          >
            <ChevronLeft className='h-4 w-4' aria-hidden='true' />
            Predchádzajúci mesiac
          </button>
          <button
            type='button'
            onClick={() => changeMonth(1)}
            className='inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-sky-200 hover:text-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200'
          >
            Nasledujúci mesiac
            <ChevronRight className='h-4 w-4' aria-hidden='true' />
          </button>
        </div>
      </div>

      <div className='flex flex-col gap-2 print:hidden sm:flex-row sm:items-center sm:gap-3'>
        <span className='text-xs uppercase tracking-[0.35em] text-slate-500'>Režim</span>
        <div className='inline-flex rounded-full border border-slate-200/80 bg-white/80 p-1 shadow-inner'>
          {shiftOptions.map(({ value, label }) => (
            <button
              key={value}
              type='button'
              onClick={() => setShiftType(value)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200 ${
                shiftType === value
                  ? 'bg-gradient-to-r from-sky-400 via-indigo-400 to-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              aria-pressed={shiftType === value}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
