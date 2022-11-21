/* eslint-disable prettier/prettier */
import { IClientAccount } from '@/interfaces/project-interface/client_account.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { ClientAccountDto } from '@/dtos/project/client_account.dto';
import clientAccountModel from '@/models/project/client_account.model';
import clientModel from '@/models/project/client.model';
const bcrypt = require('bcrypt')
import { clientAccountActivationNotice } from '@/utils/message';
import EmailService from '@/utils/email.service';
import { dbConfig } from '@interfaces/db.interface';
import config from 'config';
const jwt  = require('jsonwebtoken');
import _ from "lodash"


class ClientAccountService {
    private clientAccount: any = clientAccountModel;
    private client: any = clientModel

    public async findAllClientsAccounts(): Promise<IClientAccount[]> {
        const clientsAccount: IClientAccount[] = await this.clientAccount.find();
        return clientsAccount;
    }

    public async findClientAccount(clientId: string): Promise<IClientAccount> {
        if (isEmpty(clientId)) throw new HttpException(400, "Missing Id Params");
        const findclient = await this.client.findOne({_id: clientId});
        const findclientAccount = await this.clientAccount.findOne({client_id: findclient._id});
        if (!findclientAccount) throw new HttpException(404, "Client login not found");
        return findclientAccount;
    }

    public async createClientAccount(payload: ClientAccountDto): Promise<IClientAccount> {
        if (isEmpty(payload)) throw new HttpException(400, "Bad request");
        const clientAccountExist = await this.clientAccount.findOne({email: payload.email})
        if(clientAccountExist)  throw new HttpException(422, "Client Login Details Already Exist");
        const newclientAccount: any = await this.clientAccount.create(payload);
        const recordsWithoutPassword = _.omit(newclientAccount.toObject(),['password'])
        if(newclientAccount) {
            const verifyToken = await this.createJwtToken(newclientAccount._id)
            await this.sendMail(verifyToken.id, newclientAccount.email, newclientAccount.user_name)
            return recordsWithoutPassword ;
        }
    }
    public async resetClientAccountPassword(clientAccountId: string, payload: ClientAccountDto): Promise<IClientAccount> {
        const salt = await bcrypt.genSalt(10)
        const clientAccountExist = await this.clientAccount.findOne({_id: clientAccountId})
        if(!clientAccountExist) throw new HttpException(404, "Client account not found");
        if (isEmpty(payload)) throw new HttpException(400, "Bad request");
        const hashedPassword = await bcrypt.hash(payload.password, salt)
        const findclientAccountAndResetPassword = await this.clientAccount.updateOne(
            {
            _id: clientAccountId
            },
            {
                $set: {password: hashedPassword, activated: payload.activated, spammy: payload.spammy}
            });
            return findclientAccountAndResetPassword;
    }

    public async activateClientAccount(clientAccountId: string): Promise<IClientAccount> {  
        const findclientAccountRecords: IClientAccount = await this.clientAccount.updateOne({_id: clientAccountId}, {$set:{activated: true}});
        if(!findclientAccountRecords) throw new HttpException(404, "Client account not found");
        return findclientAccountRecords;
    }

    public async deactivateClientAccount(clientAccountId: string): Promise<IClientAccount> {
        const findclientAccountRecords: IClientAccount = await this.clientAccount.updateOne({_id: clientAccountId}, {$set:{activated: false}});
        if(!findclientAccountRecords) throw new HttpException(404, "Client account not found");
        return findclientAccountRecords;
    }
   
    private async sendMail(id: string, clientEmail: string, username: string): Promise<any> {
        const clientAccountActivationNoticeObj = clientAccountActivationNotice(username)
        const { host }: dbConfig = config.get('dbConfig');
        const port = 3001
        const url = `http://${host}:${port}/auth/activate?id=${id}`
        const html = `<div><h1 style="color:#00c2fa">Outsource Global Technology Limited</h1><br></div>${clientAccountActivationNoticeObj.message}<a href=${url}>Click here to change your password</a>`
        return EmailService.sendMail(clientEmail,"hr@outsourceglobal.com",clientAccountActivationNoticeObj.subject,clientAccountActivationNoticeObj.message,html)
    }
    
    private async createJwtToken(id: string, expiresIn: number = 24*60*60): Promise<any> {
        const secretKey: string = await config.get('secretKey');
        const token = await jwt.sign({ id }, secretKey,{ expiresIn: expiresIn });
        return await jwt.verify(token, secretKey);
    }
}

export default ClientAccountService;
