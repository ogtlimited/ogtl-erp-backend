/* eslint-disable prettier/prettier */

import { NextFunction, Request, Response } from 'express';
import { LoanApplicationDto, PutDto, ApprovalDto } from '@/dtos/loan/loan-application.dto';
import { LoanApplication } from '@/interfaces/loan/loan-application.interface';
import LoanApplicationService from '@/services/loan/loan-application.service';
import LoanDeductionService from '@/services/loan/loan-deduction.service';
import {opts} from '@/utils/rbac-opts';

const RBAC = require('easy-rbac');
const rbac = new RBAC(opts);

class LoanApplicationController {
    public loanApplicationService: any
    public loanDeductionService: any

    constructor() {
        this.loanApplicationService = new LoanApplicationService();
        this.loanDeductionService = new LoanDeductionService();
    }

    public getLoanApplications = async (req: Request, res: Response, next: NextFunction) => {
        let user = (<any>req).user
        // const mongoose = require('mongoose');
        // const models = mongoose.modelNames()
        // console.log('my mongojhghfhgjjhfdf'+models)
        rbac.can('hr_user', 'post:readAll')
        .then(result => {
            if (result) {
                const findAllLoans: LoanApplication[] = this.loanApplicationService.findAll();
                return findAllLoans;
                
            } else {
                const findAllLoans: LoanApplication[] = this.loanApplicationService.findAll({applicant_name_id: user._id});
                return findAllLoans;
            }
        })
        .then(data => {
            res.status(200).json({ data: data, message: 'findAll2' });
        })
        .catch(err => {
            next(err);
        })
    };

    public getLoanApplication = async (req: Request, res: Response, next: NextFunction) => {
        let user = (<any>req).user
        const loanApplicationId: string = req.params.loanApplicationId;
        const findLoanApplication: LoanApplication = await this.loanApplicationService.find(loanApplicationId);
        rbac.can('hr_user', 'user:*', {userId: user._id, ownerId:findLoanApplication.applicant_name_id, status:findLoanApplication.status['enum']})
        .then(result => {
            if (result) {
                res.status(200).json({ data: findLoanApplication, message: 'findAll' });
            } else {
                res.status(200).json({ data: "Not permitted", message: 'findAll' });
            }
        })
        .catch(err => {
            next(err);
        })

    };

    public createLoanApplication = async (req: Request, res: Response, next: NextFunction) => {
        let user = (<any>req).user
        rbac.can('hr_user', 'user:create')
        .then(result => {
            if (result) {
                const Payload: LoanApplicationDto = req.body;
                const newLoanApplication: LoanApplication = this.loanApplicationService.create(Payload, user);
                return newLoanApplication;
            } else {
                res.status(200).json({ data: "Not permitted", message: 'findAll' });
            }
        })
        .then(data => {
            res.status(201).json({ data: data, message: 'created' })
        })
        .catch(err => {
            next(err);
        })
    };

    public updateLoanApplication = async (req: Request, res: Response, next: NextFunction) => {
        let user = (<any>req).user
        const loanApplicationId: string = req.params.loanApplicationId;
        const findLoanApplication: LoanApplication = await this.loanApplicationService.find(loanApplicationId);

        rbac.can('hr_user', 'user:*', {userId: user._id, ownerId:findLoanApplication.applicant_name_id, status:findLoanApplication.status['enum']})
        .then(result => {
            if (result) {
                const loanApplicationId: string = req.params.loanApplicationId;
                const Payload: PutDto = req.body;
                const updateLoanApplication: LoanApplication = this.loanApplicationService.update(loanApplicationId, Payload);
                return updateLoanApplication;
            } else {
                res.status(200).json({ data: "Not permitted", message: 'findAll' });
            }
        })
        .then(data => {
            res.status(200).json({ data: data, message: 'updated' });
        })
        .catch(err => {
            next(err);
        })
    };

    public approveLoanApplication = async (req: Request, res: Response, next: NextFunction) => {
        let user = (<any>req).user
        const loanApplicationId: string = req.params.loanApplicationId;
        const findLoanApplication: LoanApplication = await this.loanApplicationService.find(loanApplicationId);

        rbac.can('hr_manager', 'hr:approve')
        .then(result => {
            if (result) {
                const loanApplicationId: string = req.params.loanApplicationId;
                const Payload: ApprovalDto = req.body;
                const updateLoanApplication: LoanApplication = this.loanApplicationService.update(loanApplicationId, Payload);
                return updateLoanApplication;
            } else {
                res.status(200).json({ data: "Not permitted", message: 'findAll' });
            }
        })
        .then(data => {
            res.status(200).json({ data: data, message: 'status updated' });
        })
        .catch(err => {
            next(err);
        })
    };

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
