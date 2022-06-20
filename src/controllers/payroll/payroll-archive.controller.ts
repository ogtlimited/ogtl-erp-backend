/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import PayrollArchiveService from "@services/payroll/payroll_archive.service";

class PayRollArchiveController {
  public payRollArchiveService = new PayrollArchiveService();

  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.payRollArchiveService.findAll(req.query);
      res.status(200).json({ data: result});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data = await this.payRollArchiveService.findById(id);
      res.status(200).json({ data });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };


}

export default PayRollArchiveController;
