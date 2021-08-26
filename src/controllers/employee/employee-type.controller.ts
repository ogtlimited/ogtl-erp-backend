import { NextFunction, Request, Response } from 'express';
import { CreateEmployeeTypeDto,UpdateEmployeeTypeDto } from '@/dtos/employee/employee-type.dto';
import { EmployeeType } from '@/interfaces/employee-interface/employee-type.interface';
import EmployeeTypeService from '@/services/employee/employee-type.service';


class EmployeeTypeController{
  public EmployeeTypeService = new EmployeeTypeService();

  //Returns all EmployeeType
  public getEmployeeType = async  (req: Request, res: Response, next: NextFunction) => {
    try{
        const findAllEmployeeTypeData: EmployeeType[] = await this.EmployeeTypeService.findAllEmployeeTypes();
         
        res.status(200).json({data:findAllEmployeeTypeData,numEmployeeTypes:findAllEmployeeTypeData.length, message:"All EmployeeType"});
    }
    catch(error){
        next(error);
    }
   };

   //creates EmployeeType
  public CreateEmployeeType = async  (req: Request, res: Response, next: NextFunction) => {
    try{
        const EmployeeTypeData: CreateEmployeeTypeDto = req.body;
        const createEmployeeTypeData: EmployeeType = await this.EmployeeTypeService.createEmployeeType(EmployeeTypeData);
        res.status(201).json({ data: createEmployeeTypeData, message: 'EmployeeType succesfully created' });
    }
    catch(error){
     next(error);
    }
   };

   //gets one EmployeeType with Id given
   public getEmployeeTypeById = async  (req: Request, res: Response, next: NextFunction) => {
    try{
       const EmployeeTypeId: string = req.params.id;
       const findOneEmployeeTypeData: EmployeeType = await this.EmployeeTypeService.findEmployeeTypeById(EmployeeTypeId);
       res.status(200).json({data:findOneEmployeeTypeData, message:"All EmployeeTypees"});
    }
    catch(error){
     next(error);
    }
};


//update EmployeeType
public updateEmployeeType = async  (req: Request, res: Response, next: NextFunction) => {
 try{
     const EmployeeTypeId: string = req.params.id;
     const EmployeeTypeData: UpdateEmployeeTypeDto = req.body;
     const updateEmployeeTypeData: EmployeeType = await this.EmployeeTypeService.updateEmployeeType(EmployeeTypeId,EmployeeTypeData);
     res.status(200).json({data:updateEmployeeTypeData, message:"EmployeeType Updated"});
 }
 catch(error){
  next(error);
 }
};

 //deletes EmployeeType
 public deleteEmployeeType= async  (req: Request, res: Response, next: NextFunction) => {
    try{
        const EmployeeTypeId: string = req.params.id;
        const deleteEmployeeTypeData: EmployeeType = await this.EmployeeTypeService.deleteEmployeeType(EmployeeTypeId);
        res.status(200).json({data:deleteEmployeeTypeData, message:"EmployeeType Deleted"});
    }
    catch(error){
     next(error);
    }

};



}

export default EmployeeTypeController;