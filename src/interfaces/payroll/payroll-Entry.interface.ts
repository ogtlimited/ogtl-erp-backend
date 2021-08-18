/* eslint-disable prettier/prettier */
export interface PayRollEntry{
    branch: string,
    department: string,
    status: string,
    payrollFrequency: string,
    paymentAccount: string,
    startDate: Date,
    endDate: Date,
    salarySlipsCreated: Boolean,
    numberOfEmployees: Number,
    validateAttendance: Boolean,
    salarySlipsSubmitted: Boolean,
    deductTaxForUnsubmittedTaxExemptionProof: Boolean,
    deductTaxForUnclaimedEmployeeBenefits: Boolean,
    employees: Array<Object>
}
