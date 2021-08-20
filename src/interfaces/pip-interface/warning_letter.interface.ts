export enum Reasons {
  WORK_ABSENCE,
  DISRESPECT,
  LOW_PERFORMANCE,
  FIGHTING,
  NOT_FOLLOWING_THE_PROCEDURES,
  LATENESS,
  VIOLATION,
  OTHER
}

export interface IWarningLetter {
  _id:string;
  employee_id: string;
  supervisor_id: string;
  reason:Reasons[];
  details: string;
  actions:string;
  date_issued: Date;

}
