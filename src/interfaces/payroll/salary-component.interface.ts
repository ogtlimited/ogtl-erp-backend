/* eslint-disable prettier/prettier */
export interface ISalaryComponent {
    salaryComponent: string;
    salaryComponentAbbr: string;
    description: string;
    isTaxApplicable: boolean;
    dependsOnPaymentDays: boolean;
    amount: Number;
    type: string;
}
