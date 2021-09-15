/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateTerminationDto, UpdateTerminationDto } from '@dtos/employee-lifecycle/termination.dto';
import { ITermination } from '@/interfaces/employee-lifecycle/termination.interface';
import TerminationService from '@/services/employee-lifecycle/termination.service';


class TerminationController {
  public TerminationService = new TerminationService();
  public findAllTerminations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.TerminationService.findAllTerminations();
      res.status(200).json({ data: data});
    } catch (error) {
      next(error);
    }
  };

  public findTerminationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data = await this.TerminationService.findTerminationById(id);
      res.status(200).json({ data: data});
    } catch (error) {
      next(error);
    }
  };

  public createTermination = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newData: CreateTerminationDto = req.body;
      const createdData: ITermination = await this.TerminationService.createTermination(newData); 
      res.status(201).json({ data: createdData ,message: "Termination Succesful"});
    } catch (error) {
      
      next(error);
    }
  };

  public updateTermination = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const TerminationId: string = req.params.id;
        const TerminationData: UpdateTerminationDto = req.body;
        const updateTerminationData: ITermination = await this.TerminationService.updateTermination(TerminationId,TerminationData);
        res.status(200).json({data:updateTerminationData, message:"Termination Updated"});
    }
    catch(error){
        next(error)
    }

 }

 public deleteTermination = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const TerminationId: string = req.params.id;
        const deleteTerminationData: ITermination = await this.TerminationService.deleteTermination(TerminationId);
        res.status(200).json({data:deleteTerminationData, message:"Termination Deleted"});

    }
    catch(error){
        next(error)
    }

 }
}

export default TerminationController;
