/* eslint-disable prettier/prettier */
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { CreatePurchaseOrderDto, UpdatePurchaseOrderDto } from '@/dtos/asset/purchase-order.dto';
import { purchaseOrder } from '@/interfaces/assets/purchase-order.interface';
import PurchaseOrderModel from '@/models/assets/purchase-order.model';


class PurchaseOrderService{
    public PurchaseOrder = PurchaseOrderModel;

    public async findAllPurchaseOrders(): Promise<purchaseOrder[]> { 
        const Asset: purchaseOrder[] = await this.PurchaseOrder.find().populate("branch department project");
        return Asset;
        
    }
    public async findPurchaseOrderById(PurchaseOrderId:string) : Promise<purchaseOrder>
    {
       //Check if Id is empty
       if (isEmpty(PurchaseOrderId)) throw new HttpException(400, "No Id provided");

       //find Assets with Id given
       const findPurchaseOrder:purchaseOrder = await this.PurchaseOrder.findOne({  _id: PurchaseOrderId}).populate("branch department project");

       if(!findPurchaseOrder) throw new HttpException(409, "PurchaseOrder with that Id doesnt exist");

       return findPurchaseOrder;
        
    }

    public async createPurchaseOrder(PurchaseOrderData: CreatePurchaseOrderDto) : Promise<purchaseOrder>{
        
        //Check if data is empty
       if (isEmpty(PurchaseOrderData)) throw new HttpException(400, "No data provided");

      
       const newPurchaseOrderId = this.generatePurchaseOrderID()

       const createPurchaseOrderData: purchaseOrder = await this.PurchaseOrder.create({ ...PurchaseOrderData, purchaseOrderId: newPurchaseOrderId});
       return createPurchaseOrderData;
     }

     public async updatePurchaseOrder(PurchaseOrderId:string,PurchaseOrderData: UpdatePurchaseOrderDto)  : Promise<purchaseOrder>{

        //Check if data is empty
        if (isEmpty(PurchaseOrderData)) throw new HttpException(400, "No data provided");

        const updatePurchaseOrderById: purchaseOrder = await this.PurchaseOrder.findByIdAndUpdate(PurchaseOrderId,PurchaseOrderData);
        if(!updatePurchaseOrderById) throw new HttpException(409, "PurchaseOrder doesn't exist");
         return updatePurchaseOrderById;
   }

     public async deletePurchaseOrder(PurchaseOrderId:string) : Promise<purchaseOrder>{
         const deletePurchaseOrderById : purchaseOrder = await this.PurchaseOrder.findByIdAndDelete(PurchaseOrderId);
         if(!deletePurchaseOrderById) throw new HttpException(409, "PurchaseOrder doesn't exist");
         return deletePurchaseOrderById;
     }
 
     private generatePurchaseOrderID(){
        return "POR"+ Math.floor(1000 + Math.random() * 9000)
      }



}

export default PurchaseOrderService;
