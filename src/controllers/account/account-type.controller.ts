/* eslint-disable prettier/prettier */

import { NextFunction, Request, Response } from 'express';
import { AccountTypeDto, PutAccountTypeDto } from '@/dtos/account/account-type.dto';
import { IAccountType } from '@/interfaces/account-interface/account-type.interface';
import accountTypeService from '@/services/account/account-type.service';

class AccountTypeController {
    public accountTypeService;

    constructor() {
        this.accountTypeService = new accountTypeService();
    }

    public getAccountTypes = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllAccountTypes: IAccountType[] = await this.accountTypeService.findAll();
            res.status(200).json({ data: findAllAccountTypes, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public getAccountType = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountTypeId: string = req.params.accountTypeId;
            const findAccountType: IAccountType = await this.accountTypeService.find(accountTypeId);
            res.status(200).json({ data: findAccountType, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    };

    public createAccountType = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const Payload: AccountTypeDto = req.body;
            const newAccountType: IAccountType = await this.accountTypeService.create(Payload);
            res.status(201).json({ data: newAccountType, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    public updateAccountType = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountTypeId: string = req.params.accountId;
            const Payload: PutAccountTypeDto = req.body;
            const updateaccount: IAccountType = await this.accountTypeService.update(accountTypeId, Payload);
            res.status(200).json({ data: updateaccount, message: 'updated' });
        } catch (error) {
            next(error);
        }
    };

    public deleteAccountType = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.accountTypeId;
            const dropAccountType: IAccountType = await this.accountTypeService.delete(id);
            res.status(200).json({ data: dropAccountType, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };
}

export default AccountTypeController;
