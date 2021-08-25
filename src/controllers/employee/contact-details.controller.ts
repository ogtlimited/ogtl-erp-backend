import { NextFunction, Request, Response } from 'express';
import { CreateContactDetailsDto,UpdateContactDetailsDto } from '@/dtos/employee/contact-details.dto';
import { ContactDetail } from '@/interfaces/employee-interface/contact-details.interface';
import ContactDetailsService from '@/services/employee/contact-details.service';


class ContactDetailsController{
    public ContactDetailsService = new ContactDetailsService();

    //Returns all Contact Details

    public getContactDetails = async  (req: Request, res: Response, next: NextFunction) => {
        try{
            const findAllContactDetailsData: ContactDetail[] = await this.ContactDetailsService.findAllContactDetails();
             
            res.status(200).json({data:findAllContactDetailsData,numContactDetailes:findAllContactDetailsData.length, message:"All ContactDetailes"});
        }
        catch(error){
            next(error);
        }
       };



    //creates ContactDetails
   public CreateContactDetails = async  (req: Request, res: Response, next: NextFunction) => {
    try{
        const ContactDetailsData: CreateContactDetailsDto = req.body;
        const createContactDetailsData: ContactDetail = await this.ContactDetailsService.createContactDetails(ContactDetailsData);
        res.status(201).json({ data: createContactDetailsData, message: 'ContactDetails succesfully created' });
    }
    catch(error){
     next(error);
    }
   };


   // Get Contact Details with Given Id
   public getContactDetailsById = async  (req: Request, res: Response, next: NextFunction) => {
    try{
       const ContactDetailsId: string = req.params.id;
       const findOneContactDetailsData: ContactDetail = await this.ContactDetailsService.findContactDetailsById(ContactDetailsId);
       res.status(200).json({data:findOneContactDetailsData, message:"All ContactDetails"});
    }
    catch(error){
     next(error);
    }
};


//update ContactDetails
public updateContactDetails = async  (req: Request, res: Response, next: NextFunction) => {
    try{
        const ContactDetailsId: string = req.params.id;
        const ContactDetailsData: UpdateContactDetailsDto = req.body;
        const updateContactDetailsData: ContactDetail = await this.ContactDetailsService.updateContactDetails(ContactDetailsId,ContactDetailsData);
        res.status(200).json({data:updateContactDetailsData, message:"ContactDetails Updated"});
    }
    catch(error){
     next(error);
    }
};
   //deletes ContactDetails
    public deleteContactDetails= async  (req: Request, res: Response, next: NextFunction) => {
        try{
            const ContactDetailsId: string = req.params.id;
            const deleteContactDetailsData: ContactDetail  = await this.ContactDetailsService.deleteContactDetails(ContactDetailsId);
            res.status(200).json({data:deleteContactDetailsData, message:"ContactDetails Deleted"});
        }
        catch(error){
         next(error);
        }
   
};




    

}

export default ContactDetailsController;