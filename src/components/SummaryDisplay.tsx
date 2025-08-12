import { Summary, ShiftType } from '../types';
import classes from './SummaryDisplay.module.scss';

export default function SummaryDisplay({
  summary,
  shiftType,
}: {
  summary: Summary;
  shiftType: ShiftType;
}) {
  return (
    <div className={classes.summary}>
      {shiftType === 'shortened'
        ? summary.workedHours > 0 && (
            <span>Odpracované hodiny: {summary.workedHours}</span>
          )
        : summary.workedDays > 0 && (
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
