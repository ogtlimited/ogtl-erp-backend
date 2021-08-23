/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateAttendanceDto } from '@dtos/attendance/attendance.dto';
import { IAttendance, IAttendanceCreatedResponse } from '@/interfaces/attendance-interface/attendance-interface';
import AttendanceTypeService from '@/services/attendance/attendance.service';

// import mongoose from 'mongoose'

class AttendanceController {
  public attendanceService = new AttendanceTypeService();
  
  public getAttendances = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllAttendanceData: IAttendance[] = await this.attendanceService.findAllAttendanceType();
      res.status(200).json({ data: findAllAttendanceData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getAttendanceById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shiftId: string = req.params.id;
      const findOneAttendanceData: IAttendance = await this.attendanceService.findAttendanceTypeById(shiftId);
      res.status(200).json({ data: findOneAttendanceData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createAttendance = async (req: Request, res: Response, next: NextFunction) => {
    try {
     
      const attendanceData: CreateAttendanceDto = req.body;
      const createAttendanceData: IAttendanceCreatedResponse = await this.attendanceService.createAttendanceType(attendanceData); 
      res.status(201).json({ data: createAttendanceData, message: 'created' });
    } catch (error) {
      
      next(error);
    }
  };

}

export default AttendanceController;
