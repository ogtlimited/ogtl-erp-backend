export interface IBills {
  _id: string;
  vendor: string;
  ref: string;
  bill_date: string;
  total_amount: number;
  paid?: number;
  balance?: number;
  due_date: string;
  productItems: string;
  status: string;
}
