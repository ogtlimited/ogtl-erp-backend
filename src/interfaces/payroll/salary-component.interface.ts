/* eslint-disable prettier/prettier */
export enum ISalaryComponentType {
    Earning, 
    Deduction
  }

export interface ISalaryComponent {
    salaryComponent: string;
    status: string;
    salaryComponentAbbr: string;
    description: string;
    isTaxApplicable: boolean;
    dependsOnPaymentDays: boolean;
    amount: Number;
    type: ISalaryComponentType;
}
