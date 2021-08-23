import { NextFunction, Request, Response } from 'express';
import { CreatePersonalDetailsDto } from '@/dtos/employee/personal-details.dto';
import { PersonalDetail } from '@/interfaces/employee-interface/personal-details.interface';
import PersonalDetailsService from '@/services/employee/personal-details.service';


class PersonalDetailsController{
    public PersonalDetailsService = new PersonalDetailsService();

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
        const PersonalDetailsData: CreatePersonalDetailsDto = req.body;
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