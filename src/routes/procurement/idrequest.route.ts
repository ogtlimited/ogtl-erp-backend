/* eslint-disable prettier/prettier */



import { Router } from 'express';

import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateIdRequestDto, UpdateIdRequestDto } from '@/dtos/procurement/idrequest.dto';
import IdRequestController from '@/controllers/procurement/idrequest.controller';


class IdRequestRoute implements Routes {
  public path = '/api/id-request';
  public router = Router();
  public IdRequestController = new IdRequestController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.IdRequestController.getIdRequests);
    this.router.get(`${this.path}/:id`, this.IdRequestController.getIdRequestById);
    this.router.post(`${this.path}`, validationMiddleware(CreateIdRequestDto, 'body'), this.IdRequestController.createIdRequest);
    this.router.put(`${this.path}/:id`, validationMiddleware(UpdateIdRequestDto, 'body', true), this.IdRequestController.updateIdRequest);
    this.router.delete(`${this.path}/:id`, this.IdRequestController.deleteIdRequest);
  }
}

export default IdRequestRoute;
