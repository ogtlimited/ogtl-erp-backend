/* eslint-disable prettier/prettier */
import { IClientAccount } from '@/interfaces/project-interface/client_account.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { ClientAccountDto } from '@/dtos/project/client_account.dto';
import clientAccountModel from '@/models/project/client_account.model';
import clientModel from '@/models/project/client.model';

class ClientAccountService {
    public clientAccount: any;
    public client: any;
    constructor() {
        this.clientAccount = clientAccountModel;
        this.client = clientModel;
    }

    public async findAllClientsAccounts(): Promise<IClientAccount[]> {
        const clientsAccount: IClientAccount[] = await this.clientAccount.find();
        return clientsAccount;
    }

    public async findClientAccount(clientAccountId: string): Promise<IClientAccount> {
        if (isEmpty(clientAccountId)) throw new HttpException(400, "Missing Id Params");
        const findclientAccount = this.clientAccount.findOne({_id: clientAccountId});
        if (!findclientAccount) throw new HttpException(409, "Client login details not found");
        return findclientAccount;
    }

    public async createClientAccount(payload: ClientAccountDto): Promise<IClientAccount> {
        if (isEmpty(payload)) throw new HttpException(400, "Bad request");
        const clientAccountExist = await this.clientAccount.findOne({email: payload.email})
        if(clientAccountExist)  throw new HttpException(422, "Client Login Details Already Exist");
        const newclientAccount: IClientAccount = await this.clientAccount.create(payload);
        return newclientAccount;
    }

    public async updateClientAccount(clientAccountId: string, payload: ClientAccountDto): Promise<IClientAccount> {
        if (isEmpty(payload)) throw new HttpException(400, "Bad request");
        const findclientAccount = this.clientAccount.findOne({_id: clientAccountId});
        if (!findclientAccount) throw new HttpException(409, "Client login details not found");
        const updateclientAccountDetails: IClientAccount = await this.clientAccount.findByIdAndUpdate(clientAccountId, { payload }, {new: true});
        return updateclientAccountDetails;
    }

    public async deactivatingClientAccount(clientAccountId: string): Promise<IClientAccount> {  
        const findclientAccountRecords = await this.clientAccount.findOne({_id: clientAccountId});
        const findClientRecords = await this.client.findOne({_id: findclientAccountRecords.client_id});
        findclientAccountRecords.deactivated = findclientAccountRecords.deactivated ? false : true
        findclientAccountRecords.spammy = findclientAccountRecords.spammy ? false : true
        findClientRecords.deactivated = findclientAccountRecords.deactivated
        await findClientRecords.save()
        await findclientAccountRecords.save()
        return findclientAccountRecords;
    }

    public async deleteClientAccount(clientAccountId: string): Promise<IClientAccount> {
        const drop: IClientAccount = await this.clientAccount.findByIdAndDelete(clientAccountId);
        if (!drop) throw new HttpException(409, `${clientAccountId} does not exist`);
        return drop;
    }
}

export default ClientAccountService;
