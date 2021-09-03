import { NextFunction, Request, Response } from 'express';
import { Grade } from '@/interfaces/employee-interface/grade.interface';
import { CreateGradeDto,UpdateGradeDto } from '@/dtos/employee/grade.dto';
import GradeService from '@/services/employee/grade.service';


class GradeController{
    public GradeService = new GradeService();

    //Returns all Grades
   public getGrades = async  (req: Request, res: Response, next: NextFunction) => {
    try{
        const findAllGradesData: Grade[] = await this.GradeService.findAllGrades();

        res.status(200).json({data:findAllGradesData,numGrades:findAllGradesData.length, message:"All Grades"});
    }
    catch(error){
        next(error);
    }
   };


   //creates Grade
  public CreateGrade = async  (req: Request, res: Response, next: NextFunction) => {
        try{
            const GradeData: CreateGradeDto = req.body;
            const createGradeData: Grade = await this.GradeService.createGrade(GradeData);
            res.status(201).json({ data: createGradeData, message: 'Grade successfully created' });
        }
        catch(error){
        next(error);
        }
    };

//gets one Grade with Id given
   public getGradeById = async  (req: Request, res: Response, next: NextFunction) => {
       try{
          const GradeId: string = req.params.id;
          const findOneGradeData: Grade = await this.GradeService.findGradeById(GradeId);
          res.status(200).json({data:findOneGradeData, message:"All Grades"});
       }
       catch(error){
        next(error);
       }
  };


  //update Grade
   public updateGrade = async  (req: Request, res: Response, next: NextFunction) => {
    try{
        const GradeId: string = req.params.id;
        const GradeData: UpdateGradeDto = req.body;
        const updateGradeData: Grade = await this.GradeService.updateGrade(GradeId,GradeData);
        res.status(200).json({data:updateGradeData, message:"Grade Updated"});
    }
    catch(error){
     next(error);
    }
};
   //deletes Grade
    public deleteGrade= async  (req: Request, res: Response, next: NextFunction) => {
        try{
            const GradeId: string = req.params.id;
            const deleteGradeData: Grade = await this.GradeService.deleteGrade(GradeId);
            res.status(200).json({data:deleteGradeData, message:"Grade Deleted"});
        }
        catch(error){
         next(error);
        }

};

}
export default GradeController;
