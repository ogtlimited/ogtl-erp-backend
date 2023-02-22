/* eslint-disable prettier/prettier */
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import JobOpeningController from '@controllers/recruitment/job_opening.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateJobOpeningDto, UpdateJobOpeningDto, CreateDefaultJobOpeningDto, UpdateDefaultJobOpeningDto } from '@dtos/recruitment/job_opening.dto';
import authMiddleware from '@middlewares/auth.middleware';

class JobOpeningRoute implements Routes{
  public path ="/api/jobOpening";
  public router = Router();
  public jobOpeningController = new JobOpeningController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(){
    this.router.get(`${this.path}`,this.jobOpeningController.getJobOpenings);
    this.router.get(`${this.path}/open-and-closed`,this.jobOpeningController.getAllJobs);
    this.router.get(`${this.path}/defaultJobs`,this.jobOpeningController.getDefaultJobOpenings);
    this.router.get(`${this.path}/:id`,this.jobOpeningController.getJobOpeningById);
    this.router.post(`${this.path}`,[validationMiddleware(CreateJobOpeningDto,'body'),authMiddleware],this.jobOpeningController.createJobOpening);
    this.router.post(`${this.path}/defaultJobs`,[validationMiddleware(CreateDefaultJobOpeningDto,'body'),authMiddleware],this.jobOpeningController.createDefaultJob);
    this.router.patch(`${this.path}/:id`, [validationMiddleware(UpdateJobOpeningDto, 'body'),authMiddleware], this.jobOpeningController.updateJobOpening);
    this.router.patch(`${this.path}/defaultJobs/:id`, [validationMiddleware(UpdateDefaultJobOpeningDto, 'body'),authMiddleware], this.jobOpeningController.updateDefaultJobOpening);
    this.router.delete(`${this.path}/:id`,authMiddleware,this.jobOpeningController.deleteJobOpening);
    this.router.delete(`${this.path}/defaultJobs/:id`,authMiddleware,this.jobOpeningController.deleteDefaultJobOpening);

  }
}

export default JobOpeningRoute;
