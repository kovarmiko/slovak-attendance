import { ShiftType } from '../types';

interface Props {
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  shiftType: ShiftType;
  setShiftType: React.Dispatch<React.SetStateAction<ShiftType>>;
  buttonClass: string;
}

export default function Controls({
  setCurrentDate,
  shiftType,
  setShiftType,
  buttonClass,
}: Props) {
  const changeMonth = (diff: number) => {
    setCurrentDate((cd) => {
      const d = new Date(cd);
      d.setMonth(d.getMonth() + diff);
      return d;
    });
  };

  return (
    <div className='controls'>
      <button className={`${buttonClass} mr-2`} onClick={() => changeMonth(-1)}>
        « Predchádzajúci mesiac
      </button>
      <button className={`${buttonClass} mr-2`} onClick={() => changeMonth(1)}>
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
  );
}
