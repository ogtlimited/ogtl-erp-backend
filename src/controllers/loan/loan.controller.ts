/* eslint-disable prettier/prettier */

import { NextFunction, Request, Response } from 'express';
import { LoanDto, PutLoanDto } from '@/dtos/loan/loan.dto';
import { Loan } from '@/interfaces/loan/loan.interface';
import LoanService from '@/services/loan/loan.service';
import {opts} from '@/utils/rbac-opts';

const RBAC = require('easy-rbac');
const rbac = new RBAC(opts);


class LoanController {
    public loanService;

    constructor() {
        this.loanService = new LoanService();
    }

    public getLoans = async (req: Request, res: Response, next: NextFunction) => {
        let user = (<any>req).user
        rbac.can(user.role, 'post:read')
        .then(result => {
            if (result) {
                const findAllLoans: Loan[] = this.loanService.findAll();
                res.status(200).json({ data: findAllLoans, message: 'findAll' });
            } else {
                res.status(422).json({ message: 'not permitted' });
            }
        })
        .catch(err => {
            next(err);
        })
        // try {
        //     const findAllLoans: Loan[] = await this.loanService.findAll();
        //     res.status(200).json({ data: findAllLoans, message: 'findAll' });
        // } catch (error) {
        //     next(error);
        // }
    };

    public getLoan = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const loanId: string = req.params.loanId;
            const findLoan: Loan = await this.loanService.find(loanId);
            res.status(200).json({ data: findLoan, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    };

    public createLoan = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const Payload: LoanDto = req.body;
            const newLoan: Loan = await this.loanService.create(Payload);
            res.status(201).json({ data: newLoan, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    public updateLoan = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const loanId: string = req.params.loanId;
            const Payload: PutLoanDto = req.body;
            const updateLoan: Loan = await this.loanService.update(loanId, Payload);
            res.status(200).json({ data: updateLoan, message: 'updated' });
        } catch (error) {
            next(error);
        }
    };

    public deleteLoan = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.loanId;
            const dropLoan: Loan = await this.loanService.delete(id);
            res.status(200).json({ data: dropLoan, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };
}

export default LoanController;
