/* eslint-disable prettier/prettier */
import jobOfferModel from '@models/recruitment/job_offer.model';
import { IJobOffer } from '@interfaces/recruitment/job_offer.interface';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { CreateJobOfferDto, UpdateJobOfferDto } from '@dtos/recruitment/job_offer.dto';
import EmployeeModel from '@models/employee/employee.model';
import { ObjectId } from 'mongodb';
import { sendEmail } from '@utils/sendEmail';
import { acceptedOfferMessage } from '@utils/message';

class JobOfferService {
  public jobOffer = jobOfferModel;
  public employee = EmployeeModel

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
    const res= await this.sendEmails()
    if(jobOfferData.status === "Accepted"){
      sendEmail(acceptedOfferMessage.subject, acceptedOfferMessage.message,[...res])
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

  private async fetchStakeHoldersEmail ():Promise<{emails: any[]}>{
      // const designatedEmails = await this.employee.find({designation: {$in:[new ObjectId('6139def7ae37c158b0f4fe57'), new ObjectId('614a133561f66f5d64d857ba'), new ObjectId('621c9480ff376d085072010a')]}},
      //   {
      //     company_email:1,
      //     _id:0
      //   })
    const designatedEmails = await this.employee.find({designation: {$in:[new ObjectId('6195674bb261e472f07d7380'), new ObjectId('61956751b261e472f07d73fd'), new ObjectId('61956752b261e472f07d7417'), new ObjectId('61956753b261e472f07d742f')]}},
        {
          company_email:1,
          _id:0
        })

      return {
        emails: designatedEmails
      }
  }

  private async sendEmails ():Promise<any[]>{
    const result =  await this.fetchStakeHoldersEmail()
    const newResult= result.emails.map((result) => result.company_email)
    newResult.push('it_helpdesk@outsourceglobal.com')
    return newResult;
  }
}
export default JobOfferService;
