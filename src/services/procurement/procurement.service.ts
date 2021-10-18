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
import budgetModel from '@/models/budget/budget.model';
import moment from 'moment';

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
        updatedBy:0
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
    const officeQuery = officeQueryGenerator(req.query)
    const newData: IProcurement = data;
    if (req.query.projectId == null && req.query.departmentId == null) {
        throw  new HttpException(400, "please provide a department or project");
    }
    if (req.query.projectId == null) {
      newData.departmentId = req.query.departmentId;
    }else{
      newData.projectId = req.query.projectId;
    }
    // console.log(officeQuery);
    newData.createdBy = req.user._id
    officeQuery.approved = true
    // new Date(startOfMonth)
    officeQuery.startDate = {$gte: moment().startOf('year').format('YYYY-MM-DD')}
    officeQuery.endDate = {$lte:  moment().endOf('year').format('YYYY-MM-DD')}

    newData.amount = Number(newData.unitCost) * Number(newData.productQuantity)
    const officeBudget = await budgetModel.findOne(officeQuery)
    if (!officeBudget) {
      throw new HttpException(404, "no approved budget available.")
    }
    console.log(officeBudget);
    if (officeBudget.availableBalance < newData.amount) {
      throw new HttpException(400, "request exceeds available budget")
    }

    await budgetModel.findByIdAndUpdate({_id: officeBudget._id}, {$set: {availableBalance: Number(officeBudget.availableBalance) - Number(newData.amount) }})
    let newprocurement  = await procurementModel.create(newData)
    newprocurement = omit(newprocurement.toObject(), ["createdBy", "deleted"]) 

    return newprocurement;
  }

  public async approve(query, id): Promise<any> {
    const approveprocurement  = await procurementModel.findOneAndUpdate({_id:id}, {
        $set: query.approve ? {approved: true, actedOn:true, status: "approved"} : {approved: false, actedOn:true, status: "rejected"}
    })
    if (!approveprocurement) {
        throw  new HttpException(400, "please provide valid procurement Id");
    }
    return "procurement approved";
  }

  public async update( id, updateData): Promise<IProcurement> {
    const data: IProcurement = updateData
    const procurement  = await procurementModel.findOneAndUpdate({_id:id, actedOn:false}, {$set: data}, {new:true})
    if (!procurement) {
        throw  new HttpException(400, "Document may have been acted on by Admin or Please provide valid procurement Id");
    }
    return procurement;
  }


}

export default ProcurementService;


