/* eslint-disable prettier/prettier */
import { CreateSalaryStructureAssignmentDto } from '../../dtos/payroll/salary-structure-assignment.dto';
import SalaryStructureAssignmentController from '@/controllers/payroll/salaryStructureAssignment.controller';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';

class SalaryStructureAssignmentRoute implements Routes {
    public path = '/api/salary-structure-assignment';
    public router = Router();
    public salaryStructureAssignmentController = new SalaryStructureAssignmentController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, [], this.salaryStructureAssignmentController.findAll);
        this.router.get(`${this.path}/:id`,[], this.salaryStructureAssignmentController.findById);
        this.router.post(`${this.path}`,[validationMiddleware(CreateSalaryStructureAssignmentDto, 'body')], this.salaryStructureAssignmentController.create);
        // this.router.patch(`${this.path}`, validationMiddleware(DTO, 'body'), this.salaryStructureAssignmentController.createIncentive);
    }
  }
  export default SalaryStructureAssignmentRoute;