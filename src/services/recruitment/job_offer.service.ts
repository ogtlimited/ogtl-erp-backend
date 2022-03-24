/* eslint-disable prettier/prettier */
import jobOfferModel from '@models/recruitment/job_offer.model';
import { IJobOffer } from '@interfaces/recruitment/job_offer.interface';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { CreateJobOfferDto, UpdateJobOfferDto } from '@dtos/recruitment/job_offer.dto';

class JobOfferService {
  public jobOffer = jobOfferModel;

  //Method for finding all job offers
  public async findAllJobOffers(): Promise<IJobOffer[]>{
    return this.jobOffer.find().populate('job_applicant_id designation_id');
  }

  //Method for finding all job offers where status is accepted
  public async findAllAcceptedJobOffers() : Promise<IJobOffer[]>{
    return this.jobOffer.find({status: "Accepted"}).populate('job_applicant_id designation_id');
  }

  //Method for finding a single job offer
  public async findJobOfferById(jobOfferId: string): Promise<IJobOffer>{
    //check if no Job offer id is empty
    if(isEmpty(jobOfferId)) throw new HttpException(400,`Job offer with Id:${jobOfferId}, does not exist`);
    //find Job offer using the id provided
    const findJobOffer:IJobOffer = await this.jobOffer.findOne({_id:jobOfferId}).populate('job_applicant_id designation_id');
    //throw error if Job offer does not exist
    if(!findJobOffer) throw new HttpException(409,`Job offer with Id:${jobOfferId}, does not exist`);
    //return Job offer
    return findJobOffer;
  }

  //Method for creating job offer
  public async createJobOffer(jobOfferData: CreateJobOfferDto): Promise<IJobOffer>{
    //check if no job offer data is empty
    if (isEmpty(jobOfferData)) throw new HttpException(400, "Bad request");

    // return created job offer
    return await this.jobOffer.create(jobOfferData);

  }

  //Method for updating job offer
  public async updateJobOffer(jobOfferId: string,jobOfferData: UpdateJobOfferDto):Promise<IJobOffer>{
    //check if no job offer data is empty
    if (isEmpty(jobOfferData)) throw new HttpException(400, "Bad request");
    if(jobOfferData._id){
      //find job offer using the id provided
      const findJobOffer: IJobOffer = await this.jobOffer.findOne({ _id: jobOfferData._id  });
      if(findJobOffer && findJobOffer._id != jobOfferId) throw new HttpException(409, `${jobOfferData._id } already exist`);
    }
    //find job offer using the id provided and update it
    const updateJobOfferById:IJobOffer = await this.jobOffer.findByIdAndUpdate(jobOfferId,jobOfferData ,{new:true})
    if (!updateJobOfferById) throw new HttpException(409, "Job offer could not be updated");
    // return updated job offer
    return updateJobOfferById;
  }

  //Method for deleting job offer
  public async deleteJobOffer(jobOfferId: string):Promise<IJobOffer>{
    //find job offer using the id provided and delete
    const deleteJobOfferById: IJobOffer = await this.jobOffer.findByIdAndDelete(jobOfferId);
    if(!deleteJobOfferById) throw new HttpException(409, `Job offer with Id:${jobOfferId}, does not exist`);
    return deleteJobOfferById;
  }
}
export default JobOfferService;
