/* eslint-disable prettier/prettier */
export interface SalaryStructureAssignment {
    _id: string;
    employee: string;
    department: string;
    salaryStructure: Number;
    fromDate: Date;
    incomeTaxSlab: string;
    status: string;
}
