/* eslint-disable prettier/prettier */
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import maintenanceAndRepairModel from '@models/maintenance-report/maintenance_repairs.model';
import { IMaintenanceAndRepairs } from '@interfaces/maintenance-report/maintenance_repairs.interface';
import {
  CreateMaintenanceAndRepairDto,
  UpdateMaintenanceAndRepairDto,
} from '@dtos/maintenance-report/maintenance_repairs.dto';

class MaintenanceAndRepairService {
  public MaintenanceAndRepair = maintenanceAndRepairModel;

  //Method for finding all Maintenance And Repairs
  public async findAllMaintenanceAndRepairs(): Promise<IMaintenanceAndRepairs[]>{
    return this.MaintenanceAndRepair.find().populate("asset_id");
  }

  //Method for finding a single Maintenance And Repairs
  public async findMaintenanceAndRepairById(MaintenanceAndRepairId: string): Promise<IMaintenanceAndRepairs>{
    //check if no Maintenance And Repairs id is empty
    if(isEmpty(MaintenanceAndRepairId)) throw new HttpException(400,`Maintenance And Repairs details not provided`);
    //find Maintenance And Repairs using the id provided
    const findMaintenanceAndRepair:IMaintenanceAndRepairs = await this.MaintenanceAndRepair.findOne({_id:MaintenanceAndRepairId}).populate("asset_id");
    //throw error if Maintenance And Repairs does not exist
    if(!findMaintenanceAndRepair) throw new HttpException(409,`Maintenance And Repairs with Id:${MaintenanceAndRepairId}, does not exist`);
    //return Maintenance And Repairs
    return findMaintenanceAndRepair;
  }

  //Method for creating Maintenance And Repairs
  public async createMaintenanceAndRepair(MaintenanceAndRepairData: CreateMaintenanceAndRepairDto): Promise<IMaintenanceAndRepairs>{
    //check if Maintenance And Repairs data is empty
    if (isEmpty(MaintenanceAndRepairData)) throw new HttpException(400, "Bad request")
    // return created Maintenance And Repairs
    return await this.MaintenanceAndRepair.create(MaintenanceAndRepairData);
  }

  //Method for updating Maintenance And Repairs
  public async updateMaintenanceAndRepair(MaintenanceAndRepairId: string,MaintenanceAndRepairData: UpdateMaintenanceAndRepairDto):Promise<IMaintenanceAndRepairs>{
    //check if no Maintenance And Repairs data is empty
    if (isEmpty(MaintenanceAndRepairData)) throw new HttpException(400, "Bad request");
    const findMaintenanceAndRepair: IMaintenanceAndRepairs = await this.MaintenanceAndRepair.findOne({_id:MaintenanceAndRepairId})
    if(!findMaintenanceAndRepair) throw new HttpException(409,"Maintenance And Repairs does not exist")
    //find Maintenance And Repairs using the id provided and update it
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const updateMaintenanceAndRepairById:IMaintenanceAndRepairs = await this.MaintenanceAndRepair.findByIdAndUpdate(MaintenanceAndRepairId,MaintenanceAndRepairData,{new:true})
    if (!updateMaintenanceAndRepairById) throw new HttpException(409, "Maintenance And Repairs could not be updated");
    // return updated Maintenance And Repairs
    return updateMaintenanceAndRepairById;
  }

  //Method for deleting Maintenance And Repairs
  public async deleteMaintenanceAndRepair(MaintenanceAndRepairId: string):Promise<IMaintenanceAndRepairs>{
    //find Maintenance And Repairs using the id provided and delete
    const deleteMaintenanceAndRepairById: IMaintenanceAndRepairs = await this.MaintenanceAndRepair.findByIdAndDelete(MaintenanceAndRepairId);
    if(!deleteMaintenanceAndRepairById) throw new HttpException(409, `Maintenance And Repairs with Id:${MaintenanceAndRepairId}, does not exist`);
    return deleteMaintenanceAndRepairById;
  }
}

export default MaintenanceAndRepairService;
