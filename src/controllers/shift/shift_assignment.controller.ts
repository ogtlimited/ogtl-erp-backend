/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import ShiftAssignmentService from '@services/shift/shift_assignment.service';
import { IShiftAssignment } from '@interfaces/shift-interface/shift_assignment.interface';
import { CreateShiftAssignmentDto, UpdateShiftAssignmentDto } from '@dtos/shift/shift_assignment.dto';

class ShiftAssignmentController {
  public shiftAssignmentService = new ShiftAssignmentService();

   //Method for returning all shift assignments
  public getShiftAssignments = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const findAllShiftAssignments: IShiftAssignment[] = await this.shiftAssignmentService.findAllShiftAssignments();
      res.status(200).json({data:findAllShiftAssignments, totalShiftAssignments: findAllShiftAssignments.length, message:"All shift assignments"})
    }catch (error) {
      next(error)
    }
  }

  //Method for returning a single shift assignment
  public getShiftAssignmentById = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const shiftAssignmentId:string = req.params.id;
      const findShiftAssignment:IShiftAssignment = await this.shiftAssignmentService.findShiftAssignmentById(shiftAssignmentId);
      res.status(200).json({data:findShiftAssignment, message:"Shift assignment found successfully"})
    }
    catch (error) {
      next(error)
    }
  }

  //Method for creating shift assignment
  public createShiftAssignment = async (req:Request, res:Response, next:NextFunction) =>{
      try {
        const shiftAssignmentData:CreateShiftAssignmentDto = req.body;
        const createShiftAssignmentData: IShiftAssignment = await this.shiftAssignmentService.createShiftAssignment(shiftAssignmentData);
        res.status(201).json({ data: createShiftAssignmentData, message: 'Shift assignment created.' });
      }
      catch (error) {
        next(error)
      }
  }

  //Method for updating shift assignment
  public updateShiftAssignment = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const shiftAssignmentId:string = req.params.id;
      const shiftAssignmentData:UpdateShiftAssignmentDto = req.body;
      const updateShiftAssignmentData: IShiftAssignment = await this.shiftAssignmentService.updateShiftAssignment(shiftAssignmentId,shiftAssignmentData);
      res.status(200).json({ data: updateShiftAssignmentData, message: 'Shift assignment updated.' });
    }
    catch (error) {
      next(error)
    }
  }

  //Method for deleting shift assignment
  public deleteShiftAssignment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shiftAssignmentId:string = req.params.id;
      const deleteShiftAssignment = await this.shiftAssignmentService.deleteShiftAssignment(shiftAssignmentId);

      res.status(200).json({ data: deleteShiftAssignment, message: 'Shift assignment deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ShiftAssignmentController
