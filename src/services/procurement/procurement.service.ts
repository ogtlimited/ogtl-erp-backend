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
import expenseHeadModel from "@models/expense-heads/expense-head-draft.model";
import exp from "constants";

/* TODO: services
*  expense head
*
*/
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
          _id:1,
          title:1
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

    newData.createdBy = req.user._id
    newData.expenseHeadId =  req.query.expenseHeadId
    officeQuery.approved = true
    officeQuery._id = req.query.expenseHeadId

    newData.amount = Number(newData.unitCost) * Number(newData.productQuantity)
    const expenseHead = await  expenseHeadModel.findOne(officeQuery, {availableBalance: 1, flagAlert:1, amount:1, budgetId:1});
    if(newData.amount > expenseHead.availableBalance){
      throw new HttpException(401, "proposed procurement exceeds current expense head")
    }
    const newAvailableBalance = Number(expenseHead.availableBalance) - Number(newData.amount)
    if(newAvailableBalance > Number(expenseHead.amount) * (Number(expenseHead.flagAlert)/100) ){
      console.log("exceeding budget!")
    }

    const officeBudget = await budgetModel.findOne(expenseHead.budgetId)
    if (!officeBudget) {
      throw new HttpException(404, "no approved budget available.")
    }

     await budgetModel.findByIdAndUpdate({_id: officeBudget._id}, {$set: {availableBalance: Number(officeBudget.availableBalance) - Number(newData.amount) }})
     await expenseHeadModel.findByIdAndUpdate({_id: officeQuery._id}, {$set: {availableBalance: newAvailableBalance }})
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


