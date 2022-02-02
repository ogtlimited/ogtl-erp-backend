/* eslint-disable prettier/prettier */
import { IExpenseHead } from "../expense-head/expense-head.interface";


export interface IBudget{
    startDate: string;
    endDate: string;
    departmentId?: string;
    projectId?: string;
    budget?: Number;
    title: string;
    description: string;
    availableBalance?: Number;
    approved?: boolean;
    createdBy?: string;
    deletedBy?: string;
    deleted?: boolean;
    flagAlert?: Number;
    expenseHeads?: Array<IExpenseHead>;
    toObject?: Function;
    status?: string
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
    flagAlert?: Number;
    deleted?: boolean;
   status?: string
 }

 export interface IIncreaseBudget{
    amount: Number;
    budget?: Number;
    availableBalance?: Number;
 }
