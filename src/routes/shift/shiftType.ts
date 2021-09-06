/* eslint-disable prettier/prettier */
import ShiftTypeController from '@/controllers/shift/shift_type.controller';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';
import { CreateShiftTypeDto, UpdateShiftTypeDto } from '@dtos/shift/shift_type.dto';
import authMiddleware from '@middlewares/auth.middleware';

class ShiftTypeRoute implements Routes {
    public path = '/api/shiftType';
    public router = Router();
    public shiftTypeController = new ShiftTypeController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.shiftTypeController.getShifts);
        this.router.get(`${this.path}/:id`, this.shiftTypeController.getShiftById);
        this.router.post(`${this.path}`,validationMiddleware(CreateShiftTypeDto, 'body'), this.shiftTypeController.createShift);
        this.router.patch(`${this.path}/:id`, validationMiddleware(UpdateShiftTypeDto, 'body', true), this.shiftTypeController.updateShift);
        this.router.delete(`${this.path}/:id`, this.shiftTypeController.deleteShift);
    }
  }
  export default ShiftTypeRoute;
