/* eslint-disable prettier/prettier */
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
 import validationMiddleware from '@middlewares/validation.middleware';
 import authMiddleware from '@middlewares/auth.middleware';
import TicketingController from '@controllers/ticketing/ticketing.controller';
import { CreateTicketingDto, UpdateTicketingDto } from '@dtos/ticketing/ticketing.dto';

class TicketingRoute implements Routes{
  public path = '/api/ticketing';
  public router = Router();
  public ticketingController = new TicketingController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware,this.ticketingController.getTicketings);
    this.router.get(`${this.path}/:id`, authMiddleware,this.ticketingController.getTicketingsById);
    this.router.get(`${this.path}/:employeeId`, authMiddleware,this.ticketingController.getTicketingsByEmployeeId);
    this.router.get(`${this.path}/:departmentId`, authMiddleware,this.ticketingController.getTicketingsByDepartmentId);
    this.router.post(`${this.path}`, [validationMiddleware(CreateTicketingDto, 'body'),authMiddleware], this.ticketingController.createTicketings);
    this.router.patch(`${this.path}/:id`,[ validationMiddleware(UpdateTicketingDto, 'body', true),authMiddleware], this.ticketingController.updateTicketings);
    this.router.delete(`${this.path}/:id`, authMiddleware,this.ticketingController.deleteTicketings);
  }
}

export default TicketingRoute;
