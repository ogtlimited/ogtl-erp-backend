/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
// import { CreateSalaryStructureAssignmentDto } from '@/dtos/payroll/salary-structure-assignment.dto';
// import { ISalaryStructureAssignment } from '@/interfaces/payroll/salary-structure-assignment.interface';
import SalaryStructureAssignmentService from '@/services/payroll/salary-structure-assignment.service';
// import EmployeeModel from '@/models/employee/employee.model';

class SalaryStructureAssignmentController {
  public salaryStructureAssignmentService = new SalaryStructureAssignmentService();
  
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
      res.status(201).json({ salaryStructureAssignment: createdData});
    } catch (error) {
      next(error);
    }
  };

  //update
//   public createShift = async (req: Request, res: Response, next: NextFunction) => {
//     try {
     
//       const attendanceData: DTO = req.body;
//       const createAttendanceData: IAttendanceCreatedResponse = await this.salaryStructureAssignmentService.createAttendanceType(attendanceData); 
//       res.status(201).json({ data: createAttendanceData, message: 'created' });
//     } catch (error) {
      
//       next(error);
//     }
//   };

}

export default SalaryStructureAssignmentController;
