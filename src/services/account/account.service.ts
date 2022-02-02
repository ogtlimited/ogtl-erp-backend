/* eslint-disable prettier/prettier */

import AccountModel from '@/models/account/account.model';
import { IAccount } from '@/interfaces/account-interface/account.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { AccountDto, PutAccountBalanceDto, PutAccountDto, UpdateAncestoryDto } from '@/dtos/account/account.dto';
import {slugify} from '../../utils/slugify'

class AccountService {
    public account: any;

    constructor() {
        this.account = AccountModel;
    }

    public async findAll(): Promise<IAccount[]> {
        const accounts: IAccount[] = await this.account.find();
        console.log("account", accounts)
        return accounts;
    }

    public async find(accountId: string): Promise<IAccount> {
        if (isEmpty(accountId)) throw new HttpException(400, "Missing Id Params");
        const findaccount = this.findOne(accountId);
        if (!findaccount) throw new HttpException(409, "account not found");
        return findaccount;
    }

    public async findByName(accountName: string): Promise<IAccount> {
        if (isEmpty(accountName)) throw new HttpException(400, "Missing Id Params");
        const findaccount = this.findAccountByName(accountName);
        if (!findaccount) throw new HttpException(409, "account not found");
        return findaccount;
    }

    public async findDescendants(accountId: string): Promise<IAccount> {
        if (isEmpty(accountId)) throw new HttpException(400, "Missing Id Params");
        const findaccount = this.descendants(accountId);
        if (!findaccount) throw new HttpException(409, "account not found");
        return findaccount;
    }

    public async create(Payload: AccountDto): Promise<IAccount> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        Payload.is_default = false
        const new_account = new this.account(Payload)
        try {
            const findaccount = await this.findOne(Payload.parent);
            if(findaccount){
                console.log("$$$$$$$$$$$$$$$$$$$$$$$", findaccount)
                const number = this.addNumber(findaccount.slug)
                new_account.account_number = number + new_account.account_number
                console.log(number)
            }
           
            const newaccount: IAccount = await new_account.save();
            this.buildAncestors(new_account._id, new_account.parent)
            return newaccount;
        } catch (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                // Duplicate name
                throw new HttpException(409, "Account name already exists");
            }
            throw new HttpException(409, err);
        }
    }

    public async update(accountId: string, Payload: PutAccountDto): Promise<IAccount> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const findaccount = this.findOne(accountId);
        if (!findaccount) throw new HttpException(409, "account not found");
        const PayloadObj = {...Payload, slug: slugify(Payload.account_name)}
        console.log(findaccount)
        const updateaccount: IAccount = await this.account.findByIdAndUpdate(accountId, {$set: PayloadObj }, {new: true});
        await this.account.update({"ancestors._id": updateaccount._id}, {"$set": {"ancestors.$.account_name": updateaccount.account_name, "ancestors.$.slug": slugify(updateaccount.account_name) }}, {multi: true});
        return updateaccount;
    }
    public async updateBalance(accountId: string, payload: PutAccountBalanceDto): Promise<IAccount> {
        if (isEmpty(payload)) throw new HttpException(400, "Bad request");
        const findaccount = this.findOne(accountId);
        if (!findaccount) throw new HttpException(409, "account not found");
        console.log("paylod",payload);
        console.log("find account",findaccount,accountId);
        const updateaccount: IAccount = await this.account.findByIdAndUpdate(accountId, {$set: payload }, {new: true});
        return updateaccount;
    }

    public async updateAncestory(accountId: string, Payload: UpdateAncestoryDto): Promise<IAccount> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const findaccount = this.findOne(accountId);
        if (!findaccount) throw new HttpException(409, "account not found");
        const updateaccount: IAccount = await this.account.findByIdAndUpdate(accountId, {$set: { Payload }}, {new: true});
        this.buildHierarchyAncestors(accountId, Payload.parent);
        return updateaccount;
    }

    public async delete(accountId: string): Promise<IAccount> {
        const drop: IAccount = await this.account.findByIdAndDelete(accountId);
        if (!drop) throw new HttpException(409, `${accountId} account does not exist`);
        await this.account.deleteMany({"ancestors._id": accountId});
        return drop;
    }

    public async tree(): Promise<any> {
        const tree: any = this.account.aggregate([
            {
                $graphLookup: {
                   from: 'accounts',
                   startWith: '$_id',
                   connectFromField: '_id',
                   connectToField: 'parent',
                   as: 'children'
                }
             }
        ])

        return tree
    }

    private async findOne(id: string): Promise<IAccount> {
        const findAccount: IAccount = await this.account.findOne({ _id: id })
        .select({
            "_id": true,
            "balance": true,
            "slug": true,
            "account_name": true,
            "ancestors.slug": true,
            "ancestors.account_name": true }).exec();
        return findAccount;
    }

    private async findAccountByName(name: string): Promise<IAccount> {
        const findAccount: IAccount = await this.account.findOne({ slug: name })
        .select({
            "_id": true,
            "account_name": true,
            "balance": true,
            "ancestors.slug": true,
            "ancestors.account_name": true }).exec();
        return findAccount;
    }

    private async descendants(id: string): Promise<IAccount> {
        const result = await this.account.find({ "ancestors._id":  id })
        .select({ "_id": true, "account_name": true, "is_group": true, "balance": true })
        .exec();
        return result;
    }

    private async buildAncestors(id: string, parent_id: string): Promise<void> {
        const ancest = [];
        try {
            const parent_category = await this.account.findOne({ "_id":    parent_id },{ "name": 1, "slug": 1, "ancestors": 1 }).exec();
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

    private async buildHierarchyAncestors(id: string, parent_id: string): Promise<void> {
        if( id && parent_id )
            this.buildAncestors(id, parent_id)
            const result = await this.account.find({ 'parent': id }).exec();

        if(result)
        result.forEach((doc) => {
            this.buildHierarchyAncestors(doc._id, id) } )
    }

    private addNumber (slug) {
        
        let number_prefix;
        switch (slug) {
          case 'accounts-receivable':
            number_prefix = "1"
            break;
          case 'cash-in-hand':
            number_prefix = "2"
            break;
          case 'current-asset':
            number_prefix = "3"
            break;
          case 'fixed-asset':
            number_prefix = "4"
            break;
          case 'account-payable':
            number_prefix = "5"
            break;
          default:
            number_prefix = "0"
        }
      
        return number_prefix
    } 
}

export default AccountService;
