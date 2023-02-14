/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { IDepartment } from '@/interfaces/employee-interface/department.interface';
import OfficeService from '@/services/employee/office.service';
import { IProject } from '@/interfaces/project-interface/project.interface';

class OfficeController {
  public OfficeService = new OfficeService();

  public createOffice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const office: IDepartment | IProject = await this.OfficeService.createOffice(req.body);
      res.status(201).json({ data: office, message: 'Succesfully created' });
    } catch (error) {
      next(error);
    }
  };
}
export default OfficeController;
