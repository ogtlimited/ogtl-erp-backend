import { NextFunction, Request, Response } from 'express';
import { CreateSalaryDetailsDto } from '@/dtos/employee/salary-details.dto';
import { SalaryDetail } from '@/interfaces/employee-interface/salary-details.interface';
import SalaryDetailsService from '@/services/employee/salary-details.service';


class SalaryDetailsController{
    public SalaryDetailsService = new SalaryDetailsService();

    //Returns all Salary Details

    public getSalaryDetails = async  (req: Request, res: Response, next: NextFunction) => {
        try{
            const findAllSalaryDetailsData: SalaryDetail[] = await this.SalaryDetailsService.findAllSalaryDetails();
             
            res.status(200).json({data:findAllSalaryDetailsData,numSalaryDetailes:findAllSalaryDetailsData.length, message:"All SalaryDetailes"});
        }
        catch(error){
            next(error);
        }
       };



    //creates SalaryDetails
   public CreateSalaryDetails = async  (req: Request, res: Response, next: NextFunction) => {
    try{
        const SalaryDetailsData: CreateSalaryDetailsDto = req.body;
        const createSalaryDetailsData: SalaryDetail = await this.SalaryDetailsService.createSalaryDetails(SalaryDetailsData);
        res.status(201).json({ data: createSalaryDetailsData, message: 'SalaryDetails succesfully created' });
    }
    catch(error){
     next(error);
    }
   };


   // Get Salary Details with Given Id
   public getSalaryDetailsById = async  (req: Request, res: Response, next: NextFunction) => {
    try{
       const SalaryDetailsId: string = req.params.id;
       const findOneSalaryDetailsData: SalaryDetail = await this.SalaryDetailsService.findSalaryDetailsById(SalaryDetailsId);
       res.status(200).json({data:findOneSalaryDetailsData, message:"All SalaryDetails"});
    }
    catch(error){
     next(error);
    }
};


//update SalaryDetails
public updateSalaryDetails = async  (req: Request, res: Response, next: NextFunction) => {
    try{
        const SalaryDetailsId: string = req.params.id;
        const SalaryDetailsData: CreateSalaryDetailsDto = req.body;
        const updateSalaryDetailsData: SalaryDetail = await this.SalaryDetailsService.updateSalaryDetails(SalaryDetailsId,SalaryDetailsData);
        res.status(200).json({data:updateSalaryDetailsData, message:"SalaryDetails Updated"});
    }
    catch(error){
     next(error);
    }
};
   //deletes SalaryDetails
    public deleteSalaryDetails= async  (req: Request, res: Response, next: NextFunction) => {
        try{
            const SalaryDetailsId: string = req.params.id;
            const deleteSalaryDetailsData: SalaryDetail  = await this.SalaryDetailsService.deleteSalaryDetails(SalaryDetailsId);
            res.status(200).json({data:deleteSalaryDetailsData, message:"SalaryDetails Deleted"});
        }
        catch(error){
         next(error);
        }
   
};




    

}

export default SalaryDetailsController;