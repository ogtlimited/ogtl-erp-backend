/* eslint-disable prettier/prettier */
import { CreateOnBoardingDto } from '../../dtos/employee-lifecycle/onboarding.dto';
import OnBoardingController from '@/controllers/employee-lifecycle/onboarding.controller';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware'


class OnBoardingRoute implements Routes {
    public path = '/api/onboarding';
    public router = Router();
    public onBoardingController = new OnBoardingController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, [authMiddleware], this.onBoardingController.findAll);
        this.router.get(`${this.path}/:id`, [authMiddleware], this.onBoardingController.findById);
        this.router.post(`${this.path}`, [authMiddleware, validationMiddleware(CreateOnBoardingDto, 'body')], this.onBoardingController.create);
    }
  }
  export default OnBoardingRoute;