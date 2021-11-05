/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */

export class IProcurement {

   productName: String;
   productQuantity: Number;
   unitCost: Number;
   projectId?: String;
   departmentId?: String;
   amount?: Number;
   createdBy?: String;
  expenseHeadId?:String;

}

export class IUpdateProcurement{
     productName?: String;
     productQuantity?: Number;
     unitCost?: Number;
     projectId?: String;
     departmentId?: String;
     amount?: String;
     createdBy?: String;
     updatedBy?: String;
}


