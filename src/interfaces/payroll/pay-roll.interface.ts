/* eslint-disable prettier/prettier */
export interface PayRoll{
    _id: string;
    branch: string,
    department: string,
    startDate: Date,
    endDate: Date,
    salary_slips_created: boolean,
    payment_account: string,
    number_of_employees: Number,
    status: string,
    payroll_frequency: string,
    validateAttendance: boolean,
    salarySlipsSubmitted: boolean,
    deductTaxForUnsubmittedTaxExemptionProof: boolean,
    deductTaxForUnclaimedEmployeeBenefits: boolean,
    employees: Array<Object>
}
