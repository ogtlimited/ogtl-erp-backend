/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';
import PaymentController from '@/controllers/payments/payment.controller';
import { CreatePaymentDto, UpdatePaymentDto } from '@/dtos/payment/payment.dto';


class PaymentRoute implements Routes {
  public path = '/api/payment';
  public router = Router();
  public Payment = new PaymentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`,authMiddleware, this.Payment.getPayments);
    this.router.get(`${this.path}/:id`,authMiddleware, this.Payment.getPaymentById);
    this.router.post(`${this.path}/draft`, [validationMiddleware(CreatePaymentDto, 'body'),authMiddleware], this.Payment.createDraftPayment);
    this.router.post(`${this.path}/published`, [validationMiddleware(UpdatePaymentDto, 'body'),authMiddleware], this.Payment.createPayment);
    this.router.patch(`${this.path}/:id`, [validationMiddleware(UpdatePaymentDto, 'body',true),authMiddleware], this.Payment.updatePayment);
    this.router.delete(`${this.path}/:id`,authMiddleware, this.Payment.deletePayment);
  }
}

export default PaymentRoute;
