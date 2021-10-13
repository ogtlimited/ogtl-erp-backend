export interface IBills {
  _id: string;
  number: string;
  vendor: string;
  billDate: Date;
  dueDate: Date;
  reference: string;
  total: Number;
  status: string;
  // new
  // journal : Vendor Bill
}
