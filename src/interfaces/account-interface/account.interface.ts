/* eslint-disable prettier/prettier */
export interface IAccount {
    _id?: string;
    account_name: string;
    account_number: string;
    is_group: Boolean;
    is_default: Boolean;
    number_prefix: string;
    balance: number;
    account_type: string;
    currency: string;
    parent: string;
    ancestors: string;
    slug: string;
}