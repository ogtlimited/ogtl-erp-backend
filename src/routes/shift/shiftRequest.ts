/* eslint-disable prettier/prettier */
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import ShiftRequestController from '@controllers/shift/shift_request.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateShiftRequestDto, UpdateShiftRequestDto } from '@dtos/shift/shift_request.dto';

class ShiftRequestRoute implements Routes{
  public path = '/shiftRequest';
  public router = Router();
  public shiftRequestController = new ShiftRequestController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.shiftRequestController.getShiftRequests);
    this.router.get(`${this.path}/:id`, this.shiftRequestController.getShiftRequestById);
    this.router.post(`${this.path}`, validationMiddleware(CreateShiftRequestDto, 'body'), this.shiftRequestController.createShiftRequest);
    this.router.patch(`${this.path}/:id`, validationMiddleware(UpdateShiftRequestDto, 'body', true), this.shiftRequestController.updateShiftRequest);
    this.router.delete(`${this.path}/:id`, this.shiftRequestController.deleteShiftRequest);
  }
}

export default ShiftRequestRoute;
