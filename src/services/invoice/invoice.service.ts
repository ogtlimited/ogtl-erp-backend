/* eslint-disable prettier/prettier */
import { PutAccountBalanceDto } from './../../dtos/account/account.dto';

import { HttpException } from '@exceptions/HttpException';

import { isEmpty } from '@utils/util';
import invoiceModel from '@/models/Invoice/invoice.model';
import { IInvoice } from '@/interfaces/invoice/invoice.interface';
import { CreateInvoiceDto,UpdateInvoiceStatus } from '@/dtos/invoice/invoice.dto';
import AccountService from '../account/account.service';
import JournalService from '../journal/journal.service';

class InvoiceService {
    public Invoices = invoiceModel;
    public Journal = new JournalService();
    public Account = new AccountService();

    /**
     *Returns all IInvoice
     */
    public async findAllInvoices(): Promise<IInvoice[]> {
         return this.Invoices.find().populate('customer productItems');
        
    }

    /**
     *Returns the IInvoice with the Id given
     */
    public async findInvoiceById(InvoiceId:string) : Promise<IInvoice>
    {
       //Check if Id is empty
       if (isEmpty(InvoiceId)) throw new HttpException(400, "No Id provided");

       //find IInvoice with Id given
       const findInvoice:IInvoice = await this.Invoices.findOne({ _id:InvoiceId  }).populate('customer productItems');

       if(!findInvoice) throw new HttpException(409, "Invoice with that Id doesnt exist");

       return findInvoice;
    }

    /**
     *Creates a new IInvoice
     */


     public async createInvoice(invoiceData: CreateInvoiceDto) : Promise<IInvoice>{

        //Check if data is empty
       if (isEmpty(invoiceData)) throw new HttpException(400, "No data provided");
       const newRef = InvoiceService.generateRefID()
      const findInvoice: IInvoice = await this.Invoices.findOne({ref:newRef});
       if(findInvoice) throw new HttpException(409, `Invoice with this ${newRef} already exists`);
       const receivables = await this.Account.findByName("accounts-receivable")
    //    const account = await this.Account.find(invoiceData.account);
       const updateReceivable: PutAccountBalanceDto = {
           balance: receivables.balance + invoiceData.total_amount,
       }
    //    const accountUpdate: PutAccountBalanceDto = {
    //        balance: account.balance + invoiceData.total_amount,
    //    }
    //    console.log(accountUpdate)
       this.Account.updateBalance(receivables._id, updateReceivable)
    //    this.Account.updateBalance(account._id, accountUpdate)
       const jData = {
        account: receivables._id,
        ref: newRef,
        debit: invoiceData.total_amount,
        credit: 0,
        description: '',
        date: new Date().toISOString()
       }
       console.log(jData)
       this.Journal.createJournal(jData)
       return  await this.Invoices.create({...invoiceData, ref: newRef});
    
     }
     /**
     *Updates existing IInvoice
     */
    public async updateInvoicePayment(InvoiceId:string,invoiceData)  : Promise<IInvoice>{
        //Check if data is empty
        if (isEmpty(invoiceData)) throw new HttpException(400, "No data provided");
        const invoice = await this.findInvoiceById(InvoiceId)
        console.log('GET INVOICE', InvoiceId);
        console.log('GET INVOICE', invoice);
        const updateData = {
            paid: invoice.paid +  invoiceData.total_amount,
            balance: invoice.total_amount - invoiceData.total_amount - invoice.paid
        }
        console.log(updateData)
        const updateInvoiceById: IInvoice = await this.Invoices.findOneAndUpdate({_id: InvoiceId},{
            $set: updateData
        },{new:true}).exec();
        if(!updateInvoiceById) throw new HttpException(400, "Error updating invoice");
        const receivables = await this.Account.findByName("accounts-receivable")
        const paymentAccount = await this.Account.find(invoice.account)
        console.log('UPDATE INVOICE', updateInvoiceById)
       const accountUpdate: PutAccountBalanceDto = {
           balance: receivables.balance - invoiceData.total_amount,
       }
       const paymentAccountUpdate: PutAccountBalanceDto = {
           balance: paymentAccount.balance + invoiceData.total_amount,
       }
       console.log('INVOICE DATA', invoiceData)
       console.log("account update-----------------", accountUpdate)
       console.log("receievables balance", receivables.balance , invoiceData.total_amount);
       this.Account.updateBalance(receivables._id, accountUpdate);
       this.Account.updateBalance(paymentAccount._id, paymentAccountUpdate);
       const jData = {
        account: receivables._id,
        ref: invoiceData.number,
        debit: 0,
        credit: invoiceData.total_amount,
        description: '',
        date: new Date().toISOString()
       }
       console.log(jData)
       this.Journal.createJournal(jData)
        if(!updateInvoiceById) throw new HttpException(409, "Invoice doesn't exist");
         return updateInvoiceById;
   }
     public async updateInvoice(InvoiceId:string,invoiceData)  : Promise<IInvoice>{
        //Check if data is empty
        if (isEmpty(invoiceData)) throw new HttpException(400, "No data provided");
        const updateInvoiceById: IInvoice = await this.Invoices.findByIdAndUpdate(InvoiceId,invoiceData,{new:true});
        if(!updateInvoiceById) throw new HttpException(409, "Invoice doesn't exist");
         return updateInvoiceById;
   }
   public async updateInvoiceStatus(InvoiceId:string,InvoiceData:UpdateInvoiceStatus)  : Promise<IInvoice>{
    const findInvoice: IInvoice = await this.Invoices.findOne({_id:InvoiceData._id});
    if(findInvoice) throw new HttpException(409, `Invoice with this ${InvoiceData._id} already exists`);

    const updateInvoiceById: IInvoice = await this.Invoices.findByIdAndUpdate(InvoiceId,{$set: {status:"Published"}}, { new: true });
    if(!updateInvoiceById) throw new HttpException(409, "Invoices status could not be updated");
    return updateInvoiceById;
  }

     public async deleteInvoice(InvoiceId:string) : Promise<IInvoice>{
         const deleteInvoiceById : IInvoice = await this.Invoices.findByIdAndDelete(InvoiceId);
         if(!deleteInvoiceById) throw new HttpException(409, "Invoice doesn't exist");
         return deleteInvoiceById;
     }

     private static generateRefID(){
        return "OGI"+ Math.floor(1000 + Math.random() * 9000)
      }

}

export default InvoiceService;