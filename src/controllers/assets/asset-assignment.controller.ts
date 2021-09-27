/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateAssetAssignmentDto, UpdateAssetAssignmentDto } from '@/dtos/asset/asset-assignment.dto';
import { assetAssignment } from '@/interfaces/assets/asset-assignment.interface';
import AssetService from '@/services/assets/asset-assignment.service';


class assetAssignmentController {
  public AssetService = new AssetService();

  //Returns all Assets
  public getAssetAssignment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllAssetsData: assetAssignment[] = await this.AssetService.findAllAssetAssignment();

      res.status(200).json({ data: findAllAssetsData, numAssets: findAllAssetsData.length, message: 'All Assets Assignment' });
    } catch (error) {
      next(error);
    }
  };

  //creates Asset
  public CreateAssetAssignment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const AssetData: CreateAssetAssignmentDto = req.body;
      const createAssetData: assetAssignment = await this.AssetService.createAssetAssignment(AssetData);
      res.status(201).json({ data: createAssetData, message: 'Asset Assignment successfully created' });
    } catch (error) {
      next(error);
    }
  };

  //gets one Asset with Id given
  public getAssetAssignmentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const AssetId: string = req.params.id;
      const findOneAssetData: assetAssignment = await this.AssetService.findAssetAssignmentById(AssetId);
      res.status(200).json({ data: findOneAssetData, message: 'All Assets Assignment' });
    } catch (error) {
      next(error);
    }
  };

  //update Asset
  public updateAssetAssignment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const AssetId: string = req.params.id;
      const AssetData: UpdateAssetAssignmentDto = req.body;
      const updateAssetData: assetAssignment = await this.AssetService.updateAssetAssignment(AssetId, AssetData);
      res.status(200).json({ data: updateAssetData, message: 'Asset Assignment Updated' });
    } catch (error) {
      next(error);
    }
  };
  //deletes Asset
  public deleteAssetAssignment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const AssetId: string = req.params.id;
      const deleteAssetData: assetAssignment = await this.AssetService.deleteAssetAssignment(AssetId);
      res.status(200).json({ data: deleteAssetData, message: 'Asset Assignment Deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default assetAssignmentController;