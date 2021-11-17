/* eslint-disable prettier/prettier */
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { CreatePurchaseOrderDto, UpdatePurchaseOrderDto,UpdatePurchaseStatus  } from '@/dtos/asset/purchase-order.dto';
import { purchaseOrder } from '@/interfaces/assets/purchase-order.interface';
import PurchaseOrderModel from '@/models/assets/purchase-order.model';
import { Designation } from '@/interfaces/employee-interface/designation.interface';
import DesignationModel from '@models/employee/designation.model';


class PurchaseOrderService{
    public PurchaseOrder = PurchaseOrderModel;

    public async findAllPurchaseOrders(): Promise<purchaseOrder[]> { 
        const Asset: purchaseOrder[] = await this.PurchaseOrder.find()
        .populate({path: "projectId",
        select:{
          project_name:1,
        }})
        .populate({path: "departmentId",
        select:{
          department:1,
        }})
        .populate({path: "location",
        select:{
          branch:1,
        }});
        return Asset;
        
    }
    public async findPurchaseOrderById(PurchaseOrderId:string) : Promise<purchaseOrder>
    {
       //Check if Id is empty
       if (isEmpty(PurchaseOrderId)) throw new HttpException(400, "No Id provided");

       //find Assets with Id given
       const findPurchaseOrder:purchaseOrder = await this.PurchaseOrder.findOne({  _id: PurchaseOrderId}).populate("location departmentId projectId");

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

        const updatePurchaseOrderById: purchaseOrder = await this.PurchaseOrder.findByIdAndUpdate(PurchaseOrderId,PurchaseOrderData,{new : true});
        if(!updatePurchaseOrderById) throw new HttpException(409, "PurchaseOrder doesn't exist");
         return updatePurchaseOrderById;
   }


   public async updatepurchaseOrderStatus(user,purchaseOrderId: string, purchaseOrderStatus:UpdatePurchaseStatus):Promise<purchaseOrder>{
    //check if no purchaseOrder data is empty
    console.log(purchaseOrderStatus)
    const getUserDesignation:Designation = await DesignationModel.findOne({_id:user.designation},{designation:1})
    if (isEmpty(purchaseOrderStatus)) throw new HttpException(400, "Bad request");

    const findpurchaseOrder: purchaseOrder = await this.PurchaseOrder.findOne({_id:purchaseOrderId})
    if(!findpurchaseOrder) throw new HttpException(409,"purchaseOrder And Repairs does not exist")

    if(getUserDesignation.designation === "Accountant"){
      await this.PurchaseOrder.findOneAndUpdate({_id: purchaseOrderId}, {$set: {status:"Approved by Accountant"}}, { new: true })
    }
    else if(getUserDesignation.designation === "COO"){
      await this.PurchaseOrder.findOneAndUpdate({_id: purchaseOrderId}, {$set: {status:"Approved by COO"}}, { new: true })
    }else if(getUserDesignation.designation === "CEO"){
      await this.PurchaseOrder.findOneAndUpdate({_id: purchaseOrderId}, {$set: {status:"Approved by CEO"}}, { new: true })
    }else{
      throw new HttpException(404,"You do not have the authorization to execute this update")
    }
    return findpurchaseOrder
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
