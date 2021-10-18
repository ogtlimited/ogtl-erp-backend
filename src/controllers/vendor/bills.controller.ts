/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import BillService from '@services/vendor/bills.service';
import { IBills } from '@interfaces/vendor-interface/bills-interface';
import { CreateBillsDto } from '@dtos/vendor/bills.dto';


class BillsController {
  public billService = new BillService();

  //Returns all Bills
  public getBills = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllBills: IBills[] = await this.billService.findAllBills();

      res.status(200).json({ data: findAllBills, TotalBills: findAllBills.length, message: 'All bills' });
    } catch (error) {
      next(error);
    }
  };

  //creates bill
  public CreateBill = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const billData: CreateBillsDto = req.body;
      const createBillData: IBills = await this.billService.createBill(billData);
      res.status(201).json({ data: createBillData, message: 'Bill successfully created' });
    } catch (error) {
      next(error);
    }
  };

  //gets one bill with Id given
  public getBillById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const billId: string = req.params.id;
      const findOneBillData: IBills = await this.billService.findBillById(billId);
      res.status(200).json({ data: findOneBillData, message: 'Bill with the given ID found' });
    } catch (error) {
      next(error);
    }
  };

  //update bill
  public updateBill = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const billId: string = req.params.id;
      const billData = req.body;
      const updateBillData: IBills = await this.billService.updateBill(billId, billData);
      res.status(200).json({ data: updateBillData, message: 'Bill Updated' });
    } catch (error) {
      next(error);
    }
  };

  public updateBillStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const billId: string = req.params.id;
      const billData = req.body;
      const updateBillData: IBills = await this.billService.updateBillStatus(billId, billData);
      res.status(200).json({ data: updateBillData, message: 'Bill status updated' });
    } catch (error) {
      next(error);
    }
  };

  public updateBillPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const billId: string = req.params.id;
      const billData = req.body;
      const updateBillData: IBills = await this.billService.updateBillPayment(billId, billData);
      res.status(200).json({ data: updateBillData, message: 'Bill Updated' });
    } catch (error) {
      next(error);
    }
  };
  //deletes bill
  public deleteBill = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const billId: string = req.params.id;
      const deleteBillData: IBills = await this.billService.deleteBill(billId);
      res.status(200).json({ data: deleteBillData, message: 'Bill Deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default BillsController;
