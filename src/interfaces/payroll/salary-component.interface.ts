/* eslint-disable prettier/prettier */
export interface ISalaryComponent {
    salaryComponent: string;
    salaryComponentAbbr?: string;
    description: string;
    dependsOnPaymentDays: boolean;
    amount: Number;
    type: string;
}
