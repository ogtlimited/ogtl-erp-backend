/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateTransferDto } from '@dtos/employee-lifecycle/transfer.dto';
import { ITransfer } from '@/interfaces/employee-lifecycle/transfer.interface';
import TransferService from '@/services/employee-lifecycle/transfer.service';

class TransferController {
  public TransferService = new TransferService();
  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const transfers = await this.TransferService.findAll();
      res.status(200).json({ data: transfers});
    } catch (error) {
      next(error);
    }
  };

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data = await this.TransferService.findById(id);
      res.status(200).json({ data: data});
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newData: CreateTransferDto = req.body;
      const createdData: ITransfer = await this.TransferService.create(newData); 
      res.status(201).json({ data: createdData});
    } catch (error) {
      next(error);
    }
  };
}

export default TransferController;
