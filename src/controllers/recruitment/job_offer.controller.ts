/* eslint-disable prettier/prettier */
import JobOfferService from '@services/recruitment/job_offer.service';
import { NextFunction, Request, Response } from 'express';
import { IJobOffer } from '@interfaces/recruitment/job_offer.interface';
import { CreateJobOfferDto } from '@dtos/recruitment/job_offer.dto';

class JobOfferController {
  public jobOfferService = new JobOfferService();

  //Method for returning all job offers
  public getJobOffers = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const findAllJobOffers: IJobOffer[] = await this.jobOfferService.findAllJobOffers();
      res.status(200).json({data:findAllJobOffers, totalJobOffers: findAllJobOffers.length, message:"All job offers"})
    }catch (error) {
      next(error)
    }
  }

  //Method for returning a single job offer
  public getJobOfferById = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const jobOfferId:string = req.body.id;
      const findJobOffer:IJobOffer = await this.jobOfferService.findJobOfferById(jobOfferId);
      res.status(200).json({data:findJobOffer, message:"Job offer found successfully"})
    }
    catch (error) {
      next(error)
    }
  }

  //Method for creating job offer
  public createJobOffer = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const jobOfferData:CreateJobOfferDto = req.body;
      const createJobOfferData: IJobOffer = await this.jobOfferService.createJobOffer(jobOfferData);
      res.status(201).json({ data: createJobOfferData, message: 'Job offer created.' });
    }
    catch (error) {
      next(error)
    }
  }

  //Method for updating job offer
  public updateJobOffer = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const jobOfferId:string = req.body.id;
      const jobOfferData:CreateJobOfferDto = req.body;
      const updateJobOfferData: IJobOffer = await this.jobOfferService.updateJobOffer(jobOfferId,jobOfferData);
      res.status(200).json({ data: updateJobOfferData, message: 'Job offer updated.' });
    }
    catch (error) {
      next(error)
    }
  }

  //Method for deleting job offer
  public deleteJobOffer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobOfferId:string = req.body.id;
      const deleteJobOffer = await this.jobOfferService.deleteJobOffer(jobOfferId);

      res.status(200).json({ data: deleteJobOffer, message: 'Job offer deleted' });
    } catch (error) {
      next(error);
    }
  };

}

export default JobOfferController;
