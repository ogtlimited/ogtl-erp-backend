/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import EmployeeSalaryService from "@services/payroll/employees-salary.service";
import {CreateEmployeeSalaryDto} from "@dtos/payroll/employees-salary.dto";


class EmployeeSalaryController {

  public salaryStructureAssignmentService = new EmployeeSalaryService();
  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const salaryStructureAssignments = await this.salaryStructureAssignmentService.findAll(req.query);
      res.status(200).json({ data: salaryStructureAssignments});
    } catch (error) {
      next(error);
    }
  };

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data = await this.salaryStructureAssignmentService.findById(id);
      res.status(200).json({ data: data});
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newData = req.body;
      const createdData = await this.salaryStructureAssignmentService.create(newData);
      res.status(201).json({ data: createdData});
    } catch (error) {
      next(error);
    }
  };

  public updateEmployeeSalary = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload: any = req.body;
      console.log(req.params)
      const empId = req.params.empId
      const data = await this.salaryStructureAssignmentService.updateEmployeeSalary(payload);
      res.status(200).json({ data: data});
    } catch (error) {
      next(error);
    }
  };

}

export default EmployeeSalaryController;
