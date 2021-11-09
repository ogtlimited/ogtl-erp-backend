/* eslint-disable prettier/prettier */
import { CreateExpenseHeadDraftDto } from '@dtos/expense-head-draft/expense-head-draft.dto';
import { HttpException } from '@exceptions/HttpException';
import { IExpenseHeadDraft } from '@/interfaces/expense-head-draft/expense-head-draft.interface';
import { isEmpty } from '@utils/util';
import departmentModel from '@/models/department/department.model';
import projectModel from '@/models/project/project.model';
import { officeQueryGenerator } from '@/utils/payrollUtil';
import omit from 'lodash/omit'
import expenseHeadDraftModel from "@models/expense-heads/expense-head-draft.model";
import { duplicateErrorMessageFormatter } from '@utils/mongoDbErrorFormatter';
// import { duplicateErrorMessageFormatter } from "../../../dist/utils/mongoDbErrorFormatter";

class ExpenseHeadDraftService {
  public expenseHeadDraftModel = expenseHeadDraftModel;

  public async findAll(query): Promise<IExpenseHeadDraft[]> {
    console.log(query);
    const officeQuery = officeQueryGenerator(query)
    officeQuery.deleted = false;
    const drafts: IExpenseHeadDraft[] = await this.expenseHeadDraftModel.find(officeQuery,{
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
          department:1
        }
      });
    return drafts;
  }

  public async findById(id: string): Promise<IExpenseHeadDraft> {
    if (isEmpty(id)) throw new HttpException(400, "provide Id");
    const draft:IExpenseHeadDraft = await this.expenseHeadDraftModel.findOne({_id: id, deleted: false},{
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
    if (!draft) {
      throw new HttpException(404, "no record found")
    }

    return draft;
  }

  public async create(req, data: CreateExpenseHeadDraftDto): Promise<IExpenseHeadDraft> {
    try {
      if (req.body.projectId == null && req.body.departmentId == null) {
        throw  new HttpException(400, "please provide a department or project Id in the query params");
      }
      let officeExists;
      const officeQuery = officeQueryGenerator(req.body)
      const newData: IExpenseHeadDraft = data;
      if (officeQuery.departmentId){
        officeExists = await departmentModel.exists({_id: officeQuery.departmentId});
      }
      if (officeQuery.projectId){
        officeExists = await projectModel.exists({ _id: officeQuery.projectId });
      }

      console.log(officeExists);
      if(!officeExists){
        throw  new HttpException(404, "unable to find office")
      }
      console.log('REQ ',req.body);
      newData.createdBy = req.user._id
      let newdraft  = await expenseHeadDraftModel.create(newData)
      newdraft = omit(newdraft.toObject(), ["createdBy", "deleted"])
      return newdraft;
    }
    catch (error) {
      if (error.code == 11000) {
        throw  new HttpException(409, duplicateErrorMessageFormatter(error.keyPattern))
      }
      if(error.message === "please provide a department or project Id in the query params"){
        throw  new HttpException(400, "please provide a department or project Id in the query params");
      }
      // throw new
      throw new HttpException(500, "unable to perform request");
    }

  }

  public async approve(query, id): Promise<any> {
    const approvedraft  = await expenseHeadDraftModel.findOneAndUpdate({_id:id}, {
      $set: query.approve ? {approved: true, actedOn:true, status: "approved"} : {approved: false, actedOn:true, status: "rejected"}
    })
    if (!approvedraft) {
      throw  new HttpException(400, "please provide valid draft Id");
    }
    return "draft approved";
  }

  public async update( id, updateData): Promise<IExpenseHeadDraft> {
    try {
    const data = updateData
    console.log(data);
    const draft  = await expenseHeadDraftModel.findOneAndUpdate({_id:id}, {
      $set: data
    },{new:true})
    if (!draft) {
      throw  new HttpException(400, "Document may have been acted on by Admin or Please provide valid draft Id");
    }
    return draft;
    }

    catch (error) {
      if (error.code == 11000) {
        throw  new HttpException(409, duplicateErrorMessageFormatter(error.keyPattern))
      }
    }
  }


}

export default ExpenseHeadDraftService;


