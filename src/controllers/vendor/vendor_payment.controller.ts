/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import VendorPaymentService from '@services/vendor/vendor_payment.service';
import { IVendorPayment } from '@interfaces/vendor-interface/payment-interface';
import { CreateVendorPaymentDto, UpdateVendorPaymentDto } from '@dtos/vendor/vendor-payment.dto';

class VendorPaymentController {
  public vendorPaymentService = new VendorPaymentService();

  //Method for returning all vendor
  public getVendorsPayments = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const findAllVendors: IVendorPayment[] = await this.vendorPaymentService.findAllVendorPayment();
      res.status(200).json({data:findAllVendors, totalVendorsPayments: findAllVendors.length, message:"All vendor payments"})
    }catch (error) {
      next(error)
    }
  }

  //Method for returning a single vendor
  public getVendorPaymentById = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const vendorId:string = req.params.id;
      const findVendor:IVendorPayment = await this.vendorPaymentService.findVendorPaymentId(vendorId);
      res.status(200).json({data:findVendor, message:"Vendor payment found successfully"})
    }
    catch (error) {
      next(error)
    }
  }

  //Method for creating vendor
  public createVendorPayment = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const vendorData:CreateVendorPaymentDto = req.body;
      const createVendorData: IVendorPayment = await this.vendorPaymentService.createVendorPaymentModel(vendorData);
      res.status(201).json({ data: createVendorData, message: 'vendor payment created.' });
    }
    catch (error) {
      next(error)
    }
  }

  //Method for updating vendor
  public updateVendorPayment = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const vendorId:string = req.params.id;
      const vendorData:UpdateVendorPaymentDto = req.body;
      const updateVendorData: IVendorPayment = await this.vendorPaymentService.updateVendorPaymentModel(vendorId,vendorData);
      res.status(200).json({ data: updateVendorData, message: 'Vendor payment updated.' });
    }
    catch (error) {
      next(error)
    }
  }

  //Method for deleting vendor
  public deleteVendorPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vendorId:string = req.params.id;
      const deleteVendor = await this.vendorPaymentService.deleteVendorPaymentModel(vendorId);
      res.status(200).json({ data: deleteVendor, message: 'Vendor payment deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default VendorPaymentController
