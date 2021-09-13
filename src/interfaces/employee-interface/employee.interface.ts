/* eslint-disable prettier/prettier */
export enum EmployeeType {
  Apprentice,
  Intern,
  Commission,
  Contract,
  Probation,
  PartTime,
  FullTime,
}

export interface Employee {
    _id: string;
    ogid: string;
    date_of_joining: string;
    default_shift: string;
    company_email: string
    department: string;
    password: string;
    designation: string;
    first_name: string;
    branch:string;
    employeeType:EmployeeType;
    projectId:string;
    status: string;
    permissionLevel: number;
    warningCount: number;
    isInPIP: boolean

}
