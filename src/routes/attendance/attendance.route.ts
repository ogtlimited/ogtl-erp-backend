/* eslint-disable prettier/prettier */
import { CreateAttendanceDto, UpdateAttendanceDto } from './../../dtos/attendance/attendance.dto';
import AttendanceController from '@/controllers/attendance/attendance.controller';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class AttendanceRoute implements Routes {
    public path = '/api/attendance';
    public router = Router();
    public AttendanceController = new AttendanceController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        // this.router.get(`${this.path}`, this.AttendanceController.getAttendances);
        this.router.get(`${this.path}/department/:id`, this.AttendanceController.getDepartmentAttendance);
        this.router.get(`${this.path}/employee/:ogId`, this.AttendanceController.getEmployeeAttendance);
        this.router.get(`${this.path}/:id`, this.AttendanceController.getAttendanceById);
        this.router.post(`${this.path}`, validationMiddleware(CreateAttendanceDto, 'body'), this.AttendanceController.createAttendance);
        this.router.patch(`${this.path}`, validationMiddleware(UpdateAttendanceDto, 'body'), this.AttendanceController.updateAttendance);
    }
  }
  export default AttendanceRoute;