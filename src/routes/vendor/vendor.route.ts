/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import VendorController from '@controllers/vendor/vendor.controller';
import { CreateVendorDto, UpdateVendorDto } from '@dtos/vendor/vendor.dto';
import authMiddleware from '@middlewares/auth.middleware';


class VendorRoute implements Routes {
  public path = '/api/vendor';
  public router = Router();
  public vendor = new VendorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`,authMiddleware, this.vendor.getVendors);
    this.router.get(`${this.path}/:id`,authMiddleware, this.vendor.getVendorById);
    this.router.post(`${this.path}`, [validationMiddleware(CreateVendorDto, 'body'),authMiddleware], this.vendor.createVendor);
    this.router.patch(`${this.path}/:id`, [validationMiddleware(UpdateVendorDto, 'body',true),authMiddleware], this.vendor.updateVendor);
    this.router.delete(`${this.path}/:id`,authMiddleware, this.vendor.deleteVendor);
  }
}

export default VendorRoute;
