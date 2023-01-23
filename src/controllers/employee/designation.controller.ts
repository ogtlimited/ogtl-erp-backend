/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateDesignationDto, UpdateDesignationDto } from '@/dtos/employee/designation.dto';
import { Designation } from '@/interfaces/employee-interface/designation.interface';
import DesignationService from '@/services/employee/designation.service';

class DesignationController {
  public DesignationService = new DesignationService();

  //Returns all Designations
  public getDesignations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllDesignationsData: Designation[] = await this.DesignationService.findAllDesignations();

      res.status(200).json({ data: findAllDesignationsData, numDesignationes: findAllDesignationsData.length, message: 'All Designations' });
    } catch (error) {
      next(error);
    }
  };

  //creates Designation
  public CreateDesignation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const DesignationData: CreateDesignationDto = req.body;
      const createDesignationData: Designation = await this.DesignationService.createDesignation(DesignationData);
      res.status(201).json({ data: createDesignationData, message: 'Designation succesfully created' });
    } catch (error) {
      next(error);
    }
  };

  //gets one Designation with Id given
  public getDesignationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const DesignationId: string = req.params.id;
      const findOneDesignationData: Designation = await this.DesignationService.findDesignationById(DesignationId);
      res.status(200).json({ data: findOneDesignationData, message: 'All Designationes' });
    } catch (error) {
      next(error);
    }
  };

  //update Designation
  public updateDesignation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const DesignationId: string = req.params.id;
      const DesignationData: UpdateDesignationDto = req.body;
      const updateDesignationData: Designation = await this.DesignationService.updateDesignation(DesignationId, DesignationData);
      res.status(200).json({ data: updateDesignationData, message: 'Designation Updated' });
    } catch (error) {
      next(error);
    }
  };
  //deletes Designation
  public deleteDesignation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const DesignationId: string = req.params.id;
      const deleteDesignationData: Designation = await this.DesignationService.deleteDesignation(DesignationId);
      res.status(200).json({ data: deleteDesignationData, message: 'Designation Deleted' });
    } catch (error) {
      next(error);
    }
  };
}
export default DesignationController;
