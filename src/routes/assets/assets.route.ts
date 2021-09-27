/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';
import { CreateAssetDto, UpdateAssetDto } from '@/dtos/asset/assets.dto';
import AssetController from '@/controllers/assets/assets.controller';

class AssetRoute implements Routes {
    public path = '/api/assets';
    public router = Router();
    public AssetController = new AssetController();
    


    
    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`,authMiddleware, this.AssetController.getAsset);
        this.router.get(`${this.path}/:id`,authMiddleware, this.AssetController.getAssetById);
        this.router.post(`${this.path}` , [validationMiddleware(CreateAssetDto, 'body'),authMiddleware], this.AssetController.CreateAsset);
        this.router.patch(`${this.path}/:id`, [validationMiddleware(UpdateAssetDto, 'body', true),authMiddleware], this.AssetController.updateAsset);
        this.router.delete(`${this.path}/:id`,authMiddleware ,this.AssetController.deleteAsset);
      }
    }

    export default AssetRoute;