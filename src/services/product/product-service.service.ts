/* eslint-disable prettier/prettier */

import { HttpException } from '@exceptions/HttpException';
import { CreateProductServiceDto } from './../../dtos/product-service/product-service.dto';
import { IProductService } from './../../interfaces/Products/products.interface';

import { isEmpty } from '@utils/util';
import productServiceModel from '@/models/products/products.model';



class ProductService {
    public productService = productServiceModel;

    /**
     *Returns all IProductService
     */
    public async findAllProducts(): Promise<IProductService[]> {
        const products: IProductService[] = await this.productService.find();
        return products;
    }

    /**
     *Returns the IProductService with the Id given
     */
    public async findProductById(productId:string) : Promise<IProductService>
    {
       //Check if Id is empty
       if (isEmpty(productId)) throw new HttpException(400, "No Id provided");

       //find IProductService with Id given
       const product:IProductService = await this.productService.findOne({ _id:productId  });

       if(!product) throw new HttpException(409, "IProductService with that Id doesnt exist");

       return product;
    }

    /**
     *Creates a new IProductService
     */


     public async createProduct(productData: CreateProductServiceDto) : Promise<IProductService>{

        //Check if data is empty
       if (isEmpty(productData)) throw new HttpException(400, "No data provided");

       const product: IProductService = await this.productService.findOne({IProductService: productData.product});
       if(product) throw new HttpException(409, `Product with this name ${productData.product} already exists`);

       const newProduct: IProductService = await this.productService.create(productData);
       return newProduct;
     }

     /**
     *Updates existing IProductService 
     */

     public async updateProduct(productId:string,productData)  : Promise<IProductService>{

        //Check if data is empty
        if (isEmpty(productData)) throw new HttpException(400, "No data provided");

        const product: IProductService = await this.productService.findByIdAndUpdate(productId,{productData});
        if(!product) throw new HttpException(409, "IProductService doesn't exist");
         return product;
   }

     public async deleteProduct(productId:string) : Promise<IProductService>{
         const product : IProductService = await this.productService.findByIdAndDelete(productId);
         if(!product) throw new HttpException(409, "Product doesn't exist");
         return product;
     }

}

export default ProductService;
