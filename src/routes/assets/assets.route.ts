/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateAssetDto, UpdateAssetDto } from '@/dtos/asset/asset.dto';
import AssetsController from '@/controllers/assets/assets.controller';
import authMiddleware from '@middlewares/auth.middleware';

class AssetsRoute implements Routes {
    public path = '/api/assets';
    public router = Router();
    public AssetsController = new AssetsController();
    

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`,authMiddleware, this.AssetsController.getAssets);
        this.router.get(`${this.path}/:id`,authMiddleware, this.AssetsController.getAssetById);
        this.router.post(`${this.path}` , [validationMiddleware(CreateAssetDto, 'body'),authMiddleware], this.AssetsController.CreateAsset);
        this.router.put(`${this.path}/:id`, [validationMiddleware(UpdateAssetDto, 'body', true),authMiddleware], this.AssetsController.updateAsset);
        this.router.delete(`${this.path}/:id`,authMiddleware ,this.AssetsController.deleteAsset);
      }
    }

    export default AssetsRoute;
