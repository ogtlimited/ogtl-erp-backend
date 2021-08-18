/* eslint-disable prettier/prettier */
export enum SalaryComponentType {
    Earning, 
    Deduction
  }

export interface SalaryComponent {
    salaryComponent: string,
    salaryComponent_abbr: string,
    type: Array<SalaryComponentType>,
    description: string,
    isTaxApplicable: boolean,
    amount: Number,
    dependsOnPaymentDays: boolean,
}
