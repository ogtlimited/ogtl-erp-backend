/* eslint-disable prettier/prettier */
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import JobOpeningController from '@controllers/recruitment/job_opening.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateJobOpeningDto, UpdateJobOpeningDto } from '@dtos/recruitment/job_opening.dto';

class JobOpeningRoute implements Routes{
  public path ="/jobOpening";
  public router = Router();
  public jobOpeningController = new JobOpeningController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(){
    this.router.get(`${this.path}`,this.jobOpeningController.getJobOpenings);
    this.router.get(`${this.path}/:id`,this.jobOpeningController.getJobOpeningById);
    this.router.post(`${this.path}`,validationMiddleware(CreateJobOpeningDto,'body'),this.jobOpeningController.createJobOpening);
    this.router.patch(`${this.path}/:id`, validationMiddleware(UpdateJobOpeningDto, 'body'), this.jobOpeningController.updateJobOpening);
    this.router.delete(`${this.path}/:id`,this.jobOpeningController.deleteJobOpening);

  }
}

export default JobOpeningRoute;
