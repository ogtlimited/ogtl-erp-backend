/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

import authMiddleware from '@middlewares/auth.middleware';
import InvoiceController from '@/controllers/invoice/invoice.controller';
import { CreateInvoiceDto, UpdateInvoiceDto,UpdateInvoiceStatus } from '@/dtos/invoice/invoice.dto';

class InvoiceRoute implements Routes {
    public path = '/api/invoice';
    public router = Router();
    public InvoiceController = new InvoiceController();
  
    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`,authMiddleware, this.InvoiceController.getInvoices);
        this.router.get(`${this.path}/:id`,authMiddleware, this.InvoiceController.getInvoiceById);
        this.router.post(`${this.path}` ,  [validationMiddleware(CreateInvoiceDto, 'body'),authMiddleware],  this.InvoiceController.CreateInvoice);
        this.router.patch(`${this.path}/:id`,[validationMiddleware(UpdateInvoiceDto, 'body', true),authMiddleware],  this.InvoiceController.updateInvoice);
        this.router.patch(`${this.path}/invoicepayment/:id`,[validationMiddleware(UpdateInvoiceDto, 'body', true),authMiddleware], this.InvoiceController.updateInvoicePayment);
        this.router.patch(`${this.path}/status/:id`,[validationMiddleware(UpdateInvoiceStatus, 'body', true),authMiddleware], this.InvoiceController.updateInvoiceStatus);
        this.router.delete(`${this.path}/:id`,authMiddleware, this.InvoiceController.deleteInvoice);
      }
    }

    export default InvoiceRoute;