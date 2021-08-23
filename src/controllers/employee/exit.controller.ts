import { NextFunction, Request, Response } from 'express';
import { CreateExitDto } from '@/dtos/employee/exit.dto';
import { Exit } from '@/interfaces/employee-interface/exit.interface';
import ExitService from '@/services/employee/exit.service';


class ExitController{
    public ExitService = new ExitService();

    //Returns all Exits
   public getExits = async  (req: Request, res: Response, next: NextFunction) => {
    try{
        const findAllExitsData: Exit[] = await this.ExitService.findAllExit();
         
        res.status(200).json({data:findAllExitsData,numExits:findAllExitsData.length, message:"All Exits"});
    }
    catch(error){
        next(error);
    }
   };


   //creates Exit
  public CreateExit = async  (req: Request, res: Response, next: NextFunction) => {
        try{
            const ExitData: CreateExitDto = req.body;
            const createExitData: Exit = await this.ExitService.createExit(ExitData);
            res.status(201).json({ data: createExitData, message: 'Exit succesfully created' });
        }
        catch(error){
        next(error);
        }
    };

//gets one Exit with Id given
   public getExitById = async  (req: Request, res: Response, next: NextFunction) => {
       try{
          const ExitId: string = req.params.id;
          const findOneExitData: Exit = await this.ExitService.findExitById(ExitId);
          res.status(200).json({data:findOneExitData, message:"All Exits"});
       }
       catch(error){
        next(error);
       }
  };


  //update Exit
   public updateExit = async  (req: Request, res: Response, next: NextFunction) => {
    try{
        const ExitId: string = req.params.id;
        const ExitData: CreateExitDto = req.body;
        const updateExitData: Exit = await this.ExitService.updateExit(ExitId,ExitData);
        res.status(200).json({data:updateExitData, message:"Exit Updated"});
    }
    catch(error){
     next(error);
    }
};
   //deletes Exit
    public deleteExit= async  (req: Request, res: Response, next: NextFunction) => {
        try{
            const ExitId: string = req.params.id;
            const deleteExitData: Exit = await this.ExitService.deleteExit(ExitId);
            res.status(200).json({data:deleteExitData, message:"Exit Deleted"});
        }
        catch(error){
         next(error);
        }
   
};

}
export default ExitController;