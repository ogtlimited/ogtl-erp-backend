/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateAssetDto, UpdateAssetDto } from '@/dtos/asset/assets.dto';
import { Asset } from '@/interfaces/assets/assets.interface';
import AssetService from '@/services/assets/assets.service';

class AssetController {
  public AssetService = new AssetService();

  public getAsset = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllAsset: Asset[] = await this.AssetService.findAllAsset();

      res.status(200).json({ data: findAllAsset, numAssets: findAllAsset.length, message: 'All Assets' });
    } catch (error) {
      next(error);
    }
  };

  public CreateAsset = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const AssetData: CreateAssetDto = req.body;
      const createAssetData: Asset = await this.AssetService.createAsset(AssetData);
      res.status(201).json({ data: createAssetData, message: 'Asset successfully created' });
    } catch (error) {
      next(error);
    }
  };

  public getAssetById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const AssetId: string = req.params.id;
      const findOneAssetData: Asset = await this.AssetService.findAssetById(AssetId);
      res.status(200).json({ data: findOneAssetData, message: 'All Assets ' });
    } catch (error) {
      next(error);
    }
  };

  //update Asset
  public updateAsset = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const AssetId: string = req.params.id;
      const AssetData: UpdateAssetDto = req.body;
      const updateAssetData: Asset = await this.AssetService.updateAsset(AssetId, AssetData);
      res.status(200).json({ data: updateAssetData, message: 'Asset Updated' });
    } catch (error) {
      next(error);
    }
  };
  //deletes Asset
  public deleteAsset = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const AssetId: string = req.params.id;
      const deleteAssetData: Asset = await this.AssetService.deleteAsset(AssetId);
      res.status(200).json({ data: deleteAssetData, message: 'Asset Deleted' });
    } catch (error) {
      next(error);
    }
  };


}

export default AssetController;