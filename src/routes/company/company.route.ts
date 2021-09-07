/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateCompanyDto, UpdateCompanyDto } from '@/dtos/company/company.dto';
import CompanyController from '@/controllers/company/company.controller';
import authMiddleware from '@middlewares/auth.middleware';

class CompanyRoute implements Routes {
    public path = '/Company';
    public router = Router();
    public CompanyController = new CompanyController();
  
    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`,authMiddleware, this.CompanyController.getCompanies);
        this.router.get(`${this.path}/:id`,authMiddleware, this.CompanyController.getCompanyById);
        this.router.post(`${this.path}` , authMiddleware, validationMiddleware(CreateCompanyDto, 'body'), this.CompanyController.CreateCompany);
        this.router.put(`${this.path}/:id`,authMiddleware, validationMiddleware(UpdateCompanyDto, 'body', true), this.CompanyController.updateCompany);
        this.router.delete(`${this.path}/:id`,authMiddleware, this.CompanyController.deleteCompany);
      }
    }

    export default CompanyRoute;