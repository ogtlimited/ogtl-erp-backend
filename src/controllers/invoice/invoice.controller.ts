/* eslint-disable prettier/prettier */
import { CreateInvoiceDto } from '@/dtos/invoice/invoice.dto';
import { IInvoice } from '@/interfaces/invoice/invoice.interface';
import InvoiceService from '@/services/invoice/invoice.service';
import { NextFunction, Request, Response } from 'express';


class InvoiceController {
  public InvoiceService = new InvoiceService();

  //Returns all Invoices
  public getInvoices = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllInvoicesData: IInvoice[] = await this.InvoiceService.findAllInvoices();

      res.status(200).json({ data: findAllInvoicesData, numInvoices: findAllInvoicesData.length, message: 'All Invoices' });
    } catch (error) {
      next(error);
    }
  };

  //creates Invoice
  public CreateInvoice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const InvoiceData: CreateInvoiceDto = req.body;
      const createInvoiceData: IInvoice = await this.InvoiceService.createInvoice(InvoiceData);
      res.status(201).json({ data: createInvoiceData, message: 'Invoice succesfully created' });
    } catch (error) {
      next(error);
    }
  };

  //gets one Invoice with Id given
  public getInvoiceById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const InvoiceId: string = req.params.id;
      const findOneInvoiceData: IInvoice = await this.InvoiceService.findInvoiceById(InvoiceId);
      res.status(200).json({ data: findOneInvoiceData, message: 'All Invoices' });
    } catch (error) {
      next(error);
    }
  };

  //update Invoice
  public updateInvoice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const InvoiceId: string = req.params.id;
      const InvoiceData = req.body;
      const updateInvoiceData: IInvoice = await this.InvoiceService.updateInvoice(InvoiceId, InvoiceData);
      res.status(200).json({ data: updateInvoiceData, message: 'Invoice Updated' });
    } catch (error) {
      next(error);
    }
  };
  public updateInvoicePayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const InvoiceId: string = req.params.id;
      const InvoiceData = req.body;
      const updateInvoiceData: IInvoice = await this.InvoiceService.updateInvoicePayment(InvoiceId, InvoiceData);
      res.status(200).json({ data: updateInvoiceData, message: 'Invoice Updated' });
    } catch (error) {
      next(error);
    }
  };
  public updateInvoiceStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const InvoiceId: string = req.params.id;
      const InvoiceData = req.body;
      const updateInvoiceData: IInvoice = await this.InvoiceService.updateInvoiceStatus(InvoiceId, InvoiceData);
      res.status(200).json({ data: updateInvoiceData, message: 'Invoice status updated' });
    } catch (error) {
      next(error);
    }
  };
  //deletes Invoice
  public deleteInvoice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const InvoiceId: string = req.params.id;
      const deleteInvoiceData: IInvoice = await this.InvoiceService.deleteInvoice(InvoiceId);
      res.status(200).json({ data: deleteInvoiceData, message: 'Invoice Deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default InvoiceController;