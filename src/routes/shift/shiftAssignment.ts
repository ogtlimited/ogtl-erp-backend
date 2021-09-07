/* eslint-disable prettier/prettier */
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import ShiftAssignmentController from '@controllers/shift/shift_assignment.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateShiftAssignmentDto, UpdateShiftAssignmentDto } from '@dtos/shift/shift_assignment.dto';
import authMiddleware from '@middlewares/auth.middleware';

class ShiftAssignmentRoute implements Routes{
  public path = "/api/shiftAssignment";
  public router = Router();
  public shiftAssignmentController = new ShiftAssignmentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(){
    this.router.get(`${this.path}`, this.shiftAssignmentController.getShiftAssignments);
    this.router.get(`${this.path}/:id`, this.shiftAssignmentController.getShiftAssignmentById);
    this.router.post(`${this.path}`,validationMiddleware(CreateShiftAssignmentDto,'body'),this.shiftAssignmentController.createShiftAssignment);
    this.router.patch(`${this.path}/:id`, validationMiddleware(UpdateShiftAssignmentDto, 'body',true), this.shiftAssignmentController.updateShiftAssignment);
    this.router.delete(`${this.path}/:id`, this.shiftAssignmentController.deleteShiftAssignment);

  }
}

export default ShiftAssignmentRoute;
