/* eslint-disable prettier/prettier */
export interface ISalaryComponent {
    title: string;
    salaryComponentAbbr?: string;
    description: string;
    amount: Number;
    type: string;
    departmentId?: string;
    projectId?: string;
}
