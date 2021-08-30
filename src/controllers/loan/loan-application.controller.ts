/* eslint-disable prettier/prettier */

import { NextFunction, Request, Response } from 'express';
import { LoanApplicationDto } from '@/dtos/loan/loan-application.dto';
import { LoanApplication } from '@/interfaces/loan/loan-application.interface';
import LoanApplicationService from '@/services/loan/loan-application.service';

class LoanApplicationController {
    public loanApplicationService;

    constructor() {
        this.loanApplicationService = new LoanApplicationService();
    }

    public getLoanApplications = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllLoanApplications: LoanApplication[] = await this.loanApplicationService.findAll();
            res.status(200).json({ data: findAllLoanApplications, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public getLoanApplication = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const loanApplicationId: string = req.params.loanApplicationId;
            const findLoanApplication: LoanApplication = await this.loanApplicationService.find(loanApplicationId);
            res.status(200).json({ data: findLoanApplication, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    };

    public createLoanApplication = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const Payload: LoanApplicationDto = req.body;
            const newLoanApplication: LoanApplication = await this.loanApplicationService.create(Payload);
            res.status(201).json({ data: newLoanApplication, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    // public updateLoanApplication = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const loanApplicationId: string = req.params.loanApplicationId;
    //         const Payload: PutLoanDto = req.body;
    //         const updateLoanApplication: LoanApplication = await this.loanApplicationService.update(loanApplicationId, Payload);
    //         res.status(200).json({ data: updateLoanApplication, message: 'updated' });
    //     } catch (error) {
    //         next(error);
    //     }
    // };

    public deleteLoanApplication = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.loanApplicationId;
            const dropLoanApplication: LoanApplication = await this.loanApplicationService.delete(id);
            res.status(200).json({ data: dropLoanApplication, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };
}

export default LoanApplicationController;
