/* eslint-disable prettier/prettier */
export interface IInvoice {
  customer: string;
  ref: string;
  invoice_date: string;
  total_amount: number;
  paid?: number;
  balance?: number;
  due_date: string;
  productItems: string;
<<<<<<< HEAD
=======
  type: string;
  status?: string;
  paymentStatus?: string;
>>>>>>> 8ccb7b25c512871f398b6558f6ac15d59cd73405
}
