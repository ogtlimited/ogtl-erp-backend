/* eslint-disable prettier/prettier */
import { CreateProductServiceDto } from '@/dtos/product-service/product-service.dto';
import { IProductService } from '@/interfaces/Products/products.interface';
import ProductService from '@/services/product/product-service.service';
import { NextFunction, Request, Response } from 'express';


class ProductServiceController {
  public ProductServiceService = new ProductService();

  //Returns all Products
  public getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllProductsData: IProductService[] = await this.ProductServiceService.findAllProducts();

      res.status(200).json({ data: findAllProductsData, numProducts: findAllProductsData.length, message: 'All Products' });
    } catch (error) {
      next(error);
    }
  };

  //creates ProductService
  public CreateProductService = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ProductServiceData: CreateProductServiceDto = req.body;
      const createProductServiceData: IProductService = await this.ProductServiceService.createProduct(ProductServiceData);
      res.status(201).json({ data: createProductServiceData, message: 'ProductService succesfully created' });
    } catch (error) {
      next(error);
    }
  };

  //gets one ProductService with Id given
  public getProductServiceById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ProductServiceId: string = req.params.id;
      const findOneProductServiceData: IProductService = await this.ProductServiceService.findProductById(ProductServiceId);
      res.status(200).json({ data: findOneProductServiceData, message: 'All Products' });
    } catch (error) {
      next(error);
    }
  };

  //update ProductService
  public updateProductService = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ProductServiceId: string = req.params.id;
      const ProductServiceData = req.body;
      const updateProductServiceData: IProductService = await this.ProductServiceService.updateProduct(ProductServiceId, ProductServiceData);
      res.status(200).json({ data: updateProductServiceData, message: 'ProductService Updated' });
    } catch (error) {
      next(error);
    }
  };
  //deletes ProductService
  public deleteProductService = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ProductServiceId: string = req.params.id;
      const deleteProductServiceData: IProductService = await this.ProductServiceService.deleteProduct(ProductServiceId);
      res.status(200).json({ data: deleteProductServiceData, message: 'ProductService Deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductServiceController;
