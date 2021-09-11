import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateWorkExperienceDto, UpdateWorkExperienceDto } from '@/dtos/employee/work-experience.dto';
import WorkExperienceController from '@/controllers/employee/work-experience.controller';
import authMiddleware from '@/middlewares/auth.middleware';

class WorkExperienceRoute implements Routes {
  public path = '/WorkExperience';
  public router = Router();
  public WorkExperienceController = new WorkExperienceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.WorkExperienceController.getWorkExperiences);
    this.router.get(`${this.path}/:id`, authMiddleware, this.WorkExperienceController.getWorkExperienceById);
    this.router.post(
      `${this.path}`,
      [validationMiddleware(CreateWorkExperienceDto, 'body'), authMiddleware],
      this.WorkExperienceController.CreateWorkExperience,
    );
    this.router.put(
      `${this.path}/:id`,
      [validationMiddleware(UpdateWorkExperienceDto, 'body', true), authMiddleware],
      this.WorkExperienceController.updateWorkExperience,
    );
    this.router.delete(`${this.path}/:id`, authMiddleware, this.WorkExperienceController.deleteWorkExperience);
  }
}

export default WorkExperienceRoute;
