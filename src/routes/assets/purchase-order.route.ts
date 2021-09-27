/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreatePurchaseOrderDto, UpdatePurchaseOrderDto, UpdatePurchaseStatus } from '@/dtos/asset/purchase-order.dto';
import authMiddleware from '@middlewares/auth.middleware';
import PurchaseOrderController from '@/controllers/assets/purchase-order.controller';

class PurchaseOrderRoute implements Routes {
    public path = '/api/purchase-order';
    public router = Router();
    public PurchaseOrderController = new PurchaseOrderController();
    


    
    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`,authMiddleware, this.PurchaseOrderController.getPurchaseOrder);
        this.router.get(`${this.path}/:id`,authMiddleware, this.PurchaseOrderController.getPurchaseOrderById);
        this.router.post(`${this.path}` , [validationMiddleware(CreatePurchaseOrderDto, 'body'),authMiddleware], this.PurchaseOrderController.CreatePurchaseOrder);
        this.router.patch(`${this.path}/:id`, [validationMiddleware(UpdatePurchaseOrderDto, 'body', true),authMiddleware], this.PurchaseOrderController.updatePurchaseOrder);
        this.router.patch(`${this.path}/status/:id`,[ validationMiddleware(UpdatePurchaseStatus, 'body', true),authMiddleware], this.PurchaseOrderController.updatePurchaseOrderStatus);
        this.router.delete(`${this.path}/:id`,authMiddleware ,this.PurchaseOrderController.deletePurchaseOrder);
      }
    }

    export default PurchaseOrderRoute;