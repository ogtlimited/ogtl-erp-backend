/* eslint-disable prettier/prettier */
export interface IExpenseHead{
    startDate?: String;
    endDate?: String;
    departmentId?: String;
    projectId?: String;
    budgetId: String;
    title?: String;
    availableBalance?: Number;
    amount?: Number;
    approved?: Boolean;
    createdBy?: String;
    deletedBy?: String;
    deleted?: Boolean;
    flagAlert?: Number;
  expenseHeadDraftId?:String;
 }

 export interface IUpdateExpenseHead{
    startDate?: String;
    endDate?: String;
    departmentId?: String;
    projectId?: String;
    budget?: Number;
    title?: String;
    description?: String;
    approved?: Boolean;
    createdBy?: String;
    deletedBy?: String;
    deleted?: Boolean;
 }

 export interface IIncreaseExpenseHead{
    amount: Number;
    availableBalance?: Number;
 }

export  interface IExpenseHeadQuery{
   departmentId?: String;
   projectId?: String;
   startDate?: Object;
   endDate?: Object;
}
