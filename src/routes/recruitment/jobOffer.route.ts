import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import JobOfferController from '@controllers/recruitment/job_offer.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateJobOfferDto } from '@dtos/recruitment/job_offer.dto';

class JobOfferRoute implements  Routes{
  public path = "/jobOffer";
  public router = Router();
  public jobOfferController = new JobOfferController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(){
    this.router.get(`${this.path}`,this.jobOfferController.getJobOffers);
    this.router.get(`${this.path}/:id`,this.jobOfferController.getJobOfferById);
    this.router.post(`${this.path}`,validationMiddleware(CreateJobOfferDto,'body'),this.jobOfferController.createJobOffer);
    this.router.patch(`${this.path}/:id`, validationMiddleware(CreateJobOfferDto, 'body'), this.jobOfferController.updateJobOffer);
    this.router.delete(`${this.path}/:id`,this.jobOfferController.deleteJobOffer);

  }
}

export default  JobOfferRoute;
