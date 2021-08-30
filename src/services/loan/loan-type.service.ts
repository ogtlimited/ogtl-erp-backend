/* eslint-disable prettier/prettier */

import loanTypeModel from '@/models/loan/loan-type.model';
import { LoanType } from '@/interfaces/loan/loan-type.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { LoanTypeDto } from '@/dtos/loan/loan-type.dto';

class LoanTypeService {
    public loanType: any;

    constructor() {
        this.loanType = loanTypeModel;
    }

    public async findAll(): Promise<LoanType[]> {
        const loanTypes: LoanType[] = await this.loanType.find();
        return loanTypes;
    }

    public async find(loanTypeId: string): Promise<LoanType> {
        if (isEmpty(loanTypeId)) throw new HttpException(400, "Missing loanTypeId Params");
        const findLoanType = this.findOne(loanTypeId);
        if (!findLoanType) throw new HttpException(409, "Loan not found");
        return findLoanType;
    }

    public async create(Payload: LoanTypeDto): Promise<LoanType> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const newLoanType: LoanType = await this.loanType.create(Payload);
        return newLoanType;
    }

    // public async update(loanId: string, Payload: PutLoanDto): Promise<Loan> {
    //     if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
    //     const findloan = this.findOne(loanId);
    //     if (!findloan) throw new HttpException(409, "Loan not found");
    //     const updateLoan: Loan = await this.loan.findByIdAndUpdate(loanId, { Payload }, {new: true});
    //     return updateLoan;
    // }

    public async delete(loanTypeId: string): Promise<LoanType> {
        const drop: LoanType = await this.loanType.findByIdAndDelete(loanTypeId);
        if (!drop) throw new HttpException(409, `${loanTypeId} Loan does not exist`);
        return drop;
    }

    private async findOne(id: string): Promise<LoanType> {
        const findloan: LoanType = await this.loanType.findOne({ _id: id });
        return findloan;
    }
}

export default LoanTypeService;
