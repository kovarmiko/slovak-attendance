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
  // '2025-11-17',
  '2025-12-24',
  '2025-12-25',
  '2025-12-26',
];

export const HOLIDAYS_2026: string[] = [
  '2026-01-01',
  '2026-01-06',
  '2026-04-03', // Veľký piatok
  '2026-04-06', // Veľkonočný pondelok
  '2026-05-01',
  '2026-05-08',
  '2026-07-05',
  '2026-08-29',
  '2026-09-01',
  '2026-09-15',
  '2026-11-01',
  // '2026-11-17',
  '2026-12-24',
  '2026-12-25',
  '2026-12-26',
];

export const HOLIDAYS_2027: string[] = [
  '2027-01-01',
  '2027-01-06',
  '2027-03-26', // Veľký piatok
  '2027-03-29', // Veľkonočný pondelok
  '2027-05-01',
  '2027-05-08',
  '2027-07-05',
  '2027-08-29',
  '2027-09-01',
  '2027-09-15',
  '2027-11-01',
  // '2027-11-17',
  '2027-12-24',
  '2027-12-25',
  '2027-12-26',
];

export const HOLIDAYS_BY_YEAR: Record<number, string[]> = {
  2025: HOLIDAYS_2025,
  2026: HOLIDAYS_2026,
  2027: HOLIDAYS_2027,
};

export const defaultSummary: Summary = {
  workedDays: 0,
  workedHours: 0,
  vacation: 0,
  pn: 0,
  ocr: 0,
  unpaid: 0,
  compensatory: 0,
  other: 0,
  doctor: 0,
};

// Compute Slovak public holidays dynamically for any year
const toISO = (y: number, m: number, d: number) =>
  `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

const easterSunday = (year: number): Date => {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31); // 3=March, 4=April
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
};

export function getHolidays(year: number): string[] {
  // Prefer explicit known lists if present
  if (HOLIDAYS_BY_YEAR[year]) return HOLIDAYS_BY_YEAR[year];

  // Fixed-date holidays in Slovakia
  const fixed = [
    toISO(year, 1, 1), // Deň vzniku SR / Nový rok
    toISO(year, 1, 6), // Zjavenie Pána (Traja králi)
    toISO(year, 5, 1), // Sviatok práce
    toISO(year, 5, 8), // Deň víťazstva nad fašizmom
    toISO(year, 7, 5), // Sv. Cyrila a Metoda
    toISO(year, 8, 29), // Výročie SNP
    toISO(year, 9, 1), // Deň Ústavy SR
    toISO(year, 9, 15), // Sedembolestná Panna Mária
    toISO(year, 11, 1), // Sviatok všetkých svätých
    // toISO(year, 11, 17), // Deň boja za slobodu a demokraciu
    toISO(year, 12, 24), // Štedrý deň
    toISO(year, 12, 25), // Prvý sviatok vianočný
    toISO(year, 12, 26), // Druhý sviatok vianočný
  ];

  // Movable feasts: Good Friday and Easter Monday
  const easter = easterSunday(year);
  const goodFriday = new Date(easter);
  goodFriday.setDate(goodFriday.getDate() - 2);
  const easterMonday = new Date(easter);
  easterMonday.setDate(easterMonday.getDate() + 1);

  const movable = [
    toISO(
      goodFriday.getFullYear(),
      goodFriday.getMonth() + 1,
      goodFriday.getDate(),
    ),
    toISO(
      easterMonday.getFullYear(),
      easterMonday.getMonth() + 1,
      easterMonday.getDate(),
    ),
  ];

  return [...fixed, ...movable];
}
