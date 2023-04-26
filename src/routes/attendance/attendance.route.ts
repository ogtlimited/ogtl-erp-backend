/* eslint-disable prettier/prettier */
import {
  CreateAttendanceDto,
  CreateBulkAttendanceDto,
  UpdateAttendanceDto
} from './../../dtos/attendance/attendance.dto';
import AttendanceController from '@/controllers/attendance/attendance.controller';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware'


class AttendanceRoute implements Routes {
    public path = '/api/attendance';
    public router = Router();
    public AttendanceController = new AttendanceController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        // this.router.get(`${this.path}`, this.AttendanceController.getAttendances);
        this.router.get(`${this.path}`,[authMiddleware], this.AttendanceController.getDepartmentAttendance);
        this.router.get(`${this.path}/from-postgres`, [authMiddleware], this.AttendanceController.findAllExternalDatabaseAttendance);
        this.router.get(`${this.path}/from-postgres/for-hr`, [authMiddleware], this.AttendanceController.findExternalDatabaseAttendanceByOgId);
        this.router.get(`${this.path}/captured-employees`, [authMiddleware], this.AttendanceController.findCapturedEmployeesOnBiometricDatabaseAndThereShiftStatus);
        this.router.get(`${this.path}/employee/:ogId`,[authMiddleware], this.AttendanceController.getEmployeeAttendance);
        this.router.get(`${this.path}/:id`,[authMiddleware], this.AttendanceController.getAttendanceById);
        this.router.post(`${this.path}`,[authMiddleware, validationMiddleware(CreateAttendanceDto, 'body')], this.AttendanceController.createAttendance);
        this.router.post(`${this.path}/postgresdb-bulk-upload`,[authMiddleware], this.AttendanceController.uploadMultipleAttendanceRecord);
        this.router.patch(`${this.path}`, [authMiddleware, validationMiddleware(UpdateAttendanceDto, 'body')], this.AttendanceController.updateAttendance);
    }
  }
  export default AttendanceRoute;
