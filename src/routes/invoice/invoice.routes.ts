/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

import authMiddleware from '@middlewares/auth.middleware';
import InvoiceController from '@/controllers/invoice/invoice.controller';
import { CreateInvoiceDto, UpdateInvoiceDto } from '@/dtos/invoice/invoice.dto';

class InvoiceRoute implements Routes {
    public path = '/invoice';
    public router = Router();
    public InvoiceController = new InvoiceController();
  
    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`,authMiddleware, this.InvoiceController.getInvoices);
        this.router.get(`${this.path}/:id`,authMiddleware, this.InvoiceController.getInvoiceById);
        this.router.post(`${this.path}` , authMiddleware, validationMiddleware(CreateInvoiceDto, 'body'), this.InvoiceController.CreateInvoice);
        this.router.put(`${this.path}/:id`,authMiddleware, validationMiddleware(UpdateInvoiceDto, 'body', true), this.InvoiceController.updateInvoice);
        this.router.delete(`${this.path}/:id`,authMiddleware, this.InvoiceController.deleteInvoice);
      }
    }

    export default InvoiceRoute;