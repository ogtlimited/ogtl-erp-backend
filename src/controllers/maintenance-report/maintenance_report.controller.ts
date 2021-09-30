/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import MaintenanceReportService from '@services/maintenance-report/maintenance_report.service';
import { IMaintenanceReport } from '@interfaces/maintenance-report/maintenance_report.interface';
import {
  CreateMaintenanceReportDto,
  UpdateMaintenanceReportDto,
} from '@dtos/maintenance-report/maintenance_report.dto';

class MaintenanceReportController {
  public MaintenanceReportService = new MaintenanceReportService();

  //Method for return all Maintenance Report
  public getMaintenanceReports = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const findAllMaintenanceReports: IMaintenanceReport[] = await this.MaintenanceReportService.findAllMaintenanceReports();
      res.status(200).json({data:findAllMaintenanceReports, totalMaintenanceReports: findAllMaintenanceReports.length, message:"All Maintenance Reports"})
    }catch (error) {
      next(error)
    }
  }

  //Method for getting one Maintenance Report
  public getMaintenanceReportById = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const MaintenanceReportId:string = req.params.id;
      const findMaintenanceReport:IMaintenanceReport = await this.MaintenanceReportService.findMaintenanceReportById(MaintenanceReportId);
      res.status(200).json({data:findMaintenanceReport, message:"Maintenance Report found successfully"})
    }
    catch (error) {
      next(error)
    }
  }

  //Method for creating Maintenance Report
  public createMaintenanceReport = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const MaintenanceReportData:CreateMaintenanceReportDto = req.body;
      const createMaintenanceReportData: IMaintenanceReport = await this.MaintenanceReportService.createMaintenanceReport(MaintenanceReportData);
      res.status(201).json({ data: createMaintenanceReportData, message: 'Maintenance Report created.' });
    }
    catch (error) {
      next(error)
    }
  }

  //Method for updating Maintenance Report
  public updateMaintenanceReport = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const MaintenanceReportId:string = req.params.id;
      const MaintenanceReportData:UpdateMaintenanceReportDto = req.body;
      const updateMaintenanceReportData: IMaintenanceReport = await this.MaintenanceReportService.updateMaintenanceReport(MaintenanceReportId,MaintenanceReportData);
      res.status(200).json({ data: updateMaintenanceReportData, message: 'Maintenance Report updated.' });
    }
    catch (error) {
      next(error)
    }
  }

  //Method for deleting Maintenance Report
  public deleteMaintenanceReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const MaintenanceReportId:string = req.params.id;
      const deleteMaintenanceReport = await this.MaintenanceReportService.deleteMaintenanceReport(MaintenanceReportId);

      res.status(200).json({ data: deleteMaintenanceReport, message: 'Maintenance Report deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default MaintenanceReportController;
