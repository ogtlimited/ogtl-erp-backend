import ShiftRequestService from '@services/shift/shift_request.service';
import { NextFunction, Request, Response } from 'express';
import { IShiftRequest } from '@interfaces/shift-interface/shift_request.interface';
import { CreateShiftRequestDto, UpdateShiftRequestDto } from '@dtos/shift/shift_request.dto';

class ShiftRequestController {
  public shiftRequestService = new ShiftRequestService();

  //Method for returning all shift requests
  public getShiftRequests= async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const findAllShiftRequests: IShiftRequest[] = await this.shiftRequestService.findAllShiftRequests();
      res.status(200).json({data:findAllShiftRequests, totalShiftRequests: findAllShiftRequests.length, message:"All shift requests"})
    }catch (error) {
      next(error)
    }
  }

  //Method for returning a single shift request
  public getShiftRequestById = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const shiftRequestId:string = req.params.id;
      const findShiftRequest:IShiftRequest = await this.shiftRequestService.findShiftRequestById(shiftRequestId);
      res.status(200).json({data:findShiftRequest, message:"Shift request found successfully"});
    }
    catch (error) {
      next(error)
    }
  }

  //Method for creating shift request
  public createShiftRequest = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const shiftRequestData:CreateShiftRequestDto = req.body;
      const createShiftRequestData: IShiftRequest = await this.shiftRequestService.createShiftRequest(shiftRequestData);
      res.status(201).json({ data: createShiftRequestData, message: 'Shift requests created.' });
    }
    catch (error) {
      next(error)
    }
  }

  //Method for updating shift request
  public updateShiftRequest = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const shiftRequestId:string = req.params.id;
      const shiftRequestData:UpdateShiftRequestDto = req.body;
      const updateShiftRequestData: IShiftRequest = await this.shiftRequestService.updateShiftRequest(shiftRequestId,shiftRequestData);
      res.status(200).json({ data: updateShiftRequestData, message: 'Shift request updated.' });
    }
    catch (error) {
      next(error)
    }
  }

  //Method for deleting shift request
  public deleteShiftRequest= async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shiftRequestId:string = req.params.id;
      const deleteShiftRequest = await this.shiftRequestService.deleteShiftRequest(shiftRequestId)

      res.status(200).json({ data: deleteShiftRequest, message: 'Shift request deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ShiftRequestController;
