/* eslint-disable prettier/prettier */
export interface IAccount {
    _id?: string;
    account_name: string;
    account_number: string;
    is_group: Boolean;
    balance: number;
    account_type: string;
    currency: string;
    parent: string;
    ancestors: string;
    slug: string;
}