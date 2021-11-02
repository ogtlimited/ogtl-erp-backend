/* eslint-disable prettier/prettier */
import { CreateBudgetDto, IncreaseBudgetDto, UpdateBudgetDto } from '@dtos/budget/budget.dto';
import { HttpException } from '@exceptions/HttpException';
import { IBudget, IIncreaseBudget, IUpdateBudget } from '@/interfaces/budget/budget.interface';
import budgetModel  from '@models/budget/budget.model';
import { isEmpty } from '@utils/util';
import { ObjectId } from 'mongodb';
// import departmentModel from '@/models/department/department.model';
// import projectModel from '@/models/project/project.model';
// import { isValidObjectId } from 'mongoose';
import { officeQueryGenerator } from '@/utils/payrollUtil';
import omit from 'lodash/omit'
import expenseHeadModel from '@/models/expense-heads/expense-head.model';

class BudgetService {
  public budgetModel = budgetModel;

  public async findAll(query): Promise<IBudget[]> {
    console.log(query);    
    const officeQuery = officeQueryGenerator(query)
    officeQuery.deleted = false;
    const budgets: any = await this.budgetModel.find(officeQuery,{
        startDate:1,
        endDate:1, 
        budget:1, 
        availableBalance:1,
        approved:1,
        active:1,
    })
    return budgets;
  }

  public async findById(id: string): Promise<IBudget> {
    if (isEmpty(id)) throw new HttpException(400, "provide Id");
    const projections = {createdBy:0, __V:0 }
    let budget:IBudget = await this.budgetModel.findOne({_id: id, deleted: false},{
        startDate:1,
        endDate:1,
        departmentId:1, 
        projectId:1, 
        budget:1, 
        availableBalance:1,
        approved:1,
    })
    if (!budget) {
      throw new HttpException(404, "no record found")
    }

    budget = budget.toObject()
    budget.expenseHeads = await expenseHeadModel.find({budgetId: id}, projections).populate({path: "projectId", select:{project_name:1}}).populate({path: "departmentId", select:{title:1}})
    return budget;
  }


  /* 
  
  - add budget validation based on type
  
  */
  public async create(req, data: CreateBudgetDto): Promise<IBudget> {
    const newData: IBudget = data;
    // const existConstrutor:any = {
    //   startDate: new Date(newData.startDate),
    //   endDate: new Date(newData.endDate)
    // }
    
    // if (data.projectId == null && data.departmentId == null) {
    //     throw  new HttpException(400, "please provide a department or project");
    // }
    // if (data.projectId == null) {
    //   existConstrutor.departmentId = new ObjectId(newData.departmentId)
    // }else{
    //   existConstrutor.projectId = new ObjectId(newData.projectId)
    // }
    // console.log(newData);
    
    const budgetExists = await budgetModel.exists(
      newData
    )
    
    if (budgetExists) {
      throw  new HttpException(409, "budget already exists");
    }

    let budgetAmount = 0;
    
    for (let index = 0; index < newData.expenseHeads.length; index++) {
      budgetAmount += Number(newData.expenseHeads[index].amount);
    }
    newData.createdBy = req.user._id
    newData.budget = budgetAmount
    newData.availableBalance = Number(newData.budget)
    let newBudget  = await budgetModel.create(newData)
    const expenseHeads = newData.expenseHeads.map((expenseHead) => {
      expenseHead.availableBalance = expenseHead.amount;
      expenseHead.startDate = newData.startDate;
      expenseHead.endDate = newData.endDate;
      expenseHead.createdBy = req.user._id;
      expenseHead.budgetId = newBudget._id;
      return expenseHead;
    })
    await expenseHeadModel.insertMany(expenseHeads)
    // console.log(expenseHeads);
    newBudget = omit(newBudget.toObject(), ["createdBy", "deleted"]) 
    return newBudget;
  }

  public async approve(id): Promise<any> {
    const approvebudget  = await budgetModel.findOneAndUpdate({_id:id}, {
        $set: {approved: true, active:true}
    })
    if (!approvebudget) {
        throw  new HttpException(400, "please provide valid budget Id");
    }
    return "budget approved";
  }

  public async update( id, updateData: UpdateBudgetDto): Promise<IBudget> {
    const data: IUpdateBudget = updateData
    const approvebudget  = await budgetModel.findOneAndUpdate({_id:id}, {
        $set: data
    },{new:true})
    if (!approvebudget) {
        throw  new HttpException(400, "please provide valid budget Id");
    }
    return approvebudget;
  }

  public async increaseBudget( id, updateData: IncreaseBudgetDto): Promise<IBudget> {
    const data: IIncreaseBudget = updateData;
    const officeBudget =  await this.findById(id);
    if (!officeBudget.approved) {
        throw new HttpException(401, "cannot increase unapproved budget");
    }
    const newUpdateData: any = {}
    const {availableBalance, budget} = officeBudget
    newUpdateData.availableBalance = Number(availableBalance) + Number(data.amount);
    newUpdateData.budget = Number(budget) + Number(data.amount);
    const approvebudget  = await budgetModel.findOneAndUpdate({_id:id}, {
        $set: newUpdateData
    },{new:true})
    if (!approvebudget) {
        throw  new HttpException(400, "please provide valid budget Id");
    }
    return approvebudget;
  }

  public async deleteBudget(id): Promise<String> {
    await budgetModel.deleteOne({_id : id, approved: false, active:false})
    return 'budget deleted'
  }


}

export default BudgetService;


