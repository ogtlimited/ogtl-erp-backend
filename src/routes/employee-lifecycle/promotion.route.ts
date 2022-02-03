/* eslint-disable prettier/prettier */
import { CreatePromotionDto, UpdatePromotionDto } from '../../dtos/employee-lifecycle/promotion.dto';
import PromotionController from '@/controllers/employee-lifecycle/promotion.controller';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';

class PromotionRoute implements Routes {
    public path = '/api/promotion';
    public router = Router();
    public promotionController = new PromotionController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
      this.router.get(`${this.path}`, authMiddleware, this.promotionController.findAllPromotions);
      this.router.get(`${this.path}/:id`, authMiddleware, this.promotionController.findPromotionById);
      this.router.get(`${this.path}/employee/:id`, authMiddleware, this.promotionController.findPromotionForAnEmployee);
      this.router.post(`${this.path}`, [ validationMiddleware(CreatePromotionDto, 'body'),authMiddleware], this.promotionController.createPromotion);
      this.router.put(`${this.path}/:id`, [ validationMiddleware(UpdatePromotionDto, 'body'),authMiddleware], this.promotionController.updatePromotion);
      this.router.delete(`${this.path}/:id`,authMiddleware, this.promotionController.deletePromotion);
    }
  }
  export default PromotionRoute;
