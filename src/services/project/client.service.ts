/* eslint-disable prettier/prettier */

import clientModel from '@/models/project/client.model';
import { IClient } from '@/interfaces/project-interface/client.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateClientDto, UpdateClientDto } from '@/dtos/project/client.dto';
const clientList = [
    {
        "client_name": "CD",
        "email": "CD@gmail.com",
        "address": "some address",
        "contact_phone": "1234544",
        "city": "Abuja",
        "code": "CAMP000",
        "state": "FCT",
        "country": "Nigeria",
        "company": "CD"
    },
    {
        "client_name": "Outsource Global",
        "email": "Outsource Global@gmail.com",
        "address": "some address",
        "contact_phone": "1234544",
        "city": "Abuja",
        "code": "CAMP001",
        "state": "FCT",
        "country": "Nigeria",
        "company": "Outsource Global"
    },
    {
        "client_name": "Legend",
        "email": "Legend@gmail.com",
        "address": "some address",
        "contact_phone": "1234544",
        "city": "Abuja",
        "code": "CAMP002",
        "state": "FCT",
        "country": "Nigeria",
        "company": "Legend"
    },
    {
        "client_name": "Sterling Bank",
        "email": "Sterling Bank@gmail.com",
        "address": "some address",
        "contact_phone": "1234544",
        "city": "Abuja",
        "code": "CAMP003",
        "state": "FCT",
        "country": "Nigeria",
        "company": "Sterling Bank"
    },
    {
        "client_name": "Unilever",
        "email": "Unilever@gmail.com",
        "address": "some address",
        "contact_phone": "1234544",
        "city": "Abuja",
        "code": "CAMP004",
        "state": "FCT",
        "country": "Nigeria",
        "company": "Unilever"
    },
    {
        "client_name": "Parkway Projects",
        "email": "Parkway Projects@gmail.com",
        "address": "some address",
        "contact_phone": "1234544",
        "city": "Abuja",
        "code": "CAMP005",
        "state": "FCT",
        "country": "Nigeria",
        "company": "Parkway Projects"
    },
    {
        "client_name": "Paystack",
        "email": "Paystack@gmail.com",
        "address": "some address",
        "contact_phone": "1234544",
        "city": "Abuja",
        "code": "CAMP006",
        "state": "FCT",
        "country": "Nigeria",
        "company": "Paystack"
    },
    {
        "client_name": "Gononey",
        "email": "Gononey@gmail.com",
        "address": "some address",
        "contact_phone": "1234544",
        "city": "Abuja",
        "code": "CAMP007",
        "state": "FCT",
        "country": "Nigeria",
        "company": "Gononey"
    },
    {
        "client_name": "Sloane&CO",
        "email": "Sloane&CO@gmail.com",
        "address": "some address",
        "contact_phone": "1234544",
        "city": "Abuja",
        "code": "CAMP008",
        "state": "FCT",
        "country": "Nigeria",
        "company": "Sloane&CO"
    },
    {
        "client_name": "Raven&Macaw",
        "email": "Raven&Macaw@gmail.com",
        "address": "some address",
        "contact_phone": "1234544",
        "city": "Abuja",
        "code": "CAMP009",
        "state": "FCT",
        "country": "Nigeria",
        "company": "Raven&Macaw"
    },
    {
        "client_name": "CBN",
        "email": "CBN@gmail.com",
        "address": "some address",
        "contact_phone": "1234544",
        "city": "Abuja",
        "code": "CAMP0010",
        "state": "FCT",
        "country": "Nigeria",
        "company": "CBN"
    }
]
class ClientService {
    public client: any;
    constructor() {
        this.client = clientModel;
        // this.CreateBulkClient()
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
    public CreateBulkClient = async  () => {
        try{
            
            await this.client.insertMany(clientList)
            // for (let i = 0; i < clientList.length; i++) {
                
            // }
            
        }
        catch(error){
         console.log(error);
        }
    };


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
