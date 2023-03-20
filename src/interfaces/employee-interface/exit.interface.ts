/* eslint-disable prettier/prettier */
export interface Exit{
   _id: string;
   employee_id: string;
   effective_date: Date;
   reason_for_resignation: string;
   deactivated?: boolean
   
}