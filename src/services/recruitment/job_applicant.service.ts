/* eslint-disable prettier/prettier */
import jobApplicantModel from '@models/recruitment/job_applicant.model';
import { IJobApplicant } from '@interfaces/recruitment/job_applicant.interface';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { CreateJobApplicantDto } from '@dtos/recruitment/job_applicant.dto';

class JobApplicantService {
  public jobApplicant = jobApplicantModel;

  //Method for finding all job applicants
  public async findAllJobApplicants(): Promise<IJobApplicant[]>{
    return this.jobApplicant.find();
  }

  //Method for finding a single job applicant
  public async findJobApplicantById(jobApplicantId: string): Promise<IJobApplicant>{
    //check if no Job applicant id is empty
    if(isEmpty(jobApplicantId)) throw new HttpException(400,`Job applicant with Id:${jobApplicantId}, does not exist`);
    //find Job applicant using the id provided
    const findJobApplicant:IJobApplicant = await this.jobApplicant.findOne({_id:jobApplicantId});
    //throw error if Job applicant does not exist
    if(!findJobApplicant) throw new HttpException(409,`Job applicant with Id:${jobApplicantId}, does not exist`);
    //return Job applicant
    return findJobApplicant;
  }

  //Method for creating job applicant
  public async createJobApplicant(jobApplicantData: CreateJobApplicantDto): Promise<IJobApplicant>{
    //check if no job applicant data is empty
    if (isEmpty(jobApplicantData)) throw new HttpException(400, "Bad request");
    //find job Applicant using the job applicant email provided
    const jobApplicant: IJobApplicant = await this.jobApplicant.findOne({ email_address: jobApplicantData.email_address });
    //throw error if job Applicant does exist
    if (jobApplicant) throw new HttpException(409, `${jobApplicant.email_address} already exists`);
    // return created job Applicant
    return await this.jobApplicant.create(jobApplicantData);
  }

  //Method for updating job Applicant
  public async updateJobApplicant(jobApplicantId: string,jobApplicantData: CreateJobApplicantDto):Promise<IJobApplicant>{
    //check if no job Applicant data is empty
    if (isEmpty(jobApplicantData)) throw new HttpException(400, "Bad request");
    if(jobApplicantData.email_address){
      //find job Applicant using the job_applicant_id provided
      const findJobApplicant: IJobApplicant = await this.jobApplicant.findOne({ email_address: jobApplicantData.email_address });
      if(findJobApplicant && findJobApplicant._id != jobApplicantId) throw new HttpException(409, `${jobApplicantData.email_address } already exist`);
    }
    //find job Applicant using the id provided and update it
    const updateJobApplicantById:IJobApplicant = await this.jobApplicant.findByIdAndUpdate(jobApplicantId,{jobApplicantData})
    if (!updateJobApplicantById) throw new HttpException(409, "Job Applicant could not be updated");
    // return updated job Applicant
    return updateJobApplicantById;
  }

  //Method for deleting job Applicant
  public async deleteJobApplicant(jobApplicantId: string):Promise<IJobApplicant>{
    //find job Applicant using the id provided and delete
    const deleteJobApplicantById: IJobApplicant = await this.jobApplicant.findByIdAndDelete(jobApplicantId);
    if(!deleteJobApplicantById) throw new HttpException(409, `Job Applicant with Id:${jobApplicantId}, does not exist`);
    return deleteJobApplicantById;
  }
}

export default JobApplicantService
