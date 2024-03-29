/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateAttendanceDto, UpdateAttendanceDto } from '@dtos/attendance/attendance.dto';
import { IAttendance, IAttendanceCreatedResponse } from '@/interfaces/attendance-interface/attendance-interface';
import AttendanceTypeService from '@/services/attendance/attendance.service';
// import mongoose from 'mongoose'

class AttendanceController {
  public attendanceService = new AttendanceTypeService();

  // public getAttendances = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const findAllAttendanceData: IAttendance[] = await this.attendanceService.findAllDepartmentAttendance(req.query);
  //     res.status(200).json({ data: findAllAttendanceData, message: 'findAll' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  public getDepartmentAttendance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllDepartmentAttendanceData = await this.attendanceService.findAllDepartmentAttendance(req.query);
      res.status(200).json({ data: findAllDepartmentAttendanceData});
    } catch (error) {
      next(error);
    }
  };
  public getEmployeeAttendance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeAttendance = await this.attendanceService.findAllEmployeeAttendance(req.params.ogId, req.query);
      res.status(200).json({ data: employeeAttendance});
    } catch (error) {
      next(error);
    }
  };

  public getAttendanceById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shiftId: string = req.params.id;
      const findOneAttendanceData: IAttendance = await this.attendanceService.findAttendanceTypeById(shiftId);
      res.status(200).json({ data: findOneAttendanceData});
    } catch (error) {
      next(error);
    }
  };

  public createAttendance = async (req, res: Response, next: NextFunction) => {
    try {

      const attendanceData = req.body;
      const createAttendanceData: any = await this.attendanceService.createAttendanceType(req.user, attendanceData);
      res.status(201).json({ data: createAttendanceData});
    } catch (error) {
      next(error);
    }
  };

  // public CreateBulkAttendance = async (req, res: Response, next: NextFunction) => {
  //   try {
  //     const attendanceData = req.body;
  //     const createAttendanceData: any = await this.attendanceService.bulkAttendanceUpload(attendanceData);
  //     res.status(201).json({ data: createAttendanceData});
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  public updateAttendance = async (req, res: Response, next: NextFunction) => {
    try {

      const attendanceData: UpdateAttendanceDto = req.body;
      // console.log(req)
      const createAttendanceData: any = await this.attendanceService.updateAttendance(req.user,attendanceData);
      res.status(201).json({ data: createAttendanceData});
    } catch (error) {
      console.log(error, 'ERROR')
      next(error);
    }
  };
  public findAllExternalDatabaseAttendance = async (req, res: Response, next: NextFunction) => {
    try {
      const externalDatabaseAttendance: any = await this.attendanceService.findAllExternalDatabaseAttendance();
      res.status(201).json({ data: externalDatabaseAttendance });
    } catch (error) {
      next(error);
    }
  };
  public findExternalDatabaseAttendanceByOgId = async (req, res: Response, next: NextFunction) => {
    try {
      const externalDatabaseAttendance: any = await this.attendanceService.findExternalDatabaseAttendanceByOgId(req.query);
      res.status(201).json({ data: externalDatabaseAttendance });
    } catch (error) {
      next(error);
    }
  };
  public uploadMultipleAttendanceRecord = async (req, res: Response, next: NextFunction) => {
    try {
      const externalDatabaseAttendance: any = await this.attendanceService.uploadMultipleAttendanceRecord();
      res.status(201).json({ data: externalDatabaseAttendance });
    } catch (error) {
      next(error);
    }
  };
  public findCapturedEmployeesOnBiometricDatabaseAndThereShiftStatus = async (req, res: Response, next: NextFunction) => {
    try {
      const staff: any = await this.attendanceService.findCapturedEmployeesOnBiometricDatabaseAndThereShiftStatus(req.query);
      res.status(201).json({ staff });
    } catch (error) {
      next(error);
    }
  };
  public createManualAttendanceToPostgresQL = async (req, res: Response, next: NextFunction) => {
    try {
      const attendanceRecord: any = await this.attendanceService.createManualAttendanceToPostgresQL(req.body);
      res.status(201).json({ attendanceRecord });
    } catch (error) {
      next(error);
    }
  };

}

export default AttendanceController;
