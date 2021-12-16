/* eslint-disable prettier/prettier */

export interface IPermission {
    read: boolean;
    create: boolean;
    upate: boolean;
    delete: boolean;
}
export interface IRole {
    title: string;
    account: IPermission;
    projects: IPermission;
    facility: IPermission;
    hr: IPermission;
    it: IPermission;
}