/* eslint-disable prettier/prettier */

import { NextFunction, Request, Response } from 'express';
import { Employee } from '@interfaces/employee-interface/employee.interface';
import EmployeeVerificationService from '@services/employee_verification.service';

class EmployeeVerificationController {
  public EmployeeVerificationService = new EmployeeVerificationService();
  public findEmployeeByOgId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ogid } = req.params
      const employee: Employee[] = await this.EmployeeVerificationService.findEmployeeByOgId(ogid);
      res.status(200).json({ employee: employee });
    } catch (error) {
      next(error);
    }
  };
}

export default EmployeeVerificationController;
