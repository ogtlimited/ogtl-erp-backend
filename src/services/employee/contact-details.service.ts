/* eslint-disable prettier/prettier */
import { CreateContactDetailsDto, UpdateContactDetailsDto } from '@/dtos/employee/contact-details.dto';
import { ContactDetail } from '@/interfaces/employee-interface/contact-details.interface';
import ContactDetailsModel from '@models/employee/contact-details.model';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';


class ContactDetailsService{
    public ContactDetails = ContactDetailsModel;

    /**
         *Returns all contact Details
        */

    public async findAllContactDetails(): Promise<ContactDetail[]> {
      return this.ContactDetails.find();

    }

     /**
     *Returns the contact details with the Id given
     */

     public async findContactDetailsById(ContactDetailsId:string) : Promise<ContactDetail>{
       //Check if Id is empty
       if (isEmpty(ContactDetailsId)) throw new HttpException(400, "No Id provided");
       return this.ContactDetails.findOne({ employee_id: ContactDetailsId });
     }


     /**
      * Creates new Contact details
      */
    public async createContactDetails(ContactDetailData:CreateContactDetailsDto) : Promise<ContactDetail>{

        if (isEmpty(ContactDetailData)) throw new HttpException(400, "No data provided");

        //check if employee already provided contact details
        const findContactDetails: ContactDetail = await this.ContactDetails.findOne({employee_id: ContactDetailData.employee_id});

        if(findContactDetails) {
          const updateContactDetailsData: ContactDetail = await this.ContactDetails.findByIdAndUpdate(ContactDetailData._id,ContactDetailData, {new:true})
          if(!updateContactDetailsData) throw new HttpException(409, "details could not be updated");
          return updateContactDetailsData;
        }
        else{
          return await this.ContactDetails.create(ContactDetailData);
        }


    }


    /**
     * Updates ContactDetails
     */

    public async updateContactDetails(ContactDetailsId:string,ContactDetailData:UpdateContactDetailsDto):Promise<ContactDetail>{
        if (isEmpty(ContactDetailData)) throw new HttpException(400, "No data provided");

        if(ContactDetailData.employee_id){
            const findContactDetails: ContactDetail = await this.ContactDetails.findOne({Id:ContactDetailData.employee_id});
            if(findContactDetails && findContactDetails._id != ContactDetailsId) throw new HttpException(409, `Employee ${ContactDetailData.employee_id} Contact details dont exist`);
        }

        const updateContactDetailsData: ContactDetail = await this.ContactDetails.findByIdAndUpdate(ContactDetailsId,{ContactDetailData})
        if(!updateContactDetailsData) throw new HttpException(409, "details could not be updated");
        return updateContactDetailsData;
    }



    public async deleteContactDetails(ContactDetailsId:string) : Promise<ContactDetail>{

          const deleteContactDetailsById: ContactDetail = await this.ContactDetails.findByIdAndDelete(ContactDetailsId);
          if(!deleteContactDetailsById) throw new HttpException(409, "Details don't exist");
          return deleteContactDetailsById;



    }




}

export default ContactDetailsService;
