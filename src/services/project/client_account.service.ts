/* eslint-disable prettier/prettier */
import { IClientAccount } from '@/interfaces/project-interface/client_account.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { ClientAccountDto, UpdateClientAccountDto } from '@/dtos/project/client_account.dto';
import clientAccountModel from '@/models/project/client_account.model';
import clientModel from '@/models/project/client.model';
const bcrypt = require('bcrypt')
import SendMailToClient from '@/utils/client_account_nodemailer';
import { clientAccountActivationNotice } from '@/utils/message';
import ClientEmail from '@/utils/client.email';
import { dbConfig } from '@interfaces/db.interface';
import config from 'config';
const jwt  = require('jsonwebtoken');


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
        interface ClientId {
            _id: string
        }
        if (isEmpty(payload)) throw new HttpException(400, "Bad request");
        const clientAccountExist = await this.clientAccount.findOne({email: payload.email})
        if(clientAccountExist)  throw new HttpException(422, "Client Login Details Already Exist");
        const newclientAccount: IClientAccount & ClientId = await this.clientAccount.create(payload);
        if(newclientAccount){
            await this.createJwtToken(newclientAccount._id)
            return newclientAccount;
        }
    }

    public async updateClientAccount(clientAccountId: string, payload: ClientAccountDto): Promise<IClientAccount> {
        const salt = await bcrypt.genSalt(10)
        if (isEmpty(payload)) throw new HttpException(400, "Bad request");
        const findclientAccount = await this.clientAccount.findOne({_id: clientAccountId});
        if (!findclientAccount) throw new HttpException(409, "Client login details not found");
        payload.password = await bcrypt.hash(payload.password, salt)
        const updateclientAccountDetails: IClientAccount = await this.clientAccount.findByIdAndUpdate(clientAccountId, payload, {new: true});
        return updateclientAccountDetails;
    }

    public async activatingClientAccount(clientAccountId: string): Promise<IClientAccount> {  
        const findclientAccountRecords = await this.clientAccount.findOne({_id: clientAccountId});
        findclientAccountRecords.activated = findclientAccountRecords.activated ? false : true
        await findclientAccountRecords.save()
        return findclientAccountRecords;
    }

    public async deleteClientAccount(clientAccountId: string): Promise<IClientAccount> {
        const drop: IClientAccount = await this.clientAccount.findByIdAndDelete(clientAccountId);
        if (!drop) throw new HttpException(409, `${clientAccountId} does not exist`);
        return drop;
    }
   
    private async mailSender(id: string): Promise<any> {
        const { host }: dbConfig = config.get('dbConfig');
        const port = process.env.PORT
        const url = `https://${host}:${port}/auth/activate?id=${id}`
        const html = `<a href=${url}>Click here to generate your password</a>`
        return SendMailToClient.send("abubakarmoses@yahoo.com","paige.hoeger@ethereal.email",clientAccountActivationNotice.subject,clientAccountActivationNotice.message,html)
    }

    private async createJwtToken(id: string): Promise<any> {
        const secretKey: string = await config.get('secretKey');
        const token = await jwt.sign({ id: id }, secretKey,{ expiresIn: "1m" });
        const verifyToken = await jwt.verify(token, secretKey);
        console.log(verifyToken)
        console.log(token)
        this.mailSender(verifyToken.id)
    }
}

export default ClientAccountService;
