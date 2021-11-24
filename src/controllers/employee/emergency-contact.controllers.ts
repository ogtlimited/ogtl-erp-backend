/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateEmergencyContactDto,UpdateEmergencyContactDto } from '@/dtos/employee/emergency-contact.dto';
import { EmergencyContact } from '@/interfaces/employee-interface/emergency-contact.interface';
import EmergencyContactService from '@/services/employee/emergency-contact.service';
import EmployeeModel from '@/models/employee/employee.model';
import  EmergencyContactModel  from '@models/employee/emergency-contact.model';
import { Employee } from '@/interfaces/employee-interface/employee.interface';

class EmergencyContactController{
   public EmergencyContactService = new EmergencyContactService();
   public Employees =  EmployeeModel
   public eModel =  EmergencyContactModel

  //Return all Emergency Contacts

   public getEmergencyContacts = async  (req: Request, res: Response, next: NextFunction) => {
        try{
            const findAllEmergencyContactsData: EmergencyContact[] = await this.EmergencyContactService.findAllEmergencyContacts();
            
            res.status(200).json({data:findAllEmergencyContactsData,numEmergencyContactes:findAllEmergencyContactsData.length, message:"All EmergencyContactes"});
        }
        catch(error){
            next(error);
        }
   };


    //creates Emergency Contacts
    public CreateEmergencyContacts = async  (req: Request, res: Response, next: NextFunction) => {
        try{
            const EmergencyContactsData: CreateEmergencyContactDto = req.body;
            const createEmergencyContactsData: EmergencyContact = await this.EmergencyContactService.createEmergencyContact(EmergencyContactsData);
            res.status(201).json({ data: createEmergencyContactsData, message: 'EmergencyContacts succesfully created' });
        }
        catch(error){
         next(error);
        }
    };

    public CreateBulkEmergencyContacts = async  (req: Request, res: Response, next: NextFunction) => {
        try{
            const EmergencyContactsData = req.body;
            const newArray = []
            for (let index = 0; index < EmergencyContactsData.length; index++) {
                const findEmployee: Employee = await this.Employees.findOne({ ogid: EmergencyContactsData[index].ogid }, {_id: 1});
                newArray.push({
                    ...EmergencyContactsData[index],
                    employee_id: findEmployee._id
                })
            }
            const results = await this.eModel.insertMany(newArray)
            res.status(201).json({ data: results, message: 'Emergency contact details updated succesfully created' });
        }
        catch(error){
         next(error);
        }
    };


    // Get Emergency Details with Given Id
   public getEmergencyContactById = async  (req: Request, res: Response, next: NextFunction) => {
    try{
       const EmergencyContactsId: string = req.params.id;
       const findOneEmergencyContactsData: EmergencyContact[] = await this.EmergencyContactService.findEmergencyContactById(EmergencyContactsId);
       res.status(200).json({data:findOneEmergencyContactsData, message:"All EmergencyContacts"});
    }
    catch(error){
     next(error);
    }
};


//update EmergencyContacts
    public updateEmergencyContacts = async  (req: Request, res: Response, next: NextFunction) => {
        try{
            const EmergencyContactsId: string = req.params.id;
            const EmergencyContactsData: UpdateEmergencyContactDto = req.body;
            const updateEmergencyContactsData: EmergencyContact = await this.EmergencyContactService.updateEmergencyContact(EmergencyContactsId,EmergencyContactsData);
            res.status(200).json({data:updateEmergencyContactsData, message:"EmergencyContacts Updated"});
        }
        catch(error){
        next(error);
        }
};


 //deletes EmergencyContacts
 public deleteEmergencyContacts= async  (req: Request, res: Response, next: NextFunction) => {
    try{
        const EmergencyContactsId: string = req.params.id;
        const deleteEmergencyContactsData: EmergencyContact  = await this.EmergencyContactService.deleteEmergencyContact(EmergencyContactsId);
        res.status(200).json({data:deleteEmergencyContactsData, message:"EmergencyContacts Deleted"});
    }
    catch(error){
     next(error);
    }

};


}
export default EmergencyContactController