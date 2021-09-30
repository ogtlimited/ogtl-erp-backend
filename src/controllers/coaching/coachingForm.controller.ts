/* eslint-disable prettier/prettier */

import { CoachingFormUpdateDTO, CoachingFormUserResponseUpdateDTO } from '@/dtos/coaching/coaching.dto';
import { CoachingFormDTO } from '../../dtos/coaching/coaching.dto';
import { CoachingFormInterface } from '../../interfaces/coaching/coaching.interface';
import CoachingFormService from '@/services/coaching/coachingForm.service';
import { NextFunction, Request, Response } from 'express';




class CoachingFormController {
  public coachingService = new CoachingFormService();

  //Returns all CoachingForms
  public getCoachingForms = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req['user']._id)
      const userId = req['user']._id
      const findAllCoachingFormsData: CoachingFormInterface[] = await this.coachingService.findAllCoaching(userId);
      res.status(200).json({ data: findAllCoachingFormsData, numCoachingForms: findAllCoachingFormsData.length, message: 'All CoachingForms' });
    } catch (error) {
      next(error);
    }
  };
  public getEmployeeCoachingForms = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employeeId: string = req.params.id;
      const findAllCoachingFormsData: CoachingFormInterface[] = await this.coachingService.findEmployeeCoachingForm(employeeId);

      res.status(200).json({ data: findAllCoachingFormsData, numCoachingForms: findAllCoachingFormsData.length, message: 'All CoachingForms' });
    } catch (error) {
      next(error);
    }
  };

  //creates Coaching
  public CreateCoachingForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CoachingData: CoachingFormDTO = req.body;
      const createCoachingData: CoachingFormInterface = await this.coachingService.createCoachingForm(CoachingData);
      res.status(201).json({ data: createCoachingData, message: 'Coaching succesfully created' });
    } catch (error) {
      next(error);
    }
  };

  //gets one Coaching with Id given
  public getCoachingFormById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CoachingId: string = req.params.id;
      const findOneCoachingData: CoachingFormInterface = await this.coachingService.findCoachingFormById(CoachingId);
      res.status(200).json({ data: findOneCoachingData, message: 'All CoachingForms' });
    } catch (error) {
      next(error);
    }
  };

  //update Coaching
  public updateCoachingForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CoachingId: string = req.params.id;
      const CoachingData: CoachingFormUpdateDTO = req.body;
      const updateCoachingData: CoachingFormInterface = await this.coachingService.updateCoachingForm(CoachingId, CoachingData);
      res.status(200).json({ data: updateCoachingData, message: 'Coaching Updated' });
    } catch (error) {
      next(error);
    }
  };
  //update Coaching
  public updateUserResponserCoachingForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CoachingId: string = req.params.id;
      const CoachingData: CoachingFormUserResponseUpdateDTO = req.body;
      const updateCoachingData: CoachingFormInterface = await this.coachingService.updateCoachingFormUserResponse(CoachingId, CoachingData);
      res.status(200).json({ data: updateCoachingData, message: 'Coaching Updated' });
    } catch (error) {
      next(error);
    }
  };
  //deletes Coaching
  public deleteCoachingForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CoachingId: string = req.params.id;
      const deleteCoachingData: CoachingFormInterface = await this.coachingService.deleteCoachingForm(CoachingId);
      res.status(200).json({ data: deleteCoachingData, message: 'Coaching Deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default CoachingFormController;
