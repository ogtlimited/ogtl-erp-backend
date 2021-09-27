/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateAssetAssignmentDto, UpdateAssetAssignmentDto } from '@/dtos/asset/asset-assignment.dto';
import assetAssignmentController from '@/controllers/assets/asset-assignment.controller';
import authMiddleware from '@middlewares/auth.middleware';

class AssetAssignmentRoute implements Routes {
    public path = '/api/asset-assignment';
    public router = Router();
    public AssetsController = new assetAssignmentController();
    


    
    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`,authMiddleware, this.AssetsController.getAssetAssignment);
        this.router.get(`${this.path}/:id`,authMiddleware, this.AssetsController.getAssetAssignmentById);
        this.router.post(`${this.path}` , [validationMiddleware(CreateAssetAssignmentDto, 'body'),authMiddleware], this.AssetsController.CreateAssetAssignment);
        this.router.patch(`${this.path}/:id`, [validationMiddleware(UpdateAssetAssignmentDto, 'body', true),authMiddleware], this.AssetsController.updateAssetAssignment);
        this.router.delete(`${this.path}/:id`,authMiddleware ,this.AssetsController.deleteAssetAssignment);
      }
    }

    export default AssetAssignmentRoute;
