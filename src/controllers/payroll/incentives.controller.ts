/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateIncentiveDto } from '@dtos/payroll/incentives.dto';
import { IIncentiveCreatedResponse } from '@/interfaces/payroll/incentives.interface';
import IncentiveTypeService from '@/services/payroll/incentive.service';

// import mongoose from 'mongoose'

class IncentiveController {
  public incentiveService = new IncentiveTypeService();
  
  public getIncentives = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllIcentivesData = await this.incentiveService.findAllIncentiveType();
      res.status(200).json({ data: findAllIcentivesData});
    } catch (error) {
      next(error);
    }
  };

  public getIncentiveById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const incentiveId: string = req.params.id;
      const incentiveData = await this.incentiveService.findIncentiveTypeById(incentiveId);
      res.status(200).json({ data: incentiveData});
    } catch (error) {
      next(error);
    }
  };

  public createIncentive = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const incentiveData: CreateIncentiveDto = req.body;
      const createIncentiveData: IIncentiveCreatedResponse = await this.incentiveService.createIncentiveType(incentiveData); 
      res.status(201).json({ data: createIncentiveData});
    } catch (error) {
      
      next(error);
    }
  };

  //update
//   public createShift = async (req: Request, res: Response, next: NextFunction) => {
//     try {
     
//       const attendanceData: CreateIncentiveDto = req.body;
//       const createAttendanceData: IAttendanceCreatedResponse = await this.incentiveService.createAttendanceType(attendanceData); 
//       res.status(201).json({ data: createAttendanceData, message: 'created' });
//     } catch (error) {
      
//       next(error);
//     }
//   };

}

export default IncentiveController;
