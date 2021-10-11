/* eslint-disable prettier/prettier */

import { NextFunction, Request, Response } from 'express';
import { AccountDto, PutAccountDto } from '@/dtos/account/account.dto';
import { IAccount } from '@/interfaces/account-interface/account.interface';
import accountService from '@/services/account/account.service';

class AccountController {
    public accountService;

    constructor() {
        this.accountService = new accountService();
    }

    public getaccounts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllaccounts: IAccount[] = await this.accountService.findAll();
            res.status(200).json({ data: findAllaccounts, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public getaccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountId: string = req.params.accountId;
            const findaccount: IAccount = await this.accountService.find(accountId);
            res.status(200).json({ data: findaccount, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    };

    public getdescendants = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountId: string = req.params.accountId;
            const findaccount: IAccount = await this.accountService.findDescendants(accountId);
            res.status(200).json({ data: findaccount, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    };

    public createaccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const Payload: AccountDto = req.body;
            let parent = req.body.parent ? req.body.parent : null;
            Payload["parent"] = parent
            const newaccount: IAccount = await this.accountService.create(Payload);
            res.status(201).json({ data: newaccount, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    public updateaccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountId: string = req.params.accountId;
            const Payload: PutAccountDto = req.body;
            const updateaccount: IAccount = await this.accountService.update(accountId, Payload);
            res.status(200).json({ data: updateaccount, message: 'updated' });
        } catch (error) {
            next(error);
        }
    };

    public updateAncestory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accountId: string = req.params.accountId;
            const Payload: PutAccountDto = req.body;
            const updateaccount: IAccount = await this.accountService.updateAncestory(accountId, Payload);
            res.status(200).json({ data: updateaccount, message: 'updated' });
        } catch (error) {
            next(error);
        }
    };

    public deleteaccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.accountId;
            const dropaccount: IAccount = await this.accountService.delete(id);
            res.status(200).json({ data: dropaccount, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };

    public getTree = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllaccounts = await this.accountService.tree();
            res.status(200).json({ data: findAllaccounts, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };
}

export default AccountController;
