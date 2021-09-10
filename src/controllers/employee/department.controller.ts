/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateDepartmentDto, UpdateDepartmentDto } from '@/dtos/employee/department.dto';
import { IDepartment } from '@/interfaces/employee-interface/department.interface';
import DepartmentService from '@/services/employee/department.service';

class DepartmentController {
  public DepartmentService = new DepartmentService();

  //Returns all Departments
  public getDepartments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllDepartmentsData: IDepartment[] = await this.DepartmentService.findAllDepartments();

      res.status(200).json({ data: findAllDepartmentsData, numDepartmentes: findAllDepartmentsData.length, message: 'All Departments' });
    } catch (error) {
      next(error);
    }
  };

  //creates Department
  public CreateDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const DepartmentData: CreateDepartmentDto = req.body;
      const createDepartmentData: IDepartment = await this.DepartmentService.createDepartment(DepartmentData);
      res.status(201).json({ data: createDepartmentData, message: 'Department succesfully created' });
    } catch (error) {
      next(error);
    }
  };

  //gets one Department with Id given
  public getDepartmentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const DepartmentId: string = req.params.id;
      const findOneDepartmentData: IDepartment = await this.DepartmentService.findDepartmentById(DepartmentId);
      res.status(200).json({ data: findOneDepartmentData, message: 'All Departmentes' });
    } catch (error) {
      next(error);
    }
  };

  //update Department
  public updateDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const DepartmentId: string = req.params.id;
      const DepartmentData: UpdateDepartmentDto = req.body;
      const updateDepartmentData: IDepartment = await this.DepartmentService.updateDepartment(DepartmentId, DepartmentData);
      res.status(200).json({ data: updateDepartmentData, message: 'Department Updated' });
    } catch (error) {
      next(error);
    }
  };
  //deletes Department
  public deleteDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const DepartmentId: string = req.params.id;
      const deleteDepartmentData: IDepartment = await this.DepartmentService.deleteDepartment(DepartmentId);
      res.status(200).json({ data: deleteDepartmentData, message: 'Department Deleted' });
    } catch (error) {
      next(error);
    }
  };
}
export default DepartmentController;
