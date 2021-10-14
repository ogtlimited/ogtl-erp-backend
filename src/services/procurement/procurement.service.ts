/* eslint-disable prettier/prettier */
import { CreateProcurementDto, UpdateProcurementDto } from '@dtos/procurement/procurement.dto';
import { HttpException } from '@exceptions/HttpException';
import { IProcurement,  IUpdateProcurement } from '@/interfaces/procurement/procurement.interface';
import procurementModel  from '@models/procurement/procurement.model';
import { isEmpty } from '@utils/util';
import departmentModel from '@/models/department/department.model';
import projectModel from '@/models/project/project.model';
import { officeQueryGenerator } from '@/utils/payrollUtil';
import omit from 'lodash/omit'

class ProcurementService {
  public procurementModel = procurementModel;

  public async findAll(query): Promise<IProcurement[]> {
    console.log(query);    
    const officeQuery = officeQueryGenerator(query)
    officeQuery.deleted = false;
    const procurements = await this.procurementModel.find(officeQuery,{
        updatedBy:0,
    })
    .populate({
      path:"projectId", 
      select:{
        _id:0, 
        project_name:1
      }}).populate({
        path:"departmentId", 
        select:{
          _id:0, 
          department:1
      }
    });
    return procurements;
  }

  public async findById(id: string): Promise<IProcurement> {
    if (isEmpty(id)) throw new HttpException(400, "provide Id");
    const procurement:IProcurement = await this.procurementModel.findOne({_id: id, deleted: false},{
        updatedBy:1
    })
    .populate({
      path:"projectId", 
      select:{
        _id:0, 
        project_name:1
      }}).populate({
        path:"departmentId", 
        select:{
          _id:0, 
          department:1
      }
    });
    if (!procurement) {
      throw new HttpException(404, "no record found")
    }

    return procurement;
  }

  public async create(req, data: CreateProcurementDto): Promise<IProcurement> {
    const office: any = {}
    const newData: IProcurement = data;
    if (data.projectId == null && data.departmentId == null) {
        throw  new HttpException(400, "please provide a department or project");
    }
    if (data.projectId == null) {
        office.departmentId = data.departmentId;
    }
    newData.createdBy = req.user._id
    newData.amount = Number(newData.unitCost) * Number(newData.productQuantity)
    let newprocurement  = await procurementModel.create(newData)
    newprocurement = omit(newprocurement.toObject(), ["createdBy", "deleted"]) 

    return newprocurement;
  }

  public async approve(id): Promise<any> {
    const approveprocurement  = await procurementModel.findOneAndUpdate({_id:id}, {
        $set: {approved: true}
    })
    if (!approveprocurement) {
        throw  new HttpException(400, "please provide valid procurement Id");
    }
    return "procurement approved";
  }

  public async update( id, updateData): Promise<IProcurement> {
    const data: IProcurement = updateData
    const approveprocurement  = await procurementModel.findOneAndUpdate({_id:id}, {$set: data}, {new:true})
    if (!approveprocurement) {
        throw  new HttpException(400, "please provide valid procurement Id");
    }
    return approveprocurement;
  }


}

export default ProcurementService;


