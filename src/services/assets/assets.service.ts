/* eslint-disable prettier/prettier */
import { CreateAssetDto, UpdateAssetDto } from '@/dtos/asset/asset.dto';
import { HttpException } from '@exceptions/HttpException';
import { Assets } from '@/interfaces/assets/assets.interface';
import AssetsModel from '@models/assets/assets.model';
import { isEmpty } from '@utils/util';


class AssetsService {
    public Asset = AssetsModel;

    /**
     *Returns all Assets
     */
    public async findAllAsset(): Promise<Assets[]> { 
        const Asset: Assets[] = await this.Asset.find().populate("assigned_to");
        return Asset;
        
    }

    /**
     *Returns the Assets with the Id given
     */
    public async findAssetsById(AssetsId:string) : Promise<Assets>
    {
       //Check if Id is empty
       if (isEmpty(AssetsId)) throw new HttpException(400, "No Id provided");

       //find Assets with Id given
       const findAssets:Assets = await this.Asset.findOne({  _id: AssetsId}).populate("assigned_to");

       if(!findAssets) throw new HttpException(409, "Assets with that Id doesnt exist");

       return findAssets;
        
    }

    /**
     *Creates a new Assets 
     */


     public async createAssets(AssetsData: CreateAssetDto) : Promise<Assets>{
        
        //Check if data is empty
       if (isEmpty(AssetsData)) throw new HttpException(400, "No data provided");

       const findAssets: Assets = await this.Asset.findOne({Assets: AssetsData.serialNumber});
       if(findAssets) throw new HttpException(409, `Assets ${AssetsData.serialNumber} already exists`);
       const newAssetId = this.generateAssetID()

       const createAssetsData: Assets = await this.Asset.create({ ...AssetsData, assetId: newAssetId});
       return createAssetsData;
     }

     /**
     *Updates existing Assets 
     */

     public async updateAssets(AssetsId:string,AssetsData: UpdateAssetDto)  : Promise<Assets>{

        //Check if data is empty
        if (isEmpty(AssetsData)) throw new HttpException(400, "No data provided");

        const updateAssetsById: Assets = await this.Asset.findByIdAndUpdate(AssetsId,AssetsData);
        if(!updateAssetsById) throw new HttpException(409, "Assets doesn't exist");
         return updateAssetsById;
   }

     public async deleteAssets(AssetsId:string) : Promise<Assets>{
         const deleteAssetsById : Assets = await this.Asset.findByIdAndDelete(AssetsId);
         if(!deleteAssetsById) throw new HttpException(409, "Assets doesn't exist");
         return deleteAssetsById;
     }
 
     private generateAssetID(){
        return "OGA"+ Math.floor(1000 + Math.random() * 9000)
      }
}

export default AssetsService;
