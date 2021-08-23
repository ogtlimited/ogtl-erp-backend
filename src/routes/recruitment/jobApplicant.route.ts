import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import JobApplicantController from '@controllers/recruitment/job_applicant.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateJobApplicantDto } from '@dtos/recruitment/job_applicant.dto';

class JobApplicantRoute implements Routes{
  public path = "/jobApplicant";
  public router = Router();
  public jobApplicantController = new JobApplicantController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(){
    this.router.get(`${this.path}`,this.jobApplicantController.getJobApplicants);
    this.router.get(`${this.path}/:id`,this.jobApplicantController.getJobApplicantById);
    this.router.post(`${this.path}`,validationMiddleware(CreateJobApplicantDto,'body'),this.jobApplicantController.createJobApplicant);
    this.router.patch(`${this.path}/:id`, validationMiddleware(CreateJobApplicantDto, 'body'), this.jobApplicantController.updateJobApplicant);
    this.router.delete(`${this.path}/:id`,this.jobApplicantController.deleteJobApplicant);

  }
}

export default JobApplicantRoute;