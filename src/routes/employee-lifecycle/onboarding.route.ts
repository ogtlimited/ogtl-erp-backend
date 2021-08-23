/* eslint-disable prettier/prettier */
import { CreateOnBoardingDto } from '../../dtos/employee-lifecycle/onboarding.dto';
import OnBoardingController from '@/controllers/employee-lifecycle/onboarding.controller';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class OnBoardingRoute implements Routes {
    public path = '/api/onboarding';
    public router = Router();
    public onBoardingController = new OnBoardingController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.onBoardingController.findAll);
        this.router.get(`${this.path}/:id`, this.onBoardingController.findById);
        this.router.post(`${this.path}`, validationMiddleware(CreateOnBoardingDto, 'body'), this.onBoardingController.create);
    }
  }
  export default OnBoardingRoute;