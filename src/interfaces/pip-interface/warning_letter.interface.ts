
export interface IWarningLetter {
  _id:string;
  employee_id: string;
  hr_user_id: string;
  reason:string;
  details: string;
  actions:string;
  date_issued: Date;
  warningCount: number;
  isInPip: boolean;
}
