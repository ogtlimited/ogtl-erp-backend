/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateEmployeeDto,UpdateEmployeeDto } from '@dtos/employee/employee.dto';
import { Employee } from '@interfaces/employee-interface/employee.interface';
import EmployeeService from '@services/employee.service';

class EmployeesController {
  public EmployeeService = new EmployeeService();

  public getEmployees = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllEmployeesData: Employee[] = await this.EmployeeService.findAllEmployee();

      res.status(200).json({ data: findAllEmployeesData, message: 'findAll' });
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

  public deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const EmployeeId: string = req.params.id;
      const deleteEmployeeData: Employee = await this.EmployeeService.deleteEmployee(EmployeeId);

      res.status(200).json({ data: deleteEmployeeData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default EmployeesController;
