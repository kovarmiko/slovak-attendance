import { Summary } from './types';

export const HOLIDAYS_2025: string[] = [
  '2025-01-01',
  '2025-01-06',
  '2025-04-18',
  '2025-04-21',
  '2025-05-01',
  '2025-05-08',
  '2025-07-05',
  '2025-08-29',
  '2025-09-01',
  '2025-09-15',
  '2025-11-01',
  '2025-11-17',
  '2025-12-24',
  '2025-12-25',
  '2025-12-26',
];

export const defaultSummary: Summary = {
  workedDays: 0,
  vacation: 0,
  pn: 0,
  ocr: 0,
  unpaid: 0,
  compensatory: 0,
  other: 0,
  doctor: 0,
};
