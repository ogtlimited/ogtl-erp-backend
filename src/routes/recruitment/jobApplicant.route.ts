/* eslint-disable prettier/prettier */

import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import JobApplicantController from '@controllers/recruitment/job_applicant.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateJobApplicantDto, UpdateJobApplicantDto } from '@dtos/recruitment/job_applicant.dto';
import authMiddleware from '@middlewares/auth.middleware';

class JobApplicantRoute implements Routes {
  public path = '/api/jobApplicant';
  public router = Router();
  public jobApplicantController = new JobApplicantController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.jobApplicantController.getJobApplicants);
    this.router.get(`${this.path}/scheduled`, this.jobApplicantController.getJobApplicantsScheduled);
    this.router.get(`${this.path}/tasks`, this.jobApplicantController.getJobApplicationTasks);
    this.router.get(`${this.path}/:id`,  this.jobApplicantController.getJobApplicantById);
    this.router.post(
      `${this.path}`,
      [validationMiddleware(CreateJobApplicantDto, 'body')],
      this.jobApplicantController.createJobApplicant,
    );
    this.router.patch(
      `${this.path}/:id`,
      [authMiddleware, validationMiddleware(UpdateJobApplicantDto, 'body')],
      this.jobApplicantController.updateJobApplicant,
    );
    this.router.delete(`${this.path}/:id`, authMiddleware, this.jobApplicantController.deleteJobApplicant);
  }
}

export default JobApplicantRoute;
