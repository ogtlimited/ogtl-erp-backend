/* eslint-disable prettier/prettier */
import { CreateAttendanceDto } from './../../dtos/attendance/attendance.dto';
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
        this.router.get(`${this.path}`, this.AttendanceController.getShifts);
        this.router.get(`${this.path}/:id`, this.AttendanceController.getShiftById);
        this.router.post(`${this.path}`, validationMiddleware(CreateAttendanceDto, 'body'), this.AttendanceController.createShift);
    }
  }
  export default AttendanceRoute;