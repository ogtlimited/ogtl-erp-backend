/* eslint-disable prettier/prettier */
import { CreatePromotionDto } from '../../dtos/employee-lifecycle/promotion.dto';
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
        this.router.get(`${this.path}`, [authMiddleware], this.promotionController.findAll);
        this.router.get(`${this.path}/:id`, [authMiddleware], this.promotionController.findById);
        this.router.post(`${this.path}`, [authMiddleware, validationMiddleware(CreatePromotionDto, 'body')], this.promotionController.create);
    }
  }
  export default PromotionRoute;