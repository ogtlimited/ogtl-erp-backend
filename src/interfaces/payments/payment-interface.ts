/* eslint-disable prettier/prettier */
export interface IPayment {
  _id: string;
  number: string;
  date: Date;
  journal: string;
  paymentMethod: string;
  bill?: string;
  invoice?: string;
  total_amount: Number;
  status: string; //full or partial payment
  //new
  account: string;
}
