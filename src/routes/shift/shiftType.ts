/* eslint-disable prettier/prettier */
import { CreateShiftTypeDto } from './../../dtos/shift/shift_type.dto';
import ShiftTypeController from '@/controllers/shift/shift_type.controller';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class ShiftTypeRoute implements Routes {
    public path = '/shiftType';
    public router = Router();
    public shiftTypeController = new ShiftTypeController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.shiftTypeController.getShifts);
        this.router.get(`${this.path}/:id`, this.shiftTypeController.getShiftById);
        this.router.post(`${this.path}`, validationMiddleware(CreateShiftTypeDto, 'body'), this.shiftTypeController.createShift);
        this.router.put(`${this.path}/:id`, validationMiddleware(CreateShiftTypeDto, 'body', true), this.shiftTypeController.updateShift);
        this.router.delete(`${this.path}/:id`, this.shiftTypeController.deleteShift);
    }
  }
  export default ShiftTypeRoute;