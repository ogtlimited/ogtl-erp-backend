import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateGradeDto, UpdateGradeDto } from '@/dtos/employee/grade.dto';
import GradeController from '@/controllers/employee/grade.controller';





class GradeRoute implements Routes {
    public path = '/grade';
    public router = Router();
    public GradeController = new GradeController();
  
    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.GradeController.getGrades);
        this.router.get(`${this.path}/:id`, this.GradeController.getGradeById);
        this.router.post(`${this.path}`, validationMiddleware(CreateGradeDto, 'body'), this.GradeController.CreateGrade);
        this.router.put(`${this.path}/:id`, validationMiddleware(UpdateGradeDto, 'body', true), this.GradeController.updateGrade);
        this.router.delete(`${this.path}/:id`, this.GradeController.deleteGrade);
      }
    }

    export default GradeRoute;