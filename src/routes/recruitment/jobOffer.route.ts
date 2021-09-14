import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import JobOfferController from '@controllers/recruitment/job_offer.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateJobOfferDto, UpdateJobOfferDto } from '@dtos/recruitment/job_offer.dto';
import authMiddleware from '@middlewares/auth.middleware';

class JobOfferRoute implements Routes {
  public path = '/api/jobOffer';
  public router = Router();
  public jobOfferController = new JobOfferController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.jobOfferController.getJobOffers);
    this.router.get(`${this.path}/:id`, authMiddleware, this.jobOfferController.getJobOfferById);
    this.router.post(`${this.path}`, [validationMiddleware(CreateJobOfferDto, 'body'), authMiddleware], this.jobOfferController.createJobOffer);
    this.router.patch(`${this.path}/:id`, [validationMiddleware(UpdateJobOfferDto, 'body'), authMiddleware], this.jobOfferController.updateJobOffer);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.jobOfferController.deleteJobOffer);
  }
}

export default JobOfferRoute;
