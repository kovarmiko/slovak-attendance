import { Summary } from '../types';

export default function SummaryDisplay({ summary }: { summary: Summary }) {
  return (
    <div id='summary'>
      {summary.workedDays > 0 && (
        <span>Odpracované dni: {summary.workedDays}</span>
      )}
      {summary.vacation > 0 && (
        <span>Dovolenkové dni: {summary.vacation}</span>
      )}
      {summary.doctor > 0 && <span>Návšteva lekára: {summary.doctor}</span>}
      {summary.pn > 0 && <span>PN: {summary.pn}</span>}
      {summary.ocr > 0 && <span>OČR: {summary.ocr}</span>}
      {summary.unpaid > 0 && <span>Neplatené voľno: {summary.unpaid}</span>}
      {summary.other > 0 && <span>Iné: {summary.other}</span>}
      {summary.compensatory > 0 && (
        <span>Náhradné voľno: {summary.compensatory}</span>
      )}
    </div>
  );
}
