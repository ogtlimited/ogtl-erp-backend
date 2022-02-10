/* eslint-disable prettier/prettier */
import JobOpeningService from '@services/recruitment/job_opening.service';
import { NextFunction, Request, Response } from 'express';
import { IDefaultJobOpening, IJobOpening } from '@interfaces/recruitment/job_opening.interface';
import { CreateJobOpeningDto, UpdateJobOpeningDto } from '@dtos/recruitment/job_opening.dto';

class JobOpeningController {
  public jobOpeningService = new JobOpeningService();

  //Method for returning all job openings
  public getJobOpenings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllJobOpenings: IJobOpening[] = await this.jobOpeningService.findAllJobOpenings();
      res.status(200).json({ data: findAllJobOpenings, totalJobOpenings: findAllJobOpenings.length, message: 'All job openings' });
    } catch (error) {
      next(error);
    }
  };
  //Method for returning all job openings
  public getDefaultJobOpenings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllJobOpenings: IDefaultJobOpening[] = await this.jobOpeningService.findAllDefaultJobOpenings();
      res.status(200).json({ data: findAllJobOpenings, totalJobOpenings: findAllJobOpenings.length, message: 'All job openings' });
    } catch (error) {
      next(error);
    }
  };

  //Method for returning a single job opening
  public getJobOpeningById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobOpeningId: string = req.params.id;
      const findJobOpening: IJobOpening = await this.jobOpeningService.findJobOpeningById(jobOpeningId);
      res.status(200).json({ data: findJobOpening, message: 'Job opening found successfully' });
    } catch (error) {
      next(error);
    }
  };

  //Method for creating job opening
  public createJobOpening = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobOpeningData: CreateJobOpeningDto = req.body;
      const createJobOpeningData: IJobOpening = await this.jobOpeningService.createJobOpening(jobOpeningData);
      res.status(201).json({ data: createJobOpeningData, message: 'Job opening created.' });
    } catch (error) {
      next(error);
    }
  };

  //Method for updating job opening
  public updateJobOpening = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobOpeningId: string = req.params.id;
      const jobOpeningData: UpdateJobOpeningDto = req.body;
      const updateJobOpeningData: IJobOpening = await this.jobOpeningService.updateJobOpening(jobOpeningId, jobOpeningData);
      res.status(200).json({ data: updateJobOpeningData, message: 'Job opening updated.' });
    } catch (error) {
      next(error);
    }
  };

  //Method for deleting job opening
  public deleteJobOpening = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobOpeningId: string = req.params.id;
      const deleteJobOpening = await this.jobOpeningService.deleteJobOpening(jobOpeningId);

      res.status(200).json({ data: deleteJobOpening, message: 'Job opening deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default JobOpeningController;
