/* eslint-disable prettier/prettier */
import recruitmentResultModel from '@/models/recruitment/recruitment_result.model';
import jobApplicantModel from '@/models/recruitment/job_applicant.model';
import RecruitmentResultFiltrationService from './recruitment_result_pagination.service';
import { IRecruitmentResult } from '@/interfaces/recruitment/recruitment_result.interface';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { CreateRecruitmentResultDto, UpdateRecruitmentResultDto } from '@/dtos/recruitment/recruitment_result.dto';

class RecruitmentResultServices {
  public recruitmentResult = recruitmentResultModel;
  public jobApplicantModel = jobApplicantModel;
  public recruitmentResultFiltrationService = new RecruitmentResultFiltrationService()

  //Method for finding all recruitmentResults
  public async findAllRecruitmentResults(query: any): Promise<IRecruitmentResult[]>{
    let matchBy = {}
    const recruitment_results = this.recruitmentResultFiltrationService.getAllRecruitmentResultHelperMethod(matchBy, query, this.recruitmentResult)
    return recruitment_results;
    // return this.recruitmentResult.find(query).populate('job_applicant_id hr_user ');
    // return  this.recruitmentResult.find(query).populate({path:'job_applicant_id hr',populate:{path:'job_opening_id'}})
  }

  //Method for finding all recruitmentResults where applicants have undergone soft skills and passed
  public async findAllPassedRecruitmentResults(): Promise<IRecruitmentResult[]>{
    return this.recruitmentResult.find({status:"Assessment Completed"}).populate('job_applicant_id hr_user');
  }

  //Method for finding a single recruitmentResult
  public async findRecruitmentResultById(recruitmentResultId: string): Promise<IRecruitmentResult>{
    if(isEmpty(recruitmentResultId)) throw new HttpException(400,`recruitmentResult with Id:${recruitmentResultId}, does not exist`);
    const findrecruitmentResult:IRecruitmentResult = await this.recruitmentResult.findOne({_id:recruitmentResultId}).populate('job_applicant_id hr_user');
    if(!findrecruitmentResult) throw new HttpException(409,`recruitmentResult with Id:${recruitmentResultId}, does not exist`);
    return findrecruitmentResult;
  }

  //Method for creating recruitmentResult
  public async createRecruitmentResult(recruitmentResultData: CreateRecruitmentResultDto): Promise<IRecruitmentResult>{
    if (isEmpty(recruitmentResultData)) throw new HttpException(400, "Bad request");
    return await this.recruitmentResult.create(recruitmentResultData);
  }

  public async uploadBulkRecruitmentResults(RecruitmentData: any, user): Promise<any> {
    if (isEmpty(RecruitmentData)) throw new HttpException(400, "No details provided");
    const recruitmentRecords = [];
    for (let i = 0; i < RecruitmentData.length; i++) {
      const record = RecruitmentData[i]
      const jobApplicant = await this.jobApplicantModel.findOne({ email_address: record.email_address })
      if (!jobApplicant) throw new HttpException(404, `${record.email_address} Record not found on Job Application Table`);
      record.status = record.status ? record.status : "Invitation Sent"
      record.job_applicant_id = jobApplicant._id
      record.hr_user = user?._id
      const recordExist = await this.recruitmentResult.findOne({ job_applicant_id: jobApplicant._id })
      if (!recordExist) {
        recruitmentRecords.push(record)
      }
    }
    const createRecruitmentResult = await this.recruitmentResult.insertMany(recruitmentRecords);
    return createRecruitmentResult;
  }

  //Method for updating recruitmentResult
  public async updateRecruitmentResult(recruitmentResultId: string,recruitmentResultData: UpdateRecruitmentResultDto):Promise<IRecruitmentResult>{
    if (isEmpty(recruitmentResultData)) throw new HttpException(400, "Bad request");
    if(recruitmentResultData._id){
      const findRecruitmentResult: IRecruitmentResult = await this.recruitmentResult.findOne({ _id: recruitmentResultData._id }).populate('job_applicant_id hr_user ');
      if(findRecruitmentResult && findRecruitmentResult._id != recruitmentResultId) throw new HttpException(409, `Already exist`);
    }
    const updateRecruitmentResultById:IRecruitmentResult = await this.recruitmentResult.findByIdAndUpdate(recruitmentResultId,recruitmentResultData ,{new:true})
    if (!updateRecruitmentResultById) throw new HttpException(409, "recruitmentResult could not be updated");
    return updateRecruitmentResultById;
  }

  //Method for deleting recruitmentResult
  public async deleteRecruitmentResult(recruitmentResultId: string):Promise<IRecruitmentResult>{
    const deleteRecruitmentResultById: IRecruitmentResult = await this.recruitmentResult.findByIdAndDelete(recruitmentResultId);
    if(!deleteRecruitmentResultById) throw new HttpException(409, `recruitmentResult with Id:${recruitmentResultId}, does not exist`);
    return deleteRecruitmentResultById;
  }
}

export default RecruitmentResultServices;
