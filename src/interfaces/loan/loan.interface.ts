/* eslint-disable prettier/prettier */
export interface Loan {
    applicant_type_id: string;
    applicant_id: string;
    loan_type_id: String;
    loan_application_id: string;
    repay_from_salary: Boolean;
    loan_amount: Number;
    repayment_start_date: String;
    repayment_method: String;
    mode_of_payment_id: string;
    loan_account_id: string;
    payment_account_id: string;
    interest_income_account_id: string;
    status_id: String;
}