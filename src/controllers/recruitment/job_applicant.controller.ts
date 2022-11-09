/* eslint-disable prettier/prettier */
import JobApplicantService from '@services/recruitment/job_applicant.service';
import { NextFunction, Request, Response } from 'express';
import { IJobApplicant } from '@interfaces/recruitment/job_applicant.interface';
import { IJobApplicantPagination } from '@/interfaces/recruitment/job_applicant_pagination_filter.interface';
import { CreateJobApplicantDto, UpdateJobApplicantDto } from '@dtos/recruitment/job_applicant.dto';
import {IJobApplicationsTasks} from "@interfaces/recruitment/job-applications-task";
import url from 'url';
const querystring = require('querystring');
class JobApplicantController {
  public jobApplicantService = new JobApplicantService();

  //Method for returning all job applicants
  public getJobApplicants = async (req, res:Response, next:NextFunction) =>{
    try {
      const applicants: { jobApplicants: IJobApplicant[]; pagination: IJobApplicantPagination } = await this.jobApplicantService.getJobApplicants(req.query)
      res.status(200).json({data:applicants})
    }catch (error) {
      next(error)
    }
  }

  public getJobApplicantsForRepSievers = async (req, res:Response, next:NextFunction) =>{
    try {
      const applicants: { jobApplicants: IJobApplicant[]; pagination: IJobApplicantPagination } = await this.jobApplicantService.getJobApplicantsForRepSievers(req.query,req.user._id)
      // const applicants: { jobApplicants: IJobApplicant[]; pagination: IJobApplicantPagination } = await this.jobApplicantService.getJobApplicantsForRepSievers(req.query,req.user._id, req.query)
      res.status(200).json({data:applicants})
    }catch (error) {
      next(error)
    }
  }

  //Method for returning all job applicants scheduled for interview
  public getJobApplicantsScheduled = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const getJobApplicantsScheduled: IJobApplicant[] = await this.jobApplicantService.getAllJobApplicantsThatHaveBeenScheduled()
      res.status(200).json({data:getJobApplicantsScheduled, totalJobApplicants: getJobApplicantsScheduled.length, message:"All job applicants scheduled for interview"})
    }catch (error) {
      next(error)
    }
  }

  //Method for returning all job applicants
  public getJobApplicationTasks = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const jobApplicationTasks: IJobApplicationsTasks[] = await this.jobApplicantService.getJobApplicationTasks("", "")
      res.status(200).json({data:jobApplicationTasks, totalTasks: jobApplicationTasks.length})
    }catch (error) {
      next(error)
    }
  }


  //Method for returning a single job applicant
  public getJobApplicantById = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const jobApplicantId:string = req.params.id;
      const findJobApplicant:IJobApplicant = await this.jobApplicantService.findJobApplicantById(jobApplicantId);
      res.status(200).json({data:findJobApplicant, message:"Job applicant found successfully"})
    }
    catch (error) {
      next(error)
    }
  }

  //Method for creating job Applicant
  public createJobApplicant = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const jobApplicantData:CreateJobApplicantDto = req.body;
      const createJobApplicantData: IJobApplicant = await this.jobApplicantService.createJobApplicant(jobApplicantData);
      res.status(201).json({ data: createJobApplicantData, message: 'Job applicant created.' });
    }
    catch (error) {
      next(error)
    }
  }

  //Method for updating job Applicant
  public updateJobApplicant = async (req, res:Response, next:NextFunction) =>{
    try {
      const jobApplicantId:string = req.params.id;
      const jobApplicantData:UpdateJobApplicantDto = req.body;
      const updateJobApplicantData: IJobApplicant = await this.jobApplicantService.updateJobApplicant(req.user._id, jobApplicantId,jobApplicantData);
      res.status(200).json({ data: updateJobApplicantData, message: 'Job applicant updated.' });
    }
    catch (error) {
      next(error)
    }
  }

  //Method for deleting job Applicant
  public deleteJobApplicant = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jobApplicantId:string = req.params.id;
      const deleteJobApplicant = await this.jobApplicantService.deleteJobApplicant(jobApplicantId);

      res.status(200).json({ data: deleteJobApplicant, message: 'Job applicant deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default JobApplicantController;
