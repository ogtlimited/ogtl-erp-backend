import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateSalaryDetailsDto, UpdateSalaryDetailsDto } from '@/dtos/employee/salary-details.dto';
import SalaryDetailsController from '@/controllers/employee/salary-details.controller';


class SalaryDetailsRoute implements Routes {
    public path = '/SalaryDetails';
    public router = Router();
    public SalaryDetailsController = new SalaryDetailsController();
  
    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.SalaryDetailsController.getSalaryDetails);
        this.router.get(`${this.path}/:id`, this.SalaryDetailsController.getSalaryDetailsById);
        this.router.post(`${this.path}`, validationMiddleware(CreateSalaryDetailsDto, 'body'), this.SalaryDetailsController.CreateSalaryDetails);
        this.router.put(`${this.path}/:id`, validationMiddleware(UpdateSalaryDetailsDto, 'body', true), this.SalaryDetailsController.updateSalaryDetails);
        this.router.delete(`${this.path}/:id`, this.SalaryDetailsController.deleteSalaryDetails);
      }
    }

    export default SalaryDetailsRoute;