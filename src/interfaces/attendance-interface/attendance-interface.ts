/* eslint-disable prettier/prettier */
export interface IAttendance {
    startTime: String;
    endTime: String;
    employeeId: string | Object | Array<Object>;
    shiftTypeId: string;
    statusId: string;
}

export interface IAttendanceCreatedResponse {
    startTime: String;
    endTime: String;
    shiftTypeId: string;
    statusId: string;
}

export interface IBulkCreateAttendance {
  attendances: Array<ICreateAttendance>;
}

export interface ICreateAttendance {
  ogId?: string;
  companyEmail?: string;
  shiftTypeId?: string;
  employeeId?: string;
  clockInTime?: string;
  clockOutTime?: String;
  departmentId?: string;
  projectId?: string;
  salaryStructure_id?: any
  totalHours?: any
  hoursWorked?: number
  minutesWorked?:Number
}

export interface IAttendanceDeduction{
  employeeId: string;
  deductionTypeId: string;
  amount: number;
  description: string
}
export interface IPossibleDeductons{
  employeesDeductions?,
  employeeId?: string,
  totalWorkHours?: number,
  minutesWorked?: Number,
  departmentId?: string,
  projectId?: string,
  shiftTypeId?: IShiftType,
  ogId?: string
}

interface IShiftType{
  _id: string
}
