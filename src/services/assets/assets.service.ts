/* eslint-disable prettier/prettier */
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { CreateAssetDto, UpdateAssetDto } from '@/dtos/asset/assets.dto';
import { Asset } from '@/interfaces/assets/assets.interface';
import AssetModel from '@/models/assets/assets.model';

class AssetService{
    public Assets = AssetModel;

    /**
     *Returns all Asset
     */
    public async findAllAsset(): Promise<Asset[]> { 
        const Asset: Asset[] = await this.Assets.find().populate("assetName");
        return Asset;
        
    }

    /**
     *Returns the Asset with the Id given
     */
    public async findAssetById(AssetId:string) : Promise<Asset>
    {
       //Check if Id is empty
       if (isEmpty(AssetId)) throw new HttpException(400, "No Id provided");

       //find Asset with Id given
       const findAsset:Asset = await this.Assets.findOne({ _id:AssetId  }).populate("assetName");

       if(!findAsset) throw new HttpException(409, "Asset with that Id doesnt exist");

       return findAsset;
        
    }

    /**
     *Creates a new Asset 
     */


     public async createAsset(AssetData: CreateAssetDto) : Promise<Asset>{
        
        //Check if data is empty
       if (isEmpty(AssetData)) throw new HttpException(400, "No data provided");

       const newAssetId = this.generateAssetID()

       const createAssetData: Asset = await this.Assets.create({ ...AssetData, assetId: newAssetId});
       return createAssetData;
     }

     /**
     *Updates existing Asset 
     */

     public async updateAsset(AssetId:string,AssetData: UpdateAssetDto)  : Promise<Asset>{

        //Check if data is empty
        if (isEmpty(AssetData)) throw new HttpException(400, "No data provided");

        const updateAssetById: Asset = await this.Assets.findByIdAndUpdate(AssetId,AssetData, {new : true});
        if(!updateAssetById) throw new HttpException(409, "Asset doesn't exist");
         return updateAssetById;
   }

     public async deleteAsset(AssetId:string) : Promise<Asset>{
         const deleteAssetById : Asset = await this.Assets.findByIdAndDelete(AssetId);
         if(!deleteAssetById) throw new HttpException(409, "Asset doesn't exist");
         return deleteAssetById;
     }


     private generateAssetID(){
        return "OGA"+ Math.floor(1000 + Math.random() * 9000)
      }


}

export default AssetService;