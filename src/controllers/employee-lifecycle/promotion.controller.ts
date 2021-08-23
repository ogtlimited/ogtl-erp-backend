/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreatePromotionDto } from '@dtos/employee-lifecycle/promotion.dto';
import { IPromotion } from '@/interfaces/employee-lifecycle/promotion.interface';
import PromotionService from '@/services/employee-lifecycle/promotion.service';


class PromotionController {
  public promotionService = new PromotionService();
  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.promotionService.findAll();
      res.status(200).json({ data: data});
    } catch (error) {
      next(error);
    }
  };

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data = await this.promotionService.findById(id);
      res.status(200).json({ data: data});
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newData: CreatePromotionDto = req.body;
      const createdData: IPromotion = await this.promotionService.create(newData); 
      res.status(201).json({ data: createdData});
    } catch (error) {
      
      next(error);
    }
  };
}

export default PromotionController;
