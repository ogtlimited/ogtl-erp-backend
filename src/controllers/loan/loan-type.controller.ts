/* eslint-disable prettier/prettier */

import { NextFunction, Request, Response } from 'express';
import { LoanTypeDto } from '@/dtos/loan/loan-type.dto';
import { LoanType } from '@/interfaces/loan/loan-type.interface';
import LoanTypeService from '@/services/loan/loan-type.service';

class LoanTypeController {
    public loanTypeService;

    constructor() {
        this.loanTypeService = new LoanTypeService();
    }

    public getLoanTypes = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllLoanTypes: LoanType[] = await this.loanTypeService.findAll();
            res.status(200).json({ data: findAllLoanTypes, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public getLoanType = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const loanTypeId: string = req.params.loanTypeId;
            const findLoanType: LoanType = await this.loanTypeService.find(loanTypeId);
            res.status(200).json({ data: findLoanType, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    };

    public createLoanType = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const Payload: LoanTypeDto = req.body;
            const newLoanType: LoanType = await this.loanTypeService.create(Payload);
            res.status(201).json({ data: newLoanType, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    // public updateLoanType = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const loanId: string = req.params.loanId;
    //         const Payload: PutLoanDto = req.body;
    //         const updateLoan: Loan = await this.loanService.update(loanId, Payload);
    //         res.status(200).json({ data: updateLoan, message: 'updated' });
    //     } catch (error) {
    //         next(error);
    //     }
    // };

    public deleteLoanType = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.loanTypeId;
            const dropLoanType: LoanType = await this.loanTypeService.delete(id);
            res.status(200).json({ data: dropLoanType, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };
}

export default LoanTypeController;
