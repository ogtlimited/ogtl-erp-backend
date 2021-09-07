/* eslint-disable prettier/prettier */

import { NextFunction, Request, Response } from 'express';
import { CreateClientDto, UpdateClientDto } from '@/dtos/project/client.dto';
import { IClient } from '@/interfaces/project-interface/client.interface';
import ClientService from '@/services/project/client.service';

class ClientController {
    public clientService;

    constructor() {
        this.clientService = new ClientService();
    }

    public getClients = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllClients: IClient[] = await this.clientService.findAll();
            res.status(200).json({ data: findAllClients, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public getClient = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const clientId: string = req.params.clientId;
            const findClient: IClient = await this.clientService.find(clientId);
            res.status(200).json({ data: findClient, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    };

    public createClient = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const Payload: CreateClientDto = req.body;
            const newClient: IClient = await this.clientService.create(Payload);
            res.status(201).json({ data: newClient, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    public updateClient = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const clientId: string = req.params.clientId;
            const Payload: UpdateClientDto = req.body;
            const updateClient: IClient = await this.clientService.update(clientId, Payload);
            res.status(200).json({ data: updateClient, message: 'updated' });
        } catch (error) {
            next(error);
        }
    };

    public deleteClient = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.clientId;
            const dropClient: IClient = await this.clientService.delete(id);
            res.status(200).json({ data: dropClient, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };
}

export default ClientController;