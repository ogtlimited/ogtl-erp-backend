/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateOnBoardingDto } from '@dtos/employee-lifecycle/onboarding.dto';
import { IOnBoarding } from '@/interfaces/employee-lifecycle/onboarding.interface';
import OnBoardingService from '@/services/employee-lifecycle/onboarding.service';

class OnBoardingController {
  public onBoardingService = new OnBoardingService();
  
  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.onBoardingService.findAll();
      res.status(200).json({ data: data});
    } catch (error) {
      next(error);
    }
  };

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data = await this.onBoardingService.findById(id);
      res.status(200).json({ data: data});
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newData: CreateOnBoardingDto = req.body;
      const createdData: IOnBoarding = await this.onBoardingService.create(newData); 
      res.status(201).json({ data: createdData});
    } catch (error) {
      next(error);
    }
  };
}

export default OnBoardingController;
