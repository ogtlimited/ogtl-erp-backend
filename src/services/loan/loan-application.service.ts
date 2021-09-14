/* eslint-disable prettier/prettier */

import loanApplicationModel from '@/models/loan/loan-application.model';
import loanTypeModel from '@/models/loan/loan-type.model';
import { LoanApplication } from '@/interfaces/loan/loan-application.interface';
import { Employee } from '@/interfaces/employee-interface/employee.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { LoanApplicationDto, PutDto, ApprovalDto } from '@/dtos/loan/loan-application.dto';
import {monthDiff} from '@/utils/date';

class LoanApplicationService {
    public loanApplication: any;
    public loanType: any;

    constructor() {
        this.loanApplication = loanApplicationModel;
        this.loanType = loanTypeModel
    }

    public async findAll(param: any = {}): Promise<LoanApplication[]> {
        const loanApplications: LoanApplication[] = await this.loanApplication.find(param).populate('loan_type_id');
        return loanApplications;
    }

    public async find(loanApplicationId: string): Promise<LoanApplication> {
        if (isEmpty(loanApplicationId)) throw new HttpException(400, "Missing loanApplicationId Params");
        const findLoanApplication = this.findOne(loanApplicationId);
        if (!findLoanApplication) throw new HttpException(409, "Loan Application not found");
        return findLoanApplication;
    }

    public async create(Payload: LoanApplicationDto, user: Employee): Promise<LoanApplication> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const validateAgainstLoanType: any = await this.checkLoanType(Payload.loan_type_id, Payload.loan_amount, user.date_of_joining )
        if (!validateAgainstLoanType) throw new HttpException(409, "Check that you passed the minimum stay requirement and you do not exceed loan amount");
        const newLoanApplication: LoanApplication = await this.loanApplication.create(Payload);
        return newLoanApplication;
    }

    public async update(loanId: string, Payload: PutDto): Promise<LoanApplication> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const findloan = this.findOne(loanId);
        if (!findloan) throw new HttpException(409, "Loan not found");
        const updateLoan: LoanApplication = await this.loanApplication.findByIdAndUpdate(loanId, { Payload }, {new: true});
        return updateLoan;
    }

    public async delete(loanApplicationId: string): Promise<LoanApplication> {
        const drop: LoanApplication = await this.loanApplication.findByIdAndDelete(loanApplicationId);
        if (!drop) throw new HttpException(409, "Loan Application does not exist");
        return drop;
    }

    public async approve(loanId: string, Payload: ApprovalDto): Promise<LoanApplication> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const findloan = this.findOne(loanId);
        if (!findloan) throw new HttpException(409, "Loan not found");
        const updateLoan: LoanApplication = await this.loanApplication.findByIdAndUpdate(loanId, { Payload }, {new: true});
        return updateLoan;
    }

    private async findOne(id: string): Promise<LoanApplication> {
        const findLoanApplication: LoanApplication = await this.loanApplication.findOne({ _id: id }).populate('loan_type_id');
        return findLoanApplication;
    }

    private async checkLoanType(id: string, amount: string, date: string): Promise<any> {
        const findloanType: any = await this.loanType.findOne({ _id: id });
        const joinDate: Date = new Date(date);
        const today: Date = new Date();
        const getMonthDiff: any = monthDiff(joinDate, today)
        if(Number(findloanType.maximum_loan_amount) > Number(amount) && findloanType.min_stay < getMonthDiff){
            return true
        } else {
            return false
        }
    }
}

export default LoanApplicationService;
