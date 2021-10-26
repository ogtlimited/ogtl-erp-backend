/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import PaymentService from '@/services/payments/payment.service';
import { IPayment } from '@/interfaces/payments/payment-interface';
import { CreatePaymentDto, UpdatePaymentDto } from '@/dtos/payment/payment.dto';

class PaymentController {
  public PaymentService = new PaymentService();

  //Method for returning all
  public getPayments = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const findAlls: IPayment[] = await this.PaymentService.findAllPayment();
      res.status(200).json({data:findAlls, totalsPayments: findAlls.length, message:"All  payments"})
    }catch (error) {
      next(error)
    }
  }

  //Method for returning a single 
  public getPaymentById = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const Id:string = req.params.id;
      const find:IPayment = await this.PaymentService.findPaymentId(Id);
      res.status(200).json({data:find, message:" payment found successfully"})
    }
    catch (error) {
      next(error)
    }
  }

  //Method for creating
  public createDraftPayment = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const Data:CreatePaymentDto = req.body;
      const createData: IPayment = await this.PaymentService.saveDraftPayment(Data);
      res.status(201).json({ data: createData, message: ' payment created.' });
    }
    catch (error) {
      next(error)
    }
  }
  //Method for creating
  public createPayment = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const Data:UpdatePaymentDto = req.body;
      const createData: IPayment = await this.PaymentService.createPaymentModel(Data);
      res.status(201).json({ data: createData, message: ' payment created.' });
    }
    catch (error) {
      next(error)
    }
  }

  //Method for updating 
  public updatePayment = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const Id:string = req.params.id;
      const Data:UpdatePaymentDto = req.body;
      const updateData: IPayment = await this.PaymentService.updatePaymentModel(Id,Data);
      res.status(200).json({ data: updateData, message: ' payment updated.' });
    }
    catch (error) {
      next(error)
    }
  }

  //Method for deleting 
  public deletePayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Id:string = req.params.id;
      const deletePayment = await this.PaymentService.deletePaymentModel(Id);
      res.status(200).json({ data: deletePayment, message: ' payment deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default PaymentController
