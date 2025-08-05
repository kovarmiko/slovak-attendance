export interface TimeRecord {
  in?: string;
  out?: string;
}

export type ShiftType = 'regular' | 'shortened';

export interface Summary {
  workedDays: number;
  workedHours: number;
  vacation: number;
  pn: number;
  ocr: number;
  unpaid: number;
  compensatory: number;
  other: number;
  doctor: number;
}

export type VacationType = { key: string; value: keyof Summary };
