/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { Education } from '@/interfaces/employee-interface/education.interface';
import { CreateEducationDto, UpdateEducationDto } from '@/dtos/employee/education.dto';
import EducationService from '@/services/employee/education.service';

class EducationController {
  public EducationService = new EducationService();

  //Returns all Education Details

  public getEducation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllEducationsData: Education[] = await this.EducationService.findAllEducation();

      res.status(200).json({ data: findAllEducationsData, numEducation: findAllEducationsData.length, message: 'All Education' });
    } catch (error) {
      next(error);
    }
  };

  //creates Education
  public CreateEducation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const EducationData: CreateEducationDto = req.body;
      const createEducationData: Education = await this.EducationService.createEducation(EducationData);
      res.status(201).json({ data: createEducationData, message: 'Education succesfully created' });
    } catch (error) {
      next(error);
    }
  };

  // Get Educations with Given Id
  public getEducationsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const EducationsId: string = req.params.id;
      const findOneEducationsData: Education[] = await this.EducationService.findEducationById(EducationsId);
      res.status(200).json({ data: findOneEducationsData, message: 'All Educations' });
    } catch (error) {
      next(error);
    }
  };

  //update Education
  public updateEducation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const EducationsId: string = req.params.id;
      const EducationsData: UpdateEducationDto = req.body;
      const updateEducationsData: Education = await this.EducationService.updateEducation(EducationsId, EducationsData);
      res.status(200).json({ data: updateEducationsData, message: 'Educations Updated' });
    } catch (error) {
      next(error);
    }
  };
  //deletes Educations
  public deleteEducation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const EducationsId: string = req.params.id;
      const deleteEducationsData: Education = await this.EducationService.deleteEducation(EducationsId);
      res.status(200).json({ data: deleteEducationsData, message: 'Educations Deleted' });
    } catch (error) {
      next(error);
    }
  };
}
export default EducationController;
