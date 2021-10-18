/* eslint-disable prettier/prettier */
export interface IBudget{
    startDate: string;
    endDate: string;
    departmentId: string;
    projectId: string;
    budget: Number;
    title: string;
    description: string;
    availableBalance?: Number;
    approved?: boolean;
    createdBy?: string;
    deletedBy?: string;
    deleted?: boolean;
 }

 export interface IUpdateBudget{
    startDate?: string;
    endDate?: string;
    departmentId?: string;
    projectId?: string;
    budget?: Number;
    title?: string;
    description?: string;
    approved?: boolean;
    createdBy?: string;
    deletedBy?: string;
    deleted?: boolean;
 }

 export interface IIncreaseBudget{
    amount: Number;
    budget?: Number;
    availableBalance?: Number;
 }
 