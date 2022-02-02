/* eslint-disable prettier/prettier */
import { CreateAssetAssignmentDto, UpdateAssetAssignmentDto } from '@/dtos/asset/asset-assignment.dto';
import { HttpException } from '@exceptions/HttpException';
import { assetAssignment } from '@/interfaces/assets/asset-assignment.interface';
import AssetAssignmentModel from '@/models/assets/asset-assignment.model';
import { isEmpty } from '@utils/util';


class AssetAssignmentService {
    public Asset = AssetAssignmentModel;

    /**
     *Returns all Assets
     */
    public async findAllAssetAssignment(): Promise<assetAssignment[]> { 
        const Asset: assetAssignment[] = await this.Asset.find()
        .populate({path:"assigned_to"})
        .populate({path:"assigned_by"})
        .populate({path: "assetId",
        populate: {
            path: "assetName",
            model: "PurchaseOrder",
            
        }
        })

        
       
        console.log("Assets", Asset);
        return Asset;
        
    }

    /**
     *Returns the Assets with the Id given
     */
    public async findAssetAssignmentById(AssetsId:string) : Promise<assetAssignment>
    {
       //Check if Id is empty
       if (isEmpty(AssetsId)) throw new HttpException(400, "No Id provided");

       //find Assets with Id given
       const findAssets:assetAssignment = await this.Asset.findOne({  _id: AssetsId}).populate("assigned_to assigned_by assetId");

       if(!findAssets) throw new HttpException(409, "Assets with that Id doesnt exist");

       return findAssets;
        
    }

    /**
     *Creates a new Assets 
     */


     public async createAssetAssignment(AssetsData: CreateAssetAssignmentDto) : Promise<assetAssignment>{
        
        //Check if data is empty
       if (isEmpty(AssetsData)) throw new HttpException(400, "No data provided");

       const findAssets: assetAssignment = await this.Asset.findOne({Assets: AssetsData.assetId}).populate("assigned_to assigned_by assetId");
       if(findAssets) throw new HttpException(409, `Assets ${AssetsData.assetId} already exists`);
       

       const createAssetsData: assetAssignment = await this.Asset.create( AssetsData);
       return createAssetsData;
     }

     /**
     *Updates existing Assets 
     */

     public async updateAssetAssignment(AssetsId:string,AssetsData: UpdateAssetAssignmentDto)  : Promise<assetAssignment>{

        //Check if data is empty
        if (isEmpty(AssetsData)) throw new HttpException(400, "No data provided");

        const updateAssetsById: assetAssignment = await this.Asset.findByIdAndUpdate(AssetsId,AssetsData, {new : true});
        if(!updateAssetsById) throw new HttpException(409, "Assets doesn't exist");
         return updateAssetsById;
   }

     public async deleteAssetAssignment(AssetsId:string) : Promise<assetAssignment>{
         const deleteAssetsById : assetAssignment = await this.Asset.findByIdAndDelete(AssetsId);
         if(!deleteAssetsById) throw new HttpException(409, "Assets doesn't exist");
         return deleteAssetsById;
     }
 
     
}

export default AssetAssignmentService;
