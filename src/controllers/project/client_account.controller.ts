/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { ClientAccountDto, UpdateClientAccountDto } from '@/dtos/project/client_account.dto'; 
import { IClientAccount } from '@/interfaces/project-interface/client_account.interface'; 
import ClientAccountService from '@/services/project/client_account.service';


class ClientAccountController {
    public clientAccountService: any;
    constructor() {
        this.clientAccountService = new ClientAccountService();
    }

    public getAllClientsAccounts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllClientsAccounts: IClientAccount[] = await this.clientAccountService.findAllClientsAccounts();
            res.status(200).json({ data: findAllClientsAccounts, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public getClientAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const clientAccountId: string = req.params.clientId;
            const findClientAccount: IClientAccount = await this.clientAccountService.findClientAccount(clientAccountId);
            res.status(200).json({ data: findClientAccount, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    };

    public createClientAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const payload: ClientAccountDto = req.body;
            const newClientAccount: IClientAccount = await this.clientAccountService.createClientAccount(payload);
            res.status(201).json({ data: newClientAccount, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    public updateClientAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const clientAccountId: string = req.params.clientAccountId;
            const payload: UpdateClientAccountDto = req.body;
            const updateClientAccount: IClientAccount = await this.clientAccountService.updateClientAccount(clientAccountId, payload);
            res.status(200).json({ data: updateClientAccount, message: 'updated' });
        } catch (error) {
            next(error);
        }
    };

    public activatingClientAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const clientAccountId: string = req.params.clientAccountId;
            const updateClientAccount: IClientAccount = await this.clientAccountService.activatingClientAccount(clientAccountId);
            res.status(200).json({ data: updateClientAccount, message: 'updated' });
        } catch (error) {
            next(error);
        }
    };

    public deleteClientAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.clientAccountId;
            const dropClientAccount: IClientAccount = await this.clientAccountService.deleteClientAccount(id);
            res.status(200).json({ data: dropClientAccount, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };
}

export default ClientAccountController;