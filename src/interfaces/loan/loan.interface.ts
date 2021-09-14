/* eslint-disable prettier/prettier */
export interface Loan {
    applicant_id: string;
    loan_type_id: String;
    loan_application_id: string;
    repay_from_salary: Boolean;
    loan_amount: String;
    repayment_start_date: String;
    mode_of_payment_id: string;
    loan_account_id: string;
    payment_account_id: string;
    interest_income_account_id: string;
    repayment_id: string;
    completed: Boolean
}