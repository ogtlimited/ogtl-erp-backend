/* eslint-disable prettier/prettier */

export interface IWarningLetter {
  _id:string;
  employee_id: string;
  reason:string;
  details: string;
  actions:string;
  date_issued: Date;
}
