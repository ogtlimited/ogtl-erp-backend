/* eslint-disable prettier/prettier */

import { NextFunction, Request, Response } from 'express';
import { CreateEmployeeDto,UpdateEmployeeDto,UpdateEmployeeRoleDto, CreateMultipleEmployeeDto } from '@dtos/employee/employee.dto';
import { Employee } from '@interfaces/employee-interface/employee.interface';
import EmployeeService from '@services/employee.service';

class EmployeesController {
  public EmployeeService = new EmployeeService();

  public getEmployees = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeesData: Employee[] = await this.EmployeeService.findAllEmployee();
      res.status(200).json(employeesData);
    } catch (error) {
      next(error);
    }
  };
  public getAllEmployeesAndPaginate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeesData: Employee[] = await this.EmployeeService.getAllEmployeesAndPaginate(req.query);
      res.status(200).json(employeesData);
    } catch (error) {
      next(error);
    }
  };

  public getEmployeesByMonthStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllEmployeesData = await this.EmployeeService.findEmployeeRatio();
      res.status(200).json({ employees: findAllEmployeesData, message: 'all employees' });
    } catch (error) {
      next(error);
    }
  };

  public getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const EmployeeId: string = req.params.id;
      const findOneEmployeeData: Employee = await this.EmployeeService.findEmployeeById(EmployeeId);

      res.status(200).json({ data: findOneEmployeeData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const EmployeeData: CreateEmployeeDto = req.body;
      const createEmployeeData: Employee = await this.EmployeeService.createEmployee(EmployeeData);

      res.status(201).json({ data: createEmployeeData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
  public createMultipleEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const EmployeeData: any = req.body;
      const createEmployeeData = await this.EmployeeService.createMultipleEmployee(EmployeeData);

      res.status(201).json({ data: createEmployeeData, message: 'created' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const EmployeeId: string = req.params.id;
      const EmployeeData: UpdateEmployeeDto = req.body;
      const updateEmployeeData: Employee = await this.EmployeeService.updateEmployee(EmployeeId, EmployeeData);

      res.status(200).json({ data: updateEmployeeData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
  public updateEmployeeRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const EmployeeId: string = req.params.id;
      const EmployeeData: UpdateEmployeeRoleDto = req.body;
      console.log(EmployeeData, 'EMPLOYEE FDATA');
      const updateEmployeeData: Employee = await this.EmployeeService.updateEmployeeRole(EmployeeId, EmployeeData);

      res.status(200).json({ data: updateEmployeeData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public teamLeads = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leads = await this.EmployeeService.teamLeads();
      res.status(200).json({ data: leads});
    } catch (error) {
      next(error);
    }
  };

  // public teamMembers = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const leads = await this.EmployeeService.teamMembers(req.query.ogid);
  //     res.status(200).json({ data: leads});
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  public deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const EmployeeId: string = req.params.id;
      const deleteEmployeeData: Employee = await this.EmployeeService.deleteEmployee(EmployeeId);

      res.status(200).json({ data: deleteEmployeeData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getEmployeesHeadCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const headCount: Employee = await this.EmployeeService.getEmployeesHeadCount();
      res.status(200).json({ data: headCount, success: 'true' });
    } catch (error) {
      next(error);
    }
  }
  public getGenderCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const genderCount: Employee = await this.EmployeeService.getGenderCount();
      res.status(200).json({ data: genderCount, success: 'true' });
    } catch (error) {
      next(error);
    }
  }
  public getGenderDiversityRatio = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const genderRatio: Employee = await this.EmployeeService.getGenderDiversityRatio();
      res.status(200).json({ data: genderRatio });
    } catch (error) {
      next(error);
    }
  }
  public countEmployeesByDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeesByDepartment: Employee = await this.EmployeeService.countEmployeesByDepartment();
      res.status(200).json({ data: employeesByDepartment, success: 'true' });
    } catch (error) {
      next(error);
    }
  }
  public getEmployeesByDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {department_id} = req.params
      const employeesByDepartment: Employee = await this.EmployeeService.getEmployeesByDepartment(req.query, department_id);
      res.status(200).json({ data: employeesByDepartment});
    } catch (error) {
      next(error);
    }
  }
  public getDesignationsByDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {department_id} = req.params
      const designationsByDepartment: Employee = await this.EmployeeService.getDesignationsByDepartment(department_id);
      res.status(200).json({ data: designationsByDepartment});
    } catch (error) {
      next(error);
    }
  }
  public getGenderCountByDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {department_id} = req.params
      const genderCountByDepartment: Employee = await this.EmployeeService.getGenderCountByDepartment(department_id);
      res.status(200).json({ data: genderCountByDepartment});
    } catch (error) {
      next(error);
    }
  }
  public getEmployeesByGender = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {gender} = req.params
      const employeesByGender: Employee = await this.EmployeeService.getEmployeesByGender(gender, req.query);
      res.status(200).json({ data: employeesByGender});
    } catch (error) {
      next(error);
    }
  }
  public getDesignationsByGender = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {gender} = req.params
      const designationsByGender: Employee = await this.EmployeeService.getDesignationsGender(gender);
      res.status(200).json({ data: designationsByGender});
    } catch (error) {
      next(error);
    }
  }
}

export default EmployeesController;
