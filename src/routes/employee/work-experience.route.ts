import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateWorkExperienceDto, UpdateWorkExperienceDto } from '@/dtos/employee/work-experience.dto';
import WorkExperienceController from '@/controllers/employee/work-experience.controller';


class WorkExperienceRoute implements Routes {
    public path = '/WorkExperience';
    public router = Router();
    public WorkExperienceController = new WorkExperienceController();
  
    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.WorkExperienceController.getWorkExperiences);
        this.router.get(`${this.path}/:id`, this.WorkExperienceController.getWorkExperienceById);
        this.router.post(`${this.path}`, validationMiddleware(CreateWorkExperienceDto, 'body'), this.WorkExperienceController.CreateWorkExperience);
        this.router.put(`${this.path}/:id`, validationMiddleware(UpdateWorkExperienceDto, 'body', true), this.WorkExperienceController.updateWorkExperience);
        this.router.delete(`${this.path}/:id`, this.WorkExperienceController.deleteWorkExperience);
      }
    }

    export default WorkExperienceRoute;