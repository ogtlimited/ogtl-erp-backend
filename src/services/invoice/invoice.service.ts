/* eslint-disable prettier/prettier */

import { HttpException } from '@exceptions/HttpException';

import { isEmpty } from '@utils/util';
import invoiceModel from '@/models/Invoice/invoice.model';
import { IInvoice } from '@/interfaces/invoice/invoice.interface';
import { CreateInvoiceDto } from '@/dtos/invoice/invoice.dto';

class InvoiceService {
    public Invoices = invoiceModel;

    /**
     *Returns all IInvoice
     */
    public async findAllInvoices(): Promise<IInvoice[]> {
        const invoices: IInvoice[] = await this.Invoices.find();
        return invoices;
    }

    /**
     *Returns the IInvoice with the Id given
     */
    public async findInvoiceById(InvoiceId:string) : Promise<IInvoice>
    {
       //Check if Id is empty
       if (isEmpty(InvoiceId)) throw new HttpException(400, "No Id provided");

       //find IInvoice with Id given
       const findInvoice:IInvoice = await this.Invoices.findOne({ _id:InvoiceId  });

       if(!findInvoice) throw new HttpException(409, "IInvoice with that Id doesnt exist");

       return findInvoice;
    }

    /**
     *Creates a new IInvoice
     */


     public async createInvoice(invoiceData: CreateInvoiceDto) : Promise<IInvoice>{

        //Check if data is empty
       if (isEmpty(invoiceData)) throw new HttpException(400, "No data provided");

       const findInvoice: IInvoice = await this.Invoices.findOne({IInvoice: invoiceData.ref});
       if(findInvoice) throw new HttpException(409, `Invoice with this ${invoiceData.ref} already exists`);

       const createInvoiceData: IInvoice = await this.Invoices.create(invoiceData);
       return createInvoiceData;
     }

     /**
     *Updates existing IInvoice 
     */

     public async updateInvoice(InvoiceId:string,invoiceData)  : Promise<IInvoice>{

        //Check if data is empty
        if (isEmpty(invoiceData)) throw new HttpException(400, "No data provided");

        const updateInvoiceById: IInvoice = await this.Invoices.findByIdAndUpdate(InvoiceId,{invoiceData});
        if(!updateInvoiceById) throw new HttpException(409, "IInvoice doesn't exist");
         return updateInvoiceById;
   }

     public async deleteInvoice(InvoiceId:string) : Promise<IInvoice>{
         const deleteInvoiceById : IInvoice = await this.Invoices.findByIdAndDelete(InvoiceId);
         if(!deleteInvoiceById) throw new HttpException(409, "IInvoice doesn't exist");
         return deleteInvoiceById;
     }

}

export default InvoiceService;
