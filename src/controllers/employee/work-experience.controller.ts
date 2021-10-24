/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateWorkExperienceDto,UpdateWorkExperienceDto } from '@/dtos/employee/work-experience.dto';
import { WorkExperience } from '@/interfaces/employee-interface/work-experience.interface';
import WorkExperienceService from '@/services/employee/work-experience.service';

class WorkExperienceController{
    public WorkExperienceService = new WorkExperienceService();

    //Returns all WorkExperiences
   public getWorkExperiences = async  (req: Request, res: Response, next: NextFunction) => {
    try{
        const findAllWorkExperiencesData: WorkExperience[] = await this.WorkExperienceService.findAllWorkExperience();
         
        res.status(200).json({data:findAllWorkExperiencesData,numWorkExperiences:findAllWorkExperiencesData.length, message:"All WorkExperiences"});
    }
    catch(error){
        next(error);
    }
   };


   //creates WorkExperience
  public CreateWorkExperience = async  (req: Request, res: Response, next: NextFunction) => {
        try{
            const WorkExperienceData: CreateWorkExperienceDto = req.body;
            const createWorkExperienceData: WorkExperience = await this.WorkExperienceService.createWorkExperience(WorkExperienceData);
            res.status(201).json({ data: createWorkExperienceData, message: 'WorkExperience succesfully created' });
        }
        catch(error){
        next(error);
        }
    };

//gets one WorkExperience with Id given
   public getWorkExperienceById = async  (req: Request, res: Response, next: NextFunction) => {
       try{
          const WorkExperienceId: string = req.params.id;
          const findOneWorkExperienceData = await this.WorkExperienceService.findWorkExperienceById(WorkExperienceId);
          res.status(200).json({data:findOneWorkExperienceData, message:"All WorkExperiences"});
       }
       catch(error){
        next(error);
       }
  };


  //update WorkExperience
   public updateWorkExperience = async  (req: Request, res: Response, next: NextFunction) => {
    try{
        const WorkExperienceId: string = req.params.id;
        const WorkExperienceData: UpdateWorkExperienceDto= req.body;
        const updateWorkExperienceData: WorkExperience = await this.WorkExperienceService.updateWorkExperience(WorkExperienceId,WorkExperienceData);
        res.status(200).json({data:updateWorkExperienceData, message:"WorkExperience Updated"});
    }
    catch(error){
     next(error);
    }
};
   //deletes WorkExperience
    public deleteWorkExperience= async  (req: Request, res: Response, next: NextFunction) => {
        try{
            const WorkExperienceId: string = req.params.id;
            const deleteWorkExperienceData: WorkExperience = await this.WorkExperienceService.deleteWorkExperience(WorkExperienceId);
            res.status(200).json({data:deleteWorkExperienceData, message:"WorkExperience Deleted"});
        }
        catch(error){
         next(error);
        }
   
};

}
export default WorkExperienceController;