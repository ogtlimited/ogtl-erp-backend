/* eslint-disable prettier/prettier */
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import maintenanceReportModel from '@models/maintenance-report/maintenance_report.model';
import { IMaintenanceReport } from '@interfaces/maintenance-report/maintenance_report.interface';
import {
  CreateMaintenanceReportDto,
  UpdateMaintenanceReportDto,
} from '@dtos/maintenance-report/maintenance_report.dto';

class MaintenanceReportService {
  public MaintenanceReport = maintenanceReportModel;

  //Method for finding all Maintenance Report
  public async findAllMaintenanceReports(): Promise<IMaintenanceReport[]>{
    return this.MaintenanceReport.find().populate("created_by");
  }

  //Method for finding a single Maintenance Report
  public async findMaintenanceReportById(MaintenanceReportId: string): Promise<IMaintenanceReport>{
    //check if no Maintenance Report id is empty
    if(isEmpty(MaintenanceReportId)) throw new HttpException(400,`Maintenance Report details not provided`);
    //find Maintenance Report using the id provided
    const findMaintenanceReport:IMaintenanceReport = await this.MaintenanceReport.findOne({_id:MaintenanceReportId}).populate("created_by");
    //throw error if Maintenance Report does not exist
    if(!findMaintenanceReport) throw new HttpException(409,`Maintenance Report with Id:${MaintenanceReportId}, does not exist`);
    //return Maintenance Report
    return findMaintenanceReport;
  }

  //Method for creating Maintenance Report
  public async createMaintenanceReport(MaintenanceReportData: CreateMaintenanceReportDto): Promise<IMaintenanceReport>{
    //check if Maintenance Report data is empty
    if (isEmpty(MaintenanceReportData)) throw new HttpException(400, "Bad request")
    // return created Maintenance Report
    return await this.MaintenanceReport.create(MaintenanceReportData);
  }

  //Method for updating Maintenance Report
  public async updateMaintenanceReport(MaintenanceReportId: string,MaintenanceReportData: UpdateMaintenanceReportDto):Promise<IMaintenanceReport>{
    //check if no Maintenance Report data is empty
    if (isEmpty(MaintenanceReportData)) throw new HttpException(400, "Bad request");
    const findMaintenanceReport: IMaintenanceReport = await this.MaintenanceReport.findOne({_id:MaintenanceReportId})
    if(!findMaintenanceReport) throw new HttpException(409,"Maintenance report does not exist")
    //find Maintenance Report using the id provided and update it
    const updateMaintenanceReportById:IMaintenanceReport = await this.MaintenanceReport.findByIdAndUpdate(MaintenanceReportId,MaintenanceReportData,{new:true})
    if (!updateMaintenanceReportById) throw new HttpException(409, "Maintenance Report could not be updated");
    // return updated Maintenance Report
    return updateMaintenanceReportById;
  }

  //Method for deleting Maintenance Report
  public async deleteMaintenanceReport(MaintenanceReportId: string):Promise<IMaintenanceReport>{
    //find Maintenance Report using the id provided and delete
    const deleteMaintenanceReportById: IMaintenanceReport = await this.MaintenanceReport.findByIdAndDelete(MaintenanceReportId);
    if(!deleteMaintenanceReportById) throw new HttpException(409, `Maintenance Report with Id:${MaintenanceReportId}, does not exist`);
    return deleteMaintenanceReportById;
  }
}

export default MaintenanceReportService;
