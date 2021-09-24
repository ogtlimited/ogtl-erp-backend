/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreatePurchaseOrderDto, UpdatePurchaseOrderDto, UpdatePurchaseStatus } from '@/dtos/asset/purchase-order.dto';
import { purchaseOrder } from '@/interfaces/assets/purchase-order.interface';
import PurchaseOrderService from '@/services/assets/purchase-order.service';

class PurchaseOrderController {
  public PurchaseOrderService = new PurchaseOrderService();

  public getPurchaseOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllPurchaseOrder: purchaseOrder[] = await this.PurchaseOrderService.findAllPurchaseOrders();

      res.status(200).json({ data: findAllPurchaseOrder, numPurchaseOrders: findAllPurchaseOrder.length, message: 'All Purchase Orders' });
    } catch (error) {
      next(error);
    }
  };

  public CreatePurchaseOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const PurchaseOrderData: CreatePurchaseOrderDto = req.body;
      const createPurchaseOrderData: purchaseOrder = await this.PurchaseOrderService.createPurchaseOrder(PurchaseOrderData);
      res.status(201).json({ data: createPurchaseOrderData, message: 'PurchaseOrder  successfully created' });
    } catch (error) {
      next(error);
    }
  };

  public getPurchaseOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const PurchaseOrderId: string = req.params.id;
      const findOnePurchaseOrderData: purchaseOrder = await this.PurchaseOrderService.findPurchaseOrderById(PurchaseOrderId);
      res.status(200).json({ data: findOnePurchaseOrderData, message: 'All Purchase Orders' });
    } catch (error) {
      next(error);
    }
  };

  //update PurchaseOrder
  public updatePurchaseOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const PurchaseOrderId: string = req.params.id;
      const PurchaseOrderData: UpdatePurchaseOrderDto = req.body;
      const updatePurchaseOrderData: purchaseOrder = await this.PurchaseOrderService.updatePurchaseOrder(PurchaseOrderId, PurchaseOrderData);
      res.status(200).json({ data: updatePurchaseOrderData, message: 'Purchase Order  Updated' });
    } catch (error) {
      next(error);
    }
  };

  public updatePurchaseOrderStatus = async (req, res:Response, next:NextFunction) =>{
    try {
      const PurchaseOrderId:string = req.params.id;
      const PurchaseOrderStatus:UpdatePurchaseStatus = req.body;
      const updatePurchaseOrderData: purchaseOrder = await this.PurchaseOrderService.updatepurchaseOrderStatus(req.user,PurchaseOrderId,PurchaseOrderStatus);
      res.status(200).json({ data: updatePurchaseOrderData, message: 'Purchase status updated.' });
    }
    catch (error) {
      next(error)
    }
  }
  //deletes PurchaseOrder
  public deletePurchaseOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const PurchaseOrderId: string = req.params.id;
      const deletePurchaseOrderData: purchaseOrder = await this.PurchaseOrderService.deletePurchaseOrder(PurchaseOrderId);
      res.status(200).json({ data: deletePurchaseOrderData, message: 'Purchase Order  Deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default PurchaseOrderController;
