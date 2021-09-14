/* eslint-disable prettier/prettier */

import loanModel from '@/models/loan/loan.model';
import { Loan } from '@/interfaces/loan/loan.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class LoanDeductionService {
    public loan: any;

    constructor() {
        this.loan = loanModel;
    }

    public async find(applicantId: string): Promise<any> {
        if (isEmpty(applicantId)) throw new HttpException(400, "Missing Id Params");
        const findloan = await this.hasLoan(applicantId);
        if (!findloan) return findloan;
        const deduction = await this.makeDeduction(findloan, findloan.loan_type_id);
        return deduction
    }

    private async hasLoan(id: string): Promise<Loan> {
        const findloan: Loan = this.loan.findOne({ applicant_id: id, completed: false }).populate('loan_type_id');
        return findloan;
    }

    private async makeDeduction(loanObject: any, loanType: any): Promise<any> {
        const loan_amount = Number(loanObject['loan_amount'])
        let loan_balance = Number(loanObject['loan_balance'])
        const percentage_loan = loanType['percentage_loan']
        if(loan_balance > 0){
            let deduction = (loan_amount * percentage_loan) / 100
            if(deduction > loan_balance){
                deduction = loan_balance
                loan_balance = 0
            } else {
                loan_balance -= deduction
            }
            const Payload = {loan_balance: loan_balance.toString()}
            if(loan_balance === 0){
                Payload['completed'] = true
            }
            
            const updateLoan = await this.loan.findByIdAndUpdate(loanObject['_id'], Payload,  {new: true});
            return deduction;
        }
    }
}

export default LoanDeductionService;
