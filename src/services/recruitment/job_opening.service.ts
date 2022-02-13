/* eslint-disable prettier/prettier */
import jobOpeningModel, { defaultJobOpeningModel } from '@models/recruitment/job_opening.model';
import { IJobOpening, IDefaultJobOpening } from '@interfaces/recruitment/job_opening.interface';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { CreateJobOpeningDto,CreateDefaultJobOpeningDto, UpdateJobOpeningDto } from '@dtos/recruitment/job_opening.dto';
import jobs from './job.json'
class JobOpeningService {
  public jobOpening = jobOpeningModel;
  public defaultJobOpeningModel = defaultJobOpeningModel;
  // constructor() {
  //   const job = jobs.map(j => ({job_title: j}))
  //   defaultJobOpeningModel.insertMany(job)
  // }
 
  //Method for finding all job openings
  public async findAllJobOpenings(): Promise<IJobOpening[]>{
    return this.jobOpening.find().populate("designation_id project_id location");
  }
  //Method for finding all default job openings
  public async findAllDefaultJobOpenings(): Promise<IDefaultJobOpening[]>{
    return this.defaultJobOpeningModel.find()
  }

  //Method for finding a single job opening
  public async findJobOpeningById(jobOpeningId: string): Promise<IJobOpening>{
    //check if no Job opening id is empty
    if(isEmpty(jobOpeningId)) throw new HttpException(400,`Job opening with Id:${jobOpeningId}, does not exist`);
    //find Job opening using the id provided
    const findJobOpening:IJobOpening = await this.jobOpening.findOne({_id:jobOpeningId}).populate("designation_id project_id location");
    //throw error if Job opening does not exist
    if(!findJobOpening) throw new HttpException(409,`Job opening with Id:${jobOpeningId}, does not exist`);
    //return Job opening
    return findJobOpening;
  }

  //Method for creating job opening
  public async createJobOpening(jobOpeningData: CreateJobOpeningDto): Promise<IJobOpening>{
    //check if no job opening data is empty
    if (isEmpty(jobOpeningData)) throw new HttpException(400, "Bad request");
    // return created job opening
    return await this.jobOpening.create(jobOpeningData);
  }

  //Method for creating job opening
  public async createDefaultJobOpening(jobOpeningData: CreateDefaultJobOpeningDto): Promise<IDefaultJobOpening>{
    //check if no job opening data is empty
    if (isEmpty(jobOpeningData)) throw new HttpException(400, "Bad request");
    // return created job opening
    return await this.defaultJobOpeningModel.create(jobOpeningData);
  }

  //Method for updating job opening
  public async updateJobOpening(jobOpeningId: string,jobOpeningData: UpdateJobOpeningDto):Promise<IJobOpening>{
    //check if no job opening data is empty
    if (isEmpty(jobOpeningData)) throw new HttpException(400, "Bad request");
    if(jobOpeningData._id){
      //find job opening using the employee id provided
      const findJobOpening: IJobOpening = await this.jobOpening.findOne({ _id: jobOpeningData._id }).populate("designation_id project_id location");
      if(findJobOpening && findJobOpening._id != jobOpeningId) throw new HttpException(409, `${jobOpeningData._id } already exists`);
    }
    //find job opening using the id provided and update it
    const updateJobOpeningById:IJobOpening = await this.jobOpening.findByIdAndUpdate(jobOpeningId,jobOpeningData,{new:true})
    if (!updateJobOpeningById) throw new HttpException(409, "Job opening could not be updated");
    // return updated job opening
    return updateJobOpeningById;
  }

  //Method for deleting job opening
  public async deleteJobOpening(jobOpeningId: string):Promise<IJobOpening>{
    //find job opening using the id provided and delete
    const deleteJobOpeningById: IJobOpening = await this.jobOpening.findByIdAndDelete(jobOpeningId);
    if(!deleteJobOpeningById) throw new HttpException(409, `Job opening with Id:${jobOpeningId}, does not exist`);
    return deleteJobOpeningById;
  }
}

export default JobOpeningService;
