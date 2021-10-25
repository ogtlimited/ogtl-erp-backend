/* eslint-disable prettier/prettier */
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import vendorPaymentModel from '@models/vendor/payment.model';
import { IVendorPayment } from '@interfaces/vendor-interface/payment-interface';
import { CreateVendorPaymentDto, UpdateVendorPaymentDto } from '@dtos/vendor/vendor-payment.dto';

class VendorPaymentService {
  public vendorPaymentModel = vendorPaymentModel;

  //Method for finding all Vendor payment
  public async findAllVendorPayment(): Promise<IVendorPayment[]>{
    return this.vendorPaymentModel.find();
  }

  //Method for finding a single Vendor payment
  public async findVendorPaymentId(vendorModelId: string): Promise<IVendorPayment>{
    //check if no Vendor id is empty
    if(isEmpty(vendorModelId)) throw new HttpException(400,`Vendor payment not provided`);
    //find Vendor using the id provided
    const findVendorPayment:IVendorPayment = await this.vendorPaymentModel.findOne({_id:vendorModelId});
    //throw error if Vendor does not exist
    if(!findVendorPayment) throw new HttpException(409,`Vendor payment with Id:${vendorModelId}, does not exist`);
    //return Vendor
    return findVendorPayment;
  }

  //Method for creating Vendor
  public async createVendorPaymentModel(vendorModelData: CreateVendorPaymentDto): Promise<IVendorPayment>{
    //check if Vendor data is empty
    if (isEmpty(vendorModelData)) throw new HttpException(400, "Bad request");
    //find Vendor using the employee id provided
    const findVendorPayment: IVendorPayment = await this.vendorPaymentModel.findOne({ number: vendorModelData.number });
    //throw error if Vendor does exist
    if (findVendorPayment) throw new HttpException(409, `Vendor payment already exists`);
    // return created Vendor
    return await this.vendorPaymentModel.create(vendorModelData);
  }

  //Method for updating Vendor
  public async updateVendorPaymentModel(vendorModelId: string,vendorModelData: UpdateVendorPaymentDto):Promise<IVendorPayment>{
    //check if no Vendor data is empty
    if (isEmpty(vendorModelData)) throw new HttpException(400, "Bad request");
    //find Vendor using the employee id provided
    const findVendorPayment: IVendorPayment = await this.vendorPaymentModel.findOne({ _id: vendorModelData._id });
    if(!findVendorPayment) throw new HttpException(409, `${vendorModelData._id} already exists`);
    //find Vendor using the id provided and update it
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const updateVendorPaymentId:IVendorPayment = await this.vendorPaymentModel.findByIdAndUpdate(vendorModelId,vendorModelData,{new:true})
    if (!updateVendorPaymentId) throw new HttpException(409, "Vendor could not be updated");
    // return updated Vendor
    return updateVendorPaymentId;
  }

  //Method for deleting Vendor
  public async deleteVendorPaymentModel(vendorModelId: string):Promise<IVendorPayment>{
    //find Vendor using the id provided and delete
    const deleteVendorPaymentId: IVendorPayment = await this.vendorPaymentModel.findByIdAndDelete(vendorModelId);
    if(!deleteVendorPaymentId) throw new HttpException(409, `Vendor payment with Id:${vendorModelId}, does not exist`);
    return deleteVendorPaymentId;
  }
}

export default VendorPaymentService;
