/* eslint-disable prettier/prettier */
import { CreateContactDetailsDto,UpdateContactDetailsDto } from "@/dtos/employee/contact-details.dto";
import { ContactDetail } from "@/interfaces/employee-interface/contact-details.interface";
import ContactDetailsModel from "@models/employee/contact-details.model"
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';


class ContactDetailsService{
    public ContactDetails = ContactDetailsModel;

    /**
         *Returns all contact Details
        */

    public async findAllContactDetails(): Promise<ContactDetail[]> {
        const ContactDetails: ContactDetail[] = await this.ContactDetails.find();
        return ContactDetails;

    }

     /**
     *Returns the contact details with the Id given
     */


     public async findContactDetailsById(ContactDetailsId:string) : Promise<ContactDetail>{
       //Check if Id is empty
       if (isEmpty(ContactDetailsId)) throw new HttpException(400, "No Id provided");
       //find Contact Details with Id given

       const findContactDetails: ContactDetail = await this.ContactDetails.findOne({_id:ContactDetailsId});

       if(!findContactDetails) throw new HttpException(409, "Details with that Id dont exist");

       return findContactDetails
     }


     /**
      * Creates new Contact details
      */
    public async createContactDetails(ContactDetailData:CreateContactDetailsDto) : Promise<ContactDetail>{

        if (isEmpty(ContactDetailData)) throw new HttpException(400, "No data provided");

        //check if employee already provided contact details
        const findContactDetails: ContactDetail = await this.ContactDetails.findOne({id: ContactDetailData.employee_id});

        if(findContactDetails) throw new HttpException(409, `Employee ${ContactDetailData.employee_id} already provided details`);

        const createContactDetailsData = await this.ContactDetails.create(ContactDetailData);

        return createContactDetailsData;
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
