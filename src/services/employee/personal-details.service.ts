/* eslint-disable prettier/prettier */
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { PersonalDetail } from '@/interfaces/employee-interface/personal-details.interface';
import { CreatePersonalDetailsDto, UpdatePersonalDetailsDto } from '@/dtos/employee/personal-details.dto';
import PersonalDetailsModel from '@models/employee/personal-details.model';


class PersonalDetailsService{
   public PersonalDetails = PersonalDetailsModel;

   /**
         *Returns all Personal Details
        */

   public async findAllPersonalDetails(): Promise<PersonalDetail[]> {
     return this.PersonalDetails.find();

   }

  /**
   *Returns the Personal details with the Id given
   */


  public async findPersonalDetailsById(PersonalDetailsId:string) : Promise<PersonalDetail>{
    //Check if Id is empty
    if (isEmpty(PersonalDetailsId)) throw new HttpException(400, "No Id provided");
    return this.PersonalDetails.findOne({ employee_id: PersonalDetailsId });
  }



  /**
      * Creates new Personal details
      */
  public async createPersonalDetails(PersonalDetailData:CreatePersonalDetailsDto):Promise<PersonalDetail>{
    if(isEmpty(PersonalDetailData)) throw new HttpException(400,"No data provided");
    const findPersonalDetails:PersonalDetail = await this.PersonalDetails.findOne({employee_id:PersonalDetailData.employee_id})
    if(findPersonalDetails){
      const updatePersonalDetailsData:PersonalDetail = await this.PersonalDetails.findByIdAndUpdate(PersonalDetailData._id,PersonalDetailData,{new:true})
      if(!updatePersonalDetailsData) throw new HttpException(409, "details could not be updated");
      return updatePersonalDetailsData;
    }else{
      return await this.PersonalDetails.create(PersonalDetailData)
    }

  }

    /**
     * Updates PersonalDetails
     */

     public async updatePersonalDetails(PersonalDetailsId:string,PersonalDetailData:UpdatePersonalDetailsDto):Promise<PersonalDetail>{
        if (isEmpty(PersonalDetailData)) throw new HttpException(400, "No data provided");

        if(PersonalDetailData.employee_id){
            const findPersonalDetails: PersonalDetail = await this.PersonalDetails.findOne({Id:PersonalDetailData.employee_id});
            if(findPersonalDetails && findPersonalDetails._id != PersonalDetailsId) throw new HttpException(409, `Employee ${PersonalDetailData.employee_id} Personal details dont exist`);
        }

        const updatePersonalDetailsData: PersonalDetail = await this.PersonalDetails.findByIdAndUpdate(PersonalDetailsId,{PersonalDetailData})
        if(!updatePersonalDetailsData) throw new HttpException(409, "details could not be updated");
        return updatePersonalDetailsData;
    }



    public async deletePersonalDetails(PersonalDetailsId:string) : Promise<PersonalDetail>{

          const deletePersonalDetailsById: PersonalDetail = await this.PersonalDetails.findByIdAndDelete(PersonalDetailsId);
          if(!deletePersonalDetailsById) throw new HttpException(409, "Details don't exist");
          return deletePersonalDetailsById;



    }



}

export default PersonalDetailsService
