/* eslint-disable prettier/prettier */
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import PaymentModel from '@/models/payments/payment.model';
import { CreatePaymentDto, UpdatePaymentDto } from '@/dtos/payment/payment.dto';
import { IPayment } from '@/interfaces/payments/payment-interface';
import InvoiceService from '../invoice/invoice.service';
import  BillService  from '@services/vendor/bills.service';
import { PutAccountBalanceDto } from '@/dtos/account/account.dto';
import AccountService from '../account/account.service';
import JournalService from '../journal/journal.service';
import { genRef } from './../../utils/util';




class PaymentService {
  public PaymentModel = PaymentModel;
  public Journal = new JournalService();
  public Account = new AccountService();
  public invoiceS = new InvoiceService();
  public billS = new BillService();

  //Method for finding all  payment
  public async findAllPayment(): Promise<IPayment[]>{
    return this.PaymentModel.find().populate('bill invoice journal');
  }

  //Method for finding a single  payment
  public async findPaymentId(ModelId: string): Promise<IPayment>{
    //check if no  id is empty
    if(isEmpty(ModelId)) throw new HttpException(400,` payment not provided`);
    //find  using the id provided
    const findPayment:IPayment = await this.PaymentModel.findOne({_id:ModelId});
    //throw error if  does not exist
    if(!findPayment) throw new HttpException(409,` payment with Id:${ModelId}, does not exist`);
    //return
    return findPayment;
  }

  public async saveDraftPayment(data: CreatePaymentDto): Promise<IPayment>{
    if (isEmpty(data)) throw new HttpException(400, "Bad request");
    const number = genRef();
    return await this.PaymentModel.create({ ...data ,number});
  }
  
  //Method for creating
  public async createPaymentModel(data: UpdatePaymentDto): Promise<IPayment>{
    //check if  data is empty
    if(data.status === 'Draft'){
      return this.updatePaymentModel(data._id, data)
    }else{
      const findPayment: IPayment = await this.PaymentModel.findOne({ _id: data._id });
      if (isEmpty(data)) throw new HttpException(400, "Bad request");
      if(findPayment.bill){
        const bill = this.billS.findBillById(findPayment.bill)
        if(bill){
         this.billS.updateBillPayment(data.bill, data);
        }
      }else{
        const invoice = this.invoiceS.findInvoiceById(data.invoice)
        if(invoice){
         this.invoiceS.updateInvoicePayment(data.invoice, data);
  
        }
      }
      // //generate a random id on creation
      // const number = genRef()
      // //find  using the employee id provided
      // // const findPayment: IPayment = await this.PaymentModel.findOne({ number: number });
      // //throw error if  does exist
      // // if (findPayment) throw new HttpException(409, ` payment already exists`);
      // // return created
      const updatedPayment:IPayment = await this.PaymentModel.findByIdAndUpdate(data._id,data,{new:true})
      // return await this.PaymentModel.create({ ...data ,number});
      return updatedPayment

    }
  }

  //Method for updating
  public async updatePaymentModel(ModelId: string,ModelData: UpdatePaymentDto):Promise<IPayment>{
    //check if no  data is empty
    if (isEmpty(ModelData)) throw new HttpException(400, "Bad request");
    //find  using the employee id provided
    const findPayment: IPayment = await this.PaymentModel.findOne({ _id: ModelData._id });
    if(!findPayment) throw new HttpException(409, `${ModelData._id} already exists`);
    //find  using the id provided and update it
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const updatePaymentId:IPayment = await this.PaymentModel.findByIdAndUpdate(ModelId,ModelData,{new:true})
    if (!updatePaymentId) throw new HttpException(409, " could not be updated");
    // return updated
    return updatePaymentId;
  }

  //Method for deleting
  public async deletePaymentModel(ModelId: string):Promise<IPayment>{
    //find  using the id provided and delete
    const deletePaymentId: IPayment = await this.PaymentModel.findByIdAndDelete(ModelId);
    if(!deletePaymentId) throw new HttpException(409, ` payment with Id:${ModelId}, does not exist`);
    return deletePaymentId;
  }

  private static generateNumber(){
    return "OG"+ Math.floor(1000 + Math.random() * 9000)
  }
}



export default PaymentService;
