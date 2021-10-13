/* eslint-disable prettier/prettier */

import accountTypeModel from '@/models/account/account-type.model';
import { IAccountType } from '@/interfaces/account-interface/account-type.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { AccountTypeDto, PutAccountTypeDto } from '@/dtos/account/account-type.dto';

class AccountTypeService {
    public accountType: any;

    constructor() {
        this.accountType = accountTypeModel;
    }

    public async findAll(): Promise<IAccountType[]> {
        const accountTypes: IAccountType[] = await this.accountType.find();
        return accountTypes;
    }

    public async find(accountTypeId: string): Promise<IAccountType> {
        if (isEmpty(accountTypeId)) throw new HttpException(400, "Missing Id Params");
        const findAccountType = this.findOne(accountTypeId);
        if (!findAccountType) throw new HttpException(409, "AccountType not found");
        return findAccountType;
    }

    public async create(Payload: AccountTypeDto): Promise<IAccountType> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request"); 
        const newAccountType: IAccountType = await new this.accountType(Payload);
        this.accountType.create(newAccountType)
        //const newAccountType: AccountType = await this.AccountType.create(Payload);
        return newAccountType;
    }

    public async update(accountTypeId: string, Payload: PutAccountTypeDto): Promise<IAccountType> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const findAccountType = this.findOne(accountTypeId);
        if (!findAccountType) throw new HttpException(409, "AccountType not found");
        const updateAccountType: IAccountType = await this.accountType.findByIdAndUpdate(accountTypeId, { Payload }, {new: true});
        return updateAccountType;
    }

    public async delete(accountTypeId: string): Promise<IAccountType> {
        const drop: IAccountType = await this.accountType.findByIdAndDelete(accountTypeId);
        if (!drop) throw new HttpException(409, `${accountTypeId} AccountType does not exist`);
        return drop;
    }

    private async findOne(id: string): Promise<IAccountType> {
        const findAccountType: IAccountType = await this.accountType.findOne({ _id: id });
        return findAccountType;
    }
}

export default AccountTypeService;
