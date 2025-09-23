import { UserRound } from 'lucide-react';
import classes from './UserInfo.module.scss';

interface Props {
  firstName: string;
  lastName: string;
  setFirstName: (v: string) => void;
  setLastName: (v: string) => void;
  firstNameError: boolean;
  lastNameError: boolean;
}

export default function UserInfo({
  firstName,
  lastName,
  setFirstName,
  setLastName,
  firstNameError,
  lastNameError,
}: Props) {
  return (
    <div
      className={`${classes.userInfo} relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-lg backdrop-blur-lg print:hidden`}
    >
      <div className='flex items-center justify-between pb-4 print:hidden'>
        <div className='flex items-center gap-3'>
          <span className='inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-600'>
            <UserRound className='h-5 w-5' aria-hidden='true' />
          </span>
          <div>
            <p className='font-heading text-lg font-semibold text-slate-900'>Identifikácia zamestnanca</p>
            <p className='text-sm text-slate-500'>Mená sa zobrazia v exporte aj pri tlači</p>
          </div>
        </div>
        <span className='rounded-full border border-slate-200 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 shadow-sm'>Offline</span>
      </div>

      <div className='flex flex-col gap-4 print:hidden md:flex-row md:items-end'>
        <label className='flex-1 text-sm text-slate-600' htmlFor='firstName'>
          <span className='mb-2 block text-xs uppercase tracking-[0.4em] text-slate-500'>Krstné meno</span>
          <input
            id='firstName'
            className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-medium text-slate-800 shadow-sm transition focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
              firstNameError ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-100' : ''
            }`}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='Zadajte krstné meno'
            autoComplete='given-name'
          />
          <p className={`mt-2 text-xs font-medium text-rose-500 ${!firstNameError ? 'opacity-0' : 'opacity-100'}`}>
            Povinné pole
          </p>
        </label>

        <label className='flex-1 text-sm text-slate-600' htmlFor='lastName'>
          <span className='mb-2 block text-xs uppercase tracking-[0.4em] text-slate-500'>Priezvisko</span>
          <input
            id='lastName'
            className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-medium text-slate-800 shadow-sm transition focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-100 ${
              lastNameError ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-100' : ''
            }`}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Zadajte priezvisko'
            autoComplete='family-name'
          />
          <p className={`mt-2 text-xs font-medium text-rose-500 ${!lastNameError ? 'opacity-0' : 'opacity-100'}`}>
            Povinné pole
          </p>
        </label>
      </div>

      <div className={`${classes.printOnly} mt-2 text-sm font-semibold text-slate-700`}>Meno a priezvisko: {firstName} {lastName}</div>
    </div>
  );
}
