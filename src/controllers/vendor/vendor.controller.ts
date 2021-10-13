/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import VendorService from '@services/vendor/vendor.service';
import { IVendor } from '@interfaces/vendor-interface/vendor-interface';
import { CreateVendorDto, UpdateVendorDto } from '@dtos/vendor/vendor.dto';

class VendorController {
  public vendorService = new VendorService();

  //Method for returning all vendor
  public getVendors = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const findAllVendors: IVendor[] = await this.vendorService.findAllVendor();
      res.status(200).json({data:findAllVendors, totalVendors: findAllVendors.length, message:"All vendor"})
    }catch (error) {
      next(error)
    }
  }

  //Method for returning a single vendor
  public getVendorById = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const vendorId:string = req.params.id;
      const findVendor:IVendor = await this.vendorService.findVendorId(vendorId);
      res.status(200).json({data:findVendor, message:"Vendor found successfully"})
    }
    catch (error) {
      next(error)
    }
  }

  //Method for creating vendor
  public createVendor = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const vendorData:CreateVendorDto = req.body;
      const createVendorData: IVendor = await this.vendorService.createVendorModel(vendorData);
      res.status(201).json({ data: createVendorData, message: 'vendor created.' });
    }
    catch (error) {
      next(error)
    }
  }

  //Method for updating vendor
  public updateVendor = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const vendorId:string = req.params.id;
      const vendorData:UpdateVendorDto = req.body;
      const updateVendorData: IVendor = await this.vendorService.updateVendorModel(vendorId,vendorData);
      res.status(200).json({ data: updateVendorData, message: 'Vendor updated.' });
    }
    catch (error) {
      next(error)
    }
  }

  //Method for deleting vendor
  public deleteVendor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vendorId:string = req.params.id;
      const deleteVendor = await this.vendorService.deleteVendorModel(vendorId);
      res.status(200).json({ data: deleteVendor, message: 'Vendor deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default VendorController
