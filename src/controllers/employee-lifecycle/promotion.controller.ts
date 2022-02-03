/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreatePromotionDto, UpdatePromotionDto } from '@dtos/employee-lifecycle/promotion.dto';
import { IPromotion } from '@/interfaces/employee-lifecycle/promotion.interface';
import PromotionService from '@/services/employee-lifecycle/promotion.service';


class PromotionController {
  public promotionService = new PromotionService();
  public findAllPromotions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.promotionService.findAllPromotions();
      res.status(200).json({ data: data});
    } catch (error) {
      next(error);
    }
  };

  //Method for returning all promotion letters for an employee
  public findPromotionForAnEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data = await this.promotionService.findAllPromotionsForAnEmployee(id);
      if(data){
        res.status(200).json({ data: data});
      }

    } catch (error) {
      next(error);
    }
  };

  public findPromotionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data = await this.promotionService.findPromotionById(id);
      res.status(200).json({ data: data});
    } catch (error) {
      next(error);
    }
  };

  public createPromotion = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newData: CreatePromotionDto = req.body;
      const createdData: IPromotion = await this.promotionService.createPromotion(newData);
      res.status(201).json({ data: createdData,message: "Promotion Succesful"});
    } catch (error) {

      next(error);
    }
  };

  public updatePromotion = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const PromotionId: string = req.params.id;
        const PromotionData: UpdatePromotionDto = req.body;
        const updatePromotionData: IPromotion = await this.promotionService.updatePromotion(PromotionId,PromotionData);
        res.status(200).json({data:updatePromotionData, message:"Promotion Updated"});
    }
    catch(error){
        next(error)
    }

 }

 public deletePromotion = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const PromotionId: string = req.params.id;
        const deletePromotionData: IPromotion = await this.promotionService.deletePromotion(PromotionId);
        res.status(200).json({data:deletePromotionData, message:"Promotion Deleted"});

    }
    catch(error){
        next(error)
    }

 }
}

export default PromotionController;
