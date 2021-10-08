/* eslint-disable prettier/prettier */

import AccountModel from '@/models/account/account.model';
import { IAccount } from '@/interfaces/account-interface/account.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { AccountDto, PutAccountDto } from '@/dtos/account/account.dto';

class AccountService {
    public account: any;

    constructor() {
        this.account = AccountModel;
    }

    public async findAll(): Promise<IAccount[]> {
        const accounts: IAccount[] = await this.account.find();
        return accounts;
    }

    public async find(accountId: string): Promise<IAccount> {
        if (isEmpty(accountId)) throw new HttpException(400, "Missing Id Params");
        const findaccount = this.findOne(accountId);
        if (!findaccount) throw new HttpException(409, "account not found");
        return findaccount;
    }

    public async create(Payload: AccountDto): Promise<IAccount> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        let new_account = new this.account(Payload)
        try {
            const newaccount: IAccount = await new_account.save();
            this.buildAncestors(new_account._id, new_account.parent)
            return newaccount;
        } catch (err) {
            throw new HttpException(409, err);
        }
    }

    public async update(accountId: string, Payload: PutAccountDto): Promise<IAccount> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const findaccount = this.findOne(accountId);
        if (!findaccount) throw new HttpException(409, "account not found");
        const updateaccount: IAccount = await this.account.findByIdAndUpdate(accountId, { Payload }, {new: true});
        return updateaccount;
    }

    public async delete(accountId: string): Promise<IAccount> {
        const drop: IAccount = await this.account.findByIdAndDelete(accountId);
        if (!drop) throw new HttpException(409, `${accountId} account does not exist`);
        return drop;
    }

    private async findOne(id: string): Promise<IAccount> {
        const findaccount: IAccount = await this.account.findOne({ _id: id });
        return findaccount;
    }

    private async buildAncestors(id: string, parent_id: string): Promise<void> {
        let ancest = [];
        try {
            let parent_category = await this.account.findOne({ "_id":    parent_id },{ "name": 1, "slug": 1, "ancestors": 1 }).exec();
            if( parent_category ) {
                const { _id, name, slug } = parent_category;
                const ancest = [...parent_category.ancestors];
                ancest.unshift({ _id, name, slug })
                const category = await this.account.findByIdAndUpdate(id, { $set: { "ancestors": ancest } });
            }
        } catch (err) {
            console.log(err.message)
        }
     }
}

export default AccountService;
