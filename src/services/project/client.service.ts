/* eslint-disable prettier/prettier */

import clientModel from '@/models/project/client.model';
import { IClient } from '@/interfaces/project-interface/client.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateClientDto, UpdateClientDto } from '@/dtos/project/client.dto';

class ClientService {
    public client: any;

    constructor() {
        this.client = clientModel;
    }

    public async findAll(): Promise<IClient[]> {
        const clients: IClient[] = await this.client.find();
        return clients;
    }

    public async find(clientId: string): Promise<IClient> {
        if (isEmpty(clientId)) throw new HttpException(400, "Missing Id Params");
        const findclient = this.findOne(clientId);
        if (!findclient) throw new HttpException(409, "Project not found");
        return findclient;
    }

    public async create(Payload: CreateClientDto): Promise<IClient> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const newClient: IClient = await this.client.create(Payload);
        return newClient;
    }

    public async update(clientId: string, Payload: UpdateClientDto): Promise<IClient> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const findclient = this.findOne(clientId);
        if (!findclient) throw new HttpException(409, "Project not found");
        const updateClient: IClient = await this.client.findByIdAndUpdate(clientId, { Payload }, {new: true});
        return updateClient;
    }

    public async delete(clientId: string): Promise<IClient> {
        const drop: IClient = await this.client.findByIdAndDelete(clientId);
        if (!drop) throw new HttpException(409, `${clientId} Loan does not exist`);
        return drop;
    }

    private async findOne(id: string): Promise<IClient> {
        const findclient: IClient = await this.client.findOne({ _id: id });
        return findclient;
    }
}

export default ClientService;