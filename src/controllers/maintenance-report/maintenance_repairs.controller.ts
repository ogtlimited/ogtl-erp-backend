/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import MaintenanceAndRepairService from '@services/maintenance-report/maintenance_repair.service';
import { IMaintenanceAndRepairs } from '@interfaces/maintenance-report/maintenance_repairs.interface';
import {
  CreateMaintenanceAndRepairDto,
  UpdateMaintenanceAndRepairDto, UpdateMaintenanceStatus,
} from '@dtos/maintenance-report/maintenance_repairs.dto';

class MaintenanceAndRepairsController {
  public MaintenanceAndRepairsService = new MaintenanceAndRepairService();

  //Method for return all Maintenance And Repairs
  public getMaintenanceAndRepairs = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const findAllMaintenanceAndRepairs: IMaintenanceAndRepairs[] = await this.MaintenanceAndRepairsService.findAllMaintenanceAndRepairs();
      res.status(200).json({data:findAllMaintenanceAndRepairs, totalMaintenanceAndRepairs: findAllMaintenanceAndRepairs.length, message:"All Maintenance And Repairs"})
    }catch (error) {
      next(error)
    }
  }

  //Method for getting one Maintenance And Repairs
  public getMaintenanceAndRepairsById = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const MaintenanceAndRepairsId:string = req.params.id;
      const findMaintenanceAndRepairs:IMaintenanceAndRepairs = await this.MaintenanceAndRepairsService.findMaintenanceAndRepairById(MaintenanceAndRepairsId);
      res.status(200).json({data:findMaintenanceAndRepairs, message:"Maintenance And Repairs data found successfully"})
    }
    catch (error) {
      next(error)
    }
  }

  //Method for creating Maintenance And Repairs
  public createMaintenanceAndRepairs = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const MaintenanceAndRepairsData:CreateMaintenanceAndRepairDto = req.body;
      const createMaintenanceAndRepairsData: IMaintenanceAndRepairs = await this.MaintenanceAndRepairsService.createMaintenanceAndRepair(MaintenanceAndRepairsData);
      res.status(201).json({ data: createMaintenanceAndRepairsData, message: 'Maintenance And Repairs created.' });
    }
    catch (error) {
      next(error)
    }
  }

  //Method for updating Maintenance And Repairs
  public updateMaintenanceAndRepairs = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const MaintenanceAndRepairsId:string = req.params.id;
      const MaintenanceAndRepairsData:UpdateMaintenanceAndRepairDto = req.body;
      const updateMaintenanceAndRepairsData: IMaintenanceAndRepairs = await this.MaintenanceAndRepairsService.updateMaintenanceAndRepair(MaintenanceAndRepairsId,MaintenanceAndRepairsData);
      res.status(200).json({ data: updateMaintenanceAndRepairsData, message: 'Maintenance And Repairs updated.' });
    }
    catch (error) {
      next(error)
    }
  }

  //Method for updating Maintenance And Repairs status
  public updateMaintenanceAndRepairsStatus = async (req, res:Response, next:NextFunction) =>{
    try {
      const MaintenanceAndRepairsId:string = req.params.id;
      const MaintenanceAndRepairsStatus:UpdateMaintenanceStatus = req.body;
      const updateMaintenanceAndRepairsData: IMaintenanceAndRepairs = await this.MaintenanceAndRepairsService.updateMaintenanceStatus(req.user,MaintenanceAndRepairsId,MaintenanceAndRepairsStatus);
      res.status(200).json({ data: updateMaintenanceAndRepairsData, message: 'Maintenance And Repairs status updated.' });
    }
    catch (error) {
      next(error)
    }
  }

  //Method for deleting Maintenance And Repairs
  public deleteMaintenanceAndRepairs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const MaintenanceAndRepairsId:string = req.params.id;
      const deleteMaintenanceAndRepairs = await this.MaintenanceAndRepairsService.deleteMaintenanceAndRepair(MaintenanceAndRepairsId);

      res.status(200).json({ data: deleteMaintenanceAndRepairs, message: 'Maintenance And Repairs deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default MaintenanceAndRepairsController;
