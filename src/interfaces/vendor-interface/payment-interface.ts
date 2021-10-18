export interface IVendorPayment {
  _id: string;
  number: string;
  date: Date;
  journal: string;
  paymentMethod: string;
  vendor: string;
  amount: Number;
  status: string; //full or partial payment
  //new
  account: string;
}
