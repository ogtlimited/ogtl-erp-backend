/* eslint-disable prettier/prettier */

import loanApplicationModel from '@/models/loan/loan-application.model';
import { LoanApplication } from '@/interfaces/loan/loan-application.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { LoanApplicationDto } from '@/dtos/loan/loan-application.dto';

class LoanTypeService {
    public loanApplication: any;

    constructor() {
        this.loanApplication = loanApplicationModel;
    }

    public async findAll(): Promise<LoanApplication[]> {
        const loanApplications: LoanApplication[] = await this.loanApplication.find();
        return loanApplications;
    }

    public async find(loanApplicationId: string): Promise<LoanApplication> {
        if (isEmpty(loanApplicationId)) throw new HttpException(400, "Missing loanApplicationId Params");
        const findLoanApplication = this.findOne(loanApplicationId);
        if (!findLoanApplication) throw new HttpException(409, "Loan Application not found");
        return findLoanApplication;
    }

    public async create(Payload: LoanApplicationDto): Promise<LoanApplication> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const newLoanApplication: LoanApplication = await this.loanApplication.create(Payload);
        return newLoanApplication;
    }

    // public async update(loanId: string, Payload: PutLoanDto): Promise<Loan> {
    //     if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
    //     const findloan = this.findOne(loanId);
    //     if (!findloan) throw new HttpException(409, "Loan not found");
    //     const updateLoan: Loan = await this.loan.findByIdAndUpdate(loanId, { Payload }, {new: true});
    //     return updateLoan;
    // }

    public async delete(loanApplicationId: string): Promise<LoanApplication> {
        const drop: LoanApplication = await this.loanApplication.findByIdAndDelete(loanApplicationId);
        if (!drop) throw new HttpException(409, "Loan Application does not exist");
        return drop;
    }

    private async findOne(id: string): Promise<LoanApplication> {
        const findLoanApplication: LoanApplication = await this.loanApplication.findOne({ _id: id });
        return findLoanApplication;
    }
}

export default LoanTypeService;
