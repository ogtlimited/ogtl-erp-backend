/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreatePersonalDetailsDto,UpdatePersonalDetailsDto } from '@/dtos/employee/personal-details.dto';
import { PersonalDetail } from '@/interfaces/employee-interface/personal-details.interface';
import PersonalDetailsService from '@/services/employee/personal-details.service';
import EmployeeModel from '@/models/employee/employee.model';
import { Employee } from '@/interfaces/employee-interface/employee.interface';
import PersonalDetailsModel  from '@models/employee/personal-details.model';


class PersonalDetailsController{
    public PersonalDetailsService = new PersonalDetailsService();
    public Employees =  EmployeeModel
    public pModel =  PersonalDetailsModel
    //Returns all Personal Details

    public getPersonalDetails = async  (req: Request, res: Response, next: NextFunction) => {
        try{
            const findAllPersonalDetailsData: PersonalDetail[] = await this.PersonalDetailsService.findAllPersonalDetails();
             
            res.status(200).json({data:findAllPersonalDetailsData,numPersonalDetailes:findAllPersonalDetailsData.length, message:"All PersonalDetailes"});
        }
        catch(error){
            next(error);
        }
       };



    //creates PersonalDetails
   public CreatePersonalDetails = async  (req: Request, res: Response, next: NextFunction) => {
    try{
        const PersonalDetailsData: CreatePersonalDetailsDto = req.body;
        const createPersonalDetailsData: PersonalDetail = await this.PersonalDetailsService.createPersonalDetails(PersonalDetailsData);
        res.status(201).json({ data: createPersonalDetailsData, message: 'PersonalDetails succesfully created' });
    }
    catch(error){
     next(error);
    }
   };

   public CreateBulkPersonalDetails = async  (req: Request, res: Response, next: NextFunction) => {
    try{
        const personalDetailsData = req.body;
        // console.log(personalDetailsData)
        const newArray = []
        for (let index = 0; index < personalDetailsData.length; index++) {
            const findEmployee: Employee = await this.Employees.findOne({ ogid: personalDetailsData[index].ogid }, {_id: 1});
            newArray.push({
                ...personalDetailsData[index],
                employee_id: findEmployee._id,
                means_of_identification: personalDetailsData[index]?.means_of_identification === '' ? null : personalDetailsData[index]?.means_of_identification,
                marital_status: personalDetailsData[index]?.marital_status === '' ? null : personalDetailsData[index]?.marital_status,
                blood_group: personalDetailsData[index]?.blood_group === '' ? null : personalDetailsData[index]?.blood_group,
                valid_upto: personalDetailsData[index]?.valid_upto === '' ? null : new Date(personalDetailsData[index]?.valid_upto),
                date_of_issue: personalDetailsData[index]?.date_of_issue === '' ? null : new Date(personalDetailsData[index]?.date_of_issue),
            })
        }
        console.log(newArray)
        const results = await this.pModel.insertMany(newArray)
        res.status(201).json({ data: results, message: 'ContactDetails succesfully created' });
    }
    catch(error){
     next(error);
    }
   };


   // Get Personal Details with Given Id
   public getPersonalDetailsById = async  (req: Request, res: Response, next: NextFunction) => {
    try{
       const PersonalDetailsId: string = req.params.id;
       const findOnePersonalDetailsData: PersonalDetail = await this.PersonalDetailsService.findPersonalDetailsById(PersonalDetailsId);
       res.status(200).json({data:findOnePersonalDetailsData, message:"All PersonalDetails"});
    }
    catch(error){
     next(error);
    }
};


//update PersonalDetails
public updatePersonalDetails = async  (req: Request, res: Response, next: NextFunction) => {
    try{
        const PersonalDetailsId: string = req.params.id;
        const PersonalDetailsData: UpdatePersonalDetailsDto  = req.body;
        const updatePersonalDetailsData: PersonalDetail = await this.PersonalDetailsService.updatePersonalDetails(PersonalDetailsId,PersonalDetailsData);
        res.status(200).json({data:updatePersonalDetailsData, message:"PersonalDetails Updated"});
    }
    catch(error){
     next(error);
    }
};
   //deletes PersonalDetails
    public deletePersonalDetails= async  (req: Request, res: Response, next: NextFunction) => {
        try{
            const PersonalDetailsId: string = req.params.id;
            const deletePersonalDetailsData: PersonalDetail  = await this.PersonalDetailsService.deletePersonalDetails(PersonalDetailsId);
            res.status(200).json({data:deletePersonalDetailsData, message:"PersonalDetails Deleted"});
        }
        catch(error){
         next(error);
        }
   
};





    

}

export default PersonalDetailsController;