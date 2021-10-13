/* eslint-disable prettier/prettier */
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import vendorModel from '@models/vendor/vendor.model';
import { IVendor } from '@interfaces/vendor-interface/vendor-interface';
import { CreateVendorDto, UpdateVendorDto } from '@dtos/vendor/vendor.dto';

class VendorService {
  public vendorModel = vendorModel;

  //Method for finding all Vendor
  public async findAllVendor(): Promise<IVendor[]>{
    return this.vendorModel.find();
  }

  //Method for finding a single Vendor
  public async findVendorId(vendorModelId: string): Promise<IVendor>{
    //check if no Vendor id is empty
    if(isEmpty(vendorModelId)) throw new HttpException(400,`Vendor not provided`);
    //find Vendor using the id provided
    const findVendor:IVendor = await this.vendorModel.findOne({_id:vendorModelId});
    //throw error if Vendor does not exist
    if(!findVendor) throw new HttpException(409,`Vendor with Id:${vendorModelId}, does not exist`);
    //return Vendor
    return findVendor;
  }

  //Method for creating Vendor
  public async createVendorModel(vendorModelData: CreateVendorDto): Promise<IVendor>{
    //check if Vendor data is empty
    if (isEmpty(vendorModelData)) throw new HttpException(400, "Bad request");
    //find Vendor using the employee id provided
    const findVendor: IVendor = await this.vendorModel.findOne({ email: vendorModelData.email });
    //throw error if Vendor does exist
    if (findVendor) throw new HttpException(409, `Vendor already exists`);
    // return created Vendor
    return await this.vendorModel.create(vendorModelData);
  }

  //Method for updating Vendor
  public async updateVendorModel(vendorModelId: string,vendorModelData: UpdateVendorDto):Promise<IVendor>{
    //check if no Vendor data is empty
    if (isEmpty(vendorModelData)) throw new HttpException(400, "Bad request");
    //find Vendor using the employee id provided
    const findVendor: IVendor = await this.vendorModel.findOne({ _id: vendorModelData._id });
    if(!findVendor) throw new HttpException(409, `${vendorModelData._id} already exists`);
    //find Vendor using the id provided and update it
    const updateVendorId:IVendor = await this.vendorModel.findByIdAndUpdate(vendorModelId,vendorModelData,{new:true})
    if (!updateVendorId) throw new HttpException(409, "Vendor could not be updated");
    // return updated Vendor
    return updateVendorId;
  }

  //Method for deleting Vendor
  public async deleteVendorModel(vendorModelId: string):Promise<IVendor>{
    //find Vendor using the id provided and delete
    const deleteVendorId: IVendor = await this.vendorModel.findByIdAndDelete(vendorModelId);
    if(!deleteVendorId) throw new HttpException(409, `Vendor with Id:${vendorModelId}, does not exist`);
    return deleteVendorId;
  }
}

export default VendorService;
