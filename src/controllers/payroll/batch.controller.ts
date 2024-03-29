/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import BatchServices from "@/services/payroll/batch.service";

class BatchController {
    
    public batchService = new BatchServices();
    public findAllBatches = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const findAllBatches = await this.batchService.findAllBatches(req.query);
        res.status(200).json({ data: findAllBatches});
      } catch (error) {
        next(error);
      }
    };
  
    public findBatchById = async (req:Request, res:Response, next:NextFunction) =>{
      try {
        const batchID:string = req.params.id;
        const findbatch:any = await this.batchService.findBatchById(batchID);
        res.status(200).json({data:findbatch, message:"Batch found successfully"})
      }
      catch (error) {
        next(error)
      }
    }

}

export default BatchController;