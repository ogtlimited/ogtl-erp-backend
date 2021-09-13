/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateAssetDto, UpdateAssetDto } from '@/dtos/asset/asset.dto';
import { Assets } from '@/interfaces/assets/assets.interface';
import AssetService from '@/services/assets/assets.service';


class AssetsController {
  public AssetService = new AssetService();

  //Returns all Assets
  public getAssets = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllAssetsData: Assets[] = await this.AssetService.findAllAsset();

      res.status(200).json({ data: findAllAssetsData, numAssets: findAllAssetsData.length, message: 'All Assets' });
    } catch (error) {
      next(error);
    }
  };

  //creates Asset
  public CreateAsset = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const AssetData: CreateAssetDto = req.body;
      const createAssetData: Assets = await this.AssetService.createAssets(AssetData);
      res.status(201).json({ data: createAssetData, message: 'Asset successfully created' });
    } catch (error) {
      next(error);
    }
  };

  //gets one Asset with Id given
  public getAssetById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const AssetId: string = req.params.id;
      const findOneAssetData: Assets = await this.AssetService.findAssetsById(AssetId);
      res.status(200).json({ data: findOneAssetData, message: 'All Assets' });
    } catch (error) {
      next(error);
    }
  };

  //update Asset
  public updateAsset = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const AssetId: string = req.params.id;
      const AssetData: UpdateAssetDto = req.body;
      const updateAssetData: Assets = await this.AssetService.updateAssets(AssetId, AssetData);
      res.status(200).json({ data: updateAssetData, message: 'Asset Updated' });
    } catch (error) {
      next(error);
    }
  };
  //deletes Asset
  public deleteAsset = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const AssetId: string = req.params.id;
      const deleteAssetData: Assets = await this.AssetService.deleteAssets(AssetId);
      res.status(200).json({ data: deleteAssetData, message: 'Asset Deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default AssetsController;