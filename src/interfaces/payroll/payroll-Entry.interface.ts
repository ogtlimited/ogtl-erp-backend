/* eslint-disable prettier/prettier */
export interface PayRollEntry{
    branch: string;
    department: string;
    status: string;
    payrollFrequency: string;
    paymentAccount: string;
    startDate: Date;
    endDate: Date;
    salarySlipsCreated: Boolean;
    validateAttendance: Boolean;
    salarySlipsSubmitted: Boolean;
    deductTaxForUnsubmittedTaxExemptionProof: Boolean;
    deductTaxForUnclaimedEmployeeBenefits: Boolean;
    numberOfEmployees: Number;
    employees: Array<Object>
}
