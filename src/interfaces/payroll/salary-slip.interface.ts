/* eslint-disable prettier/prettier */
export interface SalarySlip{
    employee: string,
    designation: string,
    department: string,
    Branch: string,
    Status: string,
    payrollEntry: string,
    letterHead: string,
    salaryStructure: string
    payrollFrequency: string
    bankName: string
    loans: string,
    totalInWords: string
    startDate: Date,
    endDate: Date,
    totalWorkingDays: Number,
    paymentDays: Number,
    totalWorkingHours: Number,
    deduction: Array<Object>
    totalDeduction: Number
    netPay: Number
}
