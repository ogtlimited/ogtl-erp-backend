/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

import authMiddleware from '@middlewares/auth.middleware';
import ProductServiceController from '@/controllers/products/product.controller';
import { CreateProductServiceDto, UpdateProductServiceDto } from '@/dtos/product-service/product-service.dto';


class ProductServiceRoute implements Routes {
    public path = '/api/product-service';
    public router = Router();
    public ProductServiceController = new ProductServiceController();
  
    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`,authMiddleware, this.ProductServiceController.getProducts);
        this.router.get(`${this.path}/:id`,authMiddleware, this.ProductServiceController.getProductServiceById);
        this.router.post(`${this.path}` , authMiddleware, validationMiddleware(CreateProductServiceDto, 'body'), this.ProductServiceController.CreateProductService);
        this.router.put(`${this.path}/:id`,authMiddleware, validationMiddleware(UpdateProductServiceDto, 'body', true), this.ProductServiceController.updateProductService);
        this.router.delete(`${this.path}/:id`,authMiddleware, this.ProductServiceController.deleteProductService);
      }
    }

    export default ProductServiceRoute;