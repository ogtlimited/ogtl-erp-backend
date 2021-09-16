/* eslint-disable prettier/prettier */

import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import TestController from '@controllers/recruitment/test.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateTestDto, UpdateTestDto } from '@dtos/recruitment/test.dto';
import authMiddleware from '@middlewares/auth.middleware';

class TestRoute implements Routes{
  public path = "/api/test";
  public router = Router();
  public testController = new TestController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(){
    this.router.get(`${this.path}`,authMiddleware,this.testController.getTests);
    this.router.get(`${this.path}-passed`,this.testController.getPassedTests);
    this.router.get(`${this.path}/:id`,authMiddleware,this.testController.getTestById);
    this.router.post(`${this.path}`,[validationMiddleware(CreateTestDto,'body'),authMiddleware],this.testController.createTest);
    this.router.patch(`${this.path}/:id`, [validationMiddleware(UpdateTestDto, 'body'),authMiddleware], this.testController.updateTest);
    this.router.delete(`${this.path}/:id`,authMiddleware,this.testController.deleteTest);

  }
}

export default TestRoute;
