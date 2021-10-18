/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';
import BillsController from '@controllers/vendor/bills.controller';
import { CreateBillsDto, UpdateBillsDto, UpdateBillsStatus } from '@dtos/vendor/bills.dto';


class BillsRoute implements Routes {
  public path = '/api/bills';
  public router = Router();
  public billsController = new BillsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`,authMiddleware, this.billsController.getBills);
    this.router.get(`${this.path}/:id`,authMiddleware, this.billsController.getBillById);
    this.router.post(`${this.path}` , [validationMiddleware(CreateBillsDto, 'body'),authMiddleware], this.billsController.CreateBill);
    this.router.patch(`${this.path}/:id`,[validationMiddleware(UpdateBillsDto, 'body', true),authMiddleware], this.billsController.updateBill);
    this.router.patch(`${this.path}/status/:id`,[validationMiddleware(UpdateBillsStatus, 'body', true),authMiddleware], this.billsController.updateBillStatus);
    this.router.patch(`${this.path}/billPayment/:id`,[validationMiddleware(UpdateBillsDto, 'body', true),authMiddleware], this.billsController.updateBillPayment);
    this.router.delete(`${this.path}/:id`,authMiddleware, this.billsController.deleteBill);
  }
}

export default BillsRoute;
