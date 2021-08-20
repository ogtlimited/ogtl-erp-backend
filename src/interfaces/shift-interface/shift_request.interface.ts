export interface IShiftRequest {
  _id: string;
  employee_id: string;
  shift_type_id: string;
  from_date: Date;
  to_date: Date;
}
