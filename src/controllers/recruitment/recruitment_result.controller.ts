/* eslint-disable prettier/prettier */
import RecruitmentResultService from '@/services/recruitment/recruitment_result.services';
import { NextFunction, Request, Response } from 'express';
import { IRecruitmentResult } from '@/interfaces/recruitment/recruitment_result.interface';
import { CreateRecruitmentResultDto, UpdateRecruitmentResultDto } from '@/dtos/recruitment/recruitment_result.dto';
import JobApplicantService from '@/services/recruitment/job_applicant.service';
import { sendEmail } from '@/utils/sendEmail';
import { rejectionMessage } from '@/utils/message';

class RecruitmentResultController {
  public recruitmentResultService = new RecruitmentResultService();
  public jobApplicantService = new JobApplicantService();

  //Method for returning all Test
  public getRecruitmentResults = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const allRecruitmentResults: IRecruitmentResult[] = await this.recruitmentResultService.findAllRecruitmentResults(req.query);
      res.status(200).json({ data: allRecruitmentResults, totalRecruitmentResults: allRecruitmentResults.length})
    }catch (error) {
      next(error)
    }
  }
  //Method for returning all Test
  public getPassedRecruitmentResults = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const allPassedRecruitmentResults: IRecruitmentResult[] = await this.recruitmentResultService.findAllPassedRecruitmentResults();
      res.status(200).json({ data: allPassedRecruitmentResults, totalTest: allPassedRecruitmentResults.length})
    }catch (error) {
      next(error)
    }
  }

  //Method for returning a single test
  public getRecruitmentResultById = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const testId:string = req.params.id;
      const recruitmentResults: IRecruitmentResult = await this.recruitmentResultService.findRecruitmentResultById(testId);
      res.status(200).json({ data: recruitmentResults})
    }
    catch (error) {
      next(error)
    }
  }

  //Method for creating Test
  public createRecruitmentResult = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const recruitmentResultData:CreateRecruitmentResultDto = req.body;
      const recruitmentResult: IRecruitmentResult = await this.recruitmentResultService.createRecruitmentResult(recruitmentResultData);
      const jobApplicantData = await this.jobApplicantService.findJobApplicantById(recruitmentResultData.job_applicant_id)
      if (recruitmentResultData.interview_status == "Not Qualified"){
        sendEmail(rejectionMessage.subject, rejectionMessage.message,[jobApplicantData.email_address])
      }
      res.status(201).json({ data: recruitmentResult });
    }
    catch (error) {
      next(error)
    }
  }

  //Method for updating test
  public updateRecruitmentResult = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const recruitmentResultId: string = req.params.id;
      const recruitmentResultIdData:UpdateRecruitmentResultDto = req.body;
      const updatedRecruitmentResultIdData: IRecruitmentResult = await this.recruitmentResultService.updateRecruitmentResult(recruitmentResultId, recruitmentResultIdData);
      res.status(200).json({ data: updatedRecruitmentResultIdData });
    }
    catch (error) {
      next(error)
    }
  }

  //Method for deleting test
  public deleteRecruitmentResult = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const recruitmentResultId: string = req.params.id;
      const deletedRecruitmentResult = await this.recruitmentResultService.deleteRecruitmentResult(recruitmentResultId);

      res.status(200).json({ data: deletedRecruitmentResult });
    } catch (error) {
      next(error);
    }
  };

  public uploadBulkRecruitmentResults = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const recruitmentResults: IRecruitmentResult = await this.recruitmentResultService.uploadBulkRecruitmentResults(req.body);
      res.status(200).json({ data: recruitmentResults, message: 'Recruitment results successfully added' });
    }
    catch (error) {
      next(error)
    }
  }
}

export default RecruitmentResultController;
