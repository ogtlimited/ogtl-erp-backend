/* eslint-disable prettier/prettier */
/*
ask if the followinf fields are needed.
// designation: string,
// department: string,
*/
export interface SalarySlip{
    employee: string,
    Branch: string,
    Status: string,
    payrollEntry: string,
    letterHead: string,
    salaryStructure: string,
    salaryDeduction: string,
    payrollFrequency: string,
    bank: string,
    loans: string,
    totalInWords: string,
    totalWorkingDays: Number,
    paymentDays: Number,
    totalWorkingHours: Number,
    totalDeduction: Number,
    netPay: Number,
    startDate: Date,
    endDate: Date,
    deduction: Array<Object>
}
