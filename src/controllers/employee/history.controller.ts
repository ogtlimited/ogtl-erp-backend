/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateHistoryDto, UpdateHistoryDto } from '@/dtos/employee/history.dto';
import { History } from '@/interfaces/employee-interface/history.interface';
import HistoryService from '@/services/employee/history.service';


class HistoryController{
    public HistoryService = new HistoryService();

    //Returns all Historys
   public getHistorys = async  (req: Request, res: Response, next: NextFunction) => {
    try{
        const findAllHistorysData: History[] = await this.HistoryService.findAllHistory();
         
        res.status(200).json({data:findAllHistorysData,numHistorys:findAllHistorysData.length, message:"All History"});
    }
    catch(error){
        next(error);
    }
   };


   //creates History
  public CreateHistory = async  (req: Request, res: Response, next: NextFunction) => {
        try{
            const HistoryData: CreateHistoryDto = req.body;
            const createHistoryData: History = await this.HistoryService.createHistory(HistoryData);
            res.status(201).json({ data: createHistoryData, message: 'History succesfully created' });
        }
        catch(error){
        next(error);
        }
    };

//gets one History with Id given
   public getHistoryById = async  (req: Request, res: Response, next: NextFunction) => {
       try{
          const HistoryId: string = req.params.id;
          const findOneHistoryData: History[] = await this.HistoryService.findHistoryById(HistoryId);
          res.status(200).json({data:findOneHistoryData, message:"All Historys"});
       }
       catch(error){
        next(error);
       }
  };


  //update History
   public updateHistory = async  (req: Request, res: Response, next: NextFunction) => {
    try{
        const HistoryId: string = req.params.id;
        const HistoryData: UpdateHistoryDto = req.body;
        const updateHistoryData: History = await this.HistoryService.updateHistory(HistoryId,HistoryData);
        res.status(200).json({data:updateHistoryData, message:"History Updated"});
    }
    catch(error){
     next(error);
    }
};
   //deletes History
    public deleteHistory= async  (req: Request, res: Response, next: NextFunction) => {
        try{
            const HistoryId: string = req.params.id;
            const deleteHistoryData: History = await this.HistoryService.deleteHistory(HistoryId);
            res.status(200).json({data:deleteHistoryData, message:"History Deleted"});
        }
        catch(error){
         next(error);
        }
   
};

}
export default HistoryController;