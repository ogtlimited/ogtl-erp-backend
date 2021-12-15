/* eslint-disable prettier/prettier */

// enum SalaryType{
//   earning = "earning",
//   deduction = "deduction"
// }
export interface ISalarySetting {
  title: string;
  percentage: Number;
  type: string ;
  startRange: Number;
  endRange:Number;
}
