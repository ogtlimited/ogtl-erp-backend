/* eslint-disable prettier/prettier */
import CombineServices from '@/services/index.service';
import { NextFunction, Request, Response } from 'express';

class ReportController {
  public indexS = new CombineServices();
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
  public createEmployeeFormSelection = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createEmployeeFormSelection = await this.indexS.createEmployeeFormSelection();

      res.status(200).json({ createEmployeeFormSelection, message: 'combined data result' });
    } catch (error) {
      next(error);
    }
  };

  public getAdminDashboardData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getAdminDashboardData = await this.indexS.adminDashboardDate();
      res.status(200).json({ getAdminDashboardData, message: 'combined admin data result' });
    }catch (e) {
      next(e)
    }
  }
  public getEmployeeFUllData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeId = req.params.id,
        getEmployeeFullData = await this.indexS.employeeFullInfo(employeeId);
      res.status(200).json({ getEmployeeFullData, message: 'Employee user data' });
    } catch (e) {
      next(e);
    }
  };
}

export default ReportController;
