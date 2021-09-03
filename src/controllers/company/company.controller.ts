/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateCompanyDto, UpdateCompanyDto } from '@/dtos/company/company.dto';
import { Company } from '@/interfaces/company/company.interface';
import CompanyService from '@/services/company/company.service';

class CompanyController {
  public CompanyService = new CompanyService();

  //Returns all Companies
  public getCompanies = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCompaniesData: Company[] = await this.CompanyService.findAllCompanies();

      res.status(200).json({ data: findAllCompaniesData, numCompanies: findAllCompaniesData.length, message: 'All Companies' });
    } catch (error) {
      next(error);
    }
  };

  //creates Company
  public CreateCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CompanyData: CreateCompanyDto = req.body;
      const createCompanyData: Company = await this.CompanyService.createCompany(CompanyData);
      res.status(201).json({ data: createCompanyData, message: 'Company succesfully created' });
    } catch (error) {
      next(error);
    }
  };

  //gets one Company with Id given
  public getCompanyById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CompanyId: string = req.params.id;
      const findOneCompanyData: Company = await this.CompanyService.findCompanyById(CompanyId);
      res.status(200).json({ data: findOneCompanyData, message: 'All Companies' });
    } catch (error) {
      next(error);
    }
  };

  //update Company
  public updateCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CompanyId: string = req.params.id;
      const CompanyData: UpdateCompanyDto = req.body;
      const updateCompanyData: Company = await this.CompanyService.updateCompany(CompanyId, CompanyData);
      res.status(200).json({ data: updateCompanyData, message: 'Company Updated' });
    } catch (error) {
      next(error);
    }
  };
  //deletes Company
  public deleteCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CompanyId: string = req.params.id;
      const deleteCompanyData: Company = await this.CompanyService.deleteCompany(CompanyId);
      res.status(200).json({ data: deleteCompanyData, message: 'Company Deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default CompanyController;
