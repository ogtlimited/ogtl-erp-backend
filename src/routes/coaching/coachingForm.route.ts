/* eslint-disable prettier/prettier */

import { CoachingFormUpdateDTO, CoachingFormUserResponseUpdateDTO } from './../../dtos/coaching/coaching.dto';
import { CoachingFormDTO } from '@/dtos/coaching/coaching.dto';
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

import authMiddleware from '@middlewares/auth.middleware';
import CoachingFormController from '@/controllers/coaching/coachingForm.controller';

class CoachingFormRoute implements Routes {
    public path = '/api/coaching-form';
    public router = Router();
    public CoachingFormController = new CoachingFormController()
  
    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`,authMiddleware, this.CoachingFormController.getCoachingForms);
        this.router.get(`${this.path}/:id`,authMiddleware, this.CoachingFormController.getCoachingFormById);
        this.router.get(`${this.path}/employee/:id`,authMiddleware, this.CoachingFormController.getEmployeeCoachingForms);
        this.router.post(`${this.path}` , authMiddleware, validationMiddleware(CoachingFormDTO, 'body'), this.CoachingFormController.CreateCoachingForm);
        this.router.put(`${this.path}/:id`,authMiddleware, validationMiddleware(CoachingFormUpdateDTO, 'body', true), this.CoachingFormController.updateCoachingForm);
        this.router.put(`${this.path}/user-response/:id`,authMiddleware, validationMiddleware(CoachingFormUserResponseUpdateDTO, 'body', true), this.CoachingFormController.updateUserResponserCoachingForm);
        this.router.delete(`${this.path}/:id`,authMiddleware, this.CoachingFormController.deleteCoachingForm);
      }
    }

    export default CoachingFormRoute;