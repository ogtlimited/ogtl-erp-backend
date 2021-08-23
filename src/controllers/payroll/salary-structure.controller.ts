/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateSalaryStructureDto} from '@dtos/payroll/salary-structure.dto';
import { ISalaryStructure} from '@/interfaces/payroll/salary-structure.interface';
import SalaryStructureService from '@/services/payroll/salary-structure.service';

// import mongoose from 'mongoose'

class SalaryStrutureController {
  public salaryStructureService = new SalaryStructureService();
  
  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allSalaryStructures = await this.salaryStructureService.findAll();
      res.status(200).json({ data: allSalaryStructures});
    } catch (error) {
      next(error);
    }
  };

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data = await this.salaryStructureService.findById(id);
      res.status(200).json({ data: data});
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newSalaryStructure: CreateSalaryStructureDto= req.body;
      const createdSalaryStructure: ISalaryStructure= await this.salaryStructureService.create(newSalaryStructure); 
      res.status(201).json({ data: createdSalaryStructure});
    } catch (error) {
      
      next(error);
    }
  };

  //update
//   public createShift = async (req: Request, res: Response, next: NextFunction) => {
//     try {
     
//       const attendanceData: CreateSalaryStructureDto= req.body;
//       const createAttendanceData: IAttendanceCreatedResponse = await this.salaryStructureService.createAttendanceType(attendanceData); 
//       res.status(201).json({ data: createAttendanceData, message: 'created' });
//     } catch (error) {
      
//       next(error);
//     }
//   };

}

export default SalaryStrutureController;
