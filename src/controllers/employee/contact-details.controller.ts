/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateContactDetailsDto,UpdateContactDetailsDto } from '@/dtos/employee/contact-details.dto';
import { ContactDetail } from '@/interfaces/employee-interface/contact-details.interface';
import ContactDetailsService from '@/services/employee/contact-details.service';
import EmployeeService from '@/services/employee.service';
import  EmployeeModel  from '@models/employee/employee.model';
import { Employee } from '@/interfaces/employee-interface/employee.interface';
import  ContactDetailsModel  from '@models/employee/contact-details.model';


class ContactDetailsController{
    public ContactDetailsService = new ContactDetailsService();
    public Employees =  EmployeeModel
    public cModel =    ContactDetailsModel

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

   public CreateBulkContactDetails = async  (req: Request, res: Response, next: NextFunction) => {
    try{
        const ContactDetailsData = req.body;
        const newArray = []
        for (let index = 0; index < ContactDetailsData.length; index++) {
            const findEmployee: Employee = await this.Employees.findOne({ company_email: ContactDetailsData[index].company_email }, {_id: 1});
            newArray.push({
                ...ContactDetailsData[index],
                employee_id: findEmployee._id
            })
        }
        const results = await this.cModel.insertMany(newArray)
        res.status(201).json({ data: results, message: 'ContactDetails succesfully created' });
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