/* eslint-disable prettier/prettier */

import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import JobApplicantController from '@controllers/recruitment/job_applicant.controller';
import authMiddleware from '@middlewares/auth.middleware';
import repSieversPermissionMiddleware from '@/middlewares/rep_siever.middleware';

class JobApplicantForRepSieversRoute implements Routes {
  public path =  '/api/job-sievers';
  public router = Router();
  public jobApplicantController = new JobApplicantController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/job-applicants`, [authMiddleware,repSieversPermissionMiddleware()], this.jobApplicantController.getJobApplicantsForRepSievers);
  }
}

export default JobApplicantForRepSieversRoute;
