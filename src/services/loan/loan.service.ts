/* eslint-disable prettier/prettier */

import loanModel from '@/models/loan/loan.model';
import { Loan } from '@/interfaces/loan/loan.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { LoanDto, PutLoanDto } from '@/dtos/loan/loan.dto';

class LoanService {
    public loan: any;

    constructor() {
        this.loan = loanModel;
    }

    public async findAll(): Promise<Loan[]> {
        const loans: Loan[] = await this.loan.find();
        return loans;
    }

    public async find(loanId: string): Promise<Loan> {
        if (isEmpty(loanId)) throw new HttpException(400, "Missing Id Params");
        const findloan = this.findOne(loanId);
        if (!findloan) throw new HttpException(409, "Loan not found");
        return findloan;
    }

    public async create(Payload: LoanDto): Promise<Loan> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request"); 
        const newLoan: Loan = await new this.loan(Payload);
        newLoan['loan_balance'] = Payload.loan_amount
        this.loan.create(newLoan)
        //const newLoan: Loan = await this.loan.create(Payload);
        return newLoan;
    }

    public async update(loanId: string, Payload: PutLoanDto): Promise<Loan> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const findloan = this.findOne(loanId);
        if (!findloan) throw new HttpException(409, "Loan not found");
        const updateLoan: Loan = await this.loan.findByIdAndUpdate(loanId, { Payload }, {new: true});
        return updateLoan;
    }

    public async delete(loanId: string): Promise<Loan> {
        const drop: Loan = await this.loan.findByIdAndDelete(loanId);
        if (!drop) throw new HttpException(409, `${loanId} Loan does not exist`);
        return drop;
    }

    private async findOne(id: string): Promise<Loan> {
        const findloan: Loan = await this.loan.findOne({ _id: id });
        return findloan;
    }
}

export default LoanService;
