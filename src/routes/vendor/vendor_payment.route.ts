/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';
import VendorPaymentController from '@controllers/vendor/vendor_payment.controller';
import { CreateVendorPaymentDto, UpdateVendorPaymentDto } from '@dtos/vendor/vendor-payment.dto';


class VendorPaymentRoute implements Routes {
  public path = '/api/vendor-payment';
  public router = Router();
  public vendorPayment = new VendorPaymentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`,authMiddleware, this.vendorPayment.getVendorsPayments);
    this.router.get(`${this.path}/:id`,authMiddleware, this.vendorPayment.getVendorPaymentById);
    this.router.post(`${this.path}`, [validationMiddleware(CreateVendorPaymentDto, 'body'),authMiddleware], this.vendorPayment.createVendorPayment);
    this.router.patch(`${this.path}/:id`, [validationMiddleware(UpdateVendorPaymentDto, 'body',true),authMiddleware], this.vendorPayment.updateVendorPayment);
    this.router.delete(`${this.path}/:id`,authMiddleware, this.vendorPayment.deleteVendorPayment);
  }
}

export default VendorPaymentRoute;
