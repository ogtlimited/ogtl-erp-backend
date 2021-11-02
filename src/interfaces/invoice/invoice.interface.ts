/* eslint-disable prettier/prettier */

export interface IInvoice {
  customer: string;
  account: string;
  ref: string;
  invoice_date: string;
  total_amount: number;
  paid?: number;
  balance?: number;
  due_date: string;
  productItems: string;
  units: [];
  type: string;
  status?: string;
  paymentStatus?: string;
}