/* eslint-disable prettier/prettier */
import { HttpException } from '@exceptions/HttpException';
import { CreatePromotionDto, UpdatePromotionDto } from '@dtos/employee-lifecycle/promotion.dto';
import { IPromotion } from '@/interfaces/employee-lifecycle/promotion.interface';
import promotionModel  from '@models/employee-lifecycle/promotion.model';
import { isEmpty } from '@utils/util';
import EmployeeModel from '@models/employee/employee.model';
import { Employee } from '@interfaces/employee-interface/employee.interface';
import { IWarningLetter } from '@interfaces/pip-interface/warning_letter.interface';


class PromotionService {
  public promotionModel = promotionModel;
  public employeeModel = EmployeeModel;

  public async findAllPromotions(): Promise<IPromotion[]> {
    const promotions = await this.promotionModel.find().populate("employee newDesignation");
    return promotions;
  }

  //Method for getting all promotion Letters for an individual employee
  public async findAllPromotionsForAnEmployee(employeeId: string): Promise<IPromotion[]> {
    //Check if employee id is empty
    if (isEmpty(employeeId)) throw new HttpException(400, `Employee Id not provided`);
    //return promotions
    return this.promotionModel.find({ employee: employeeId }).populate('employee');
  }


  public async findPromotionById(id: string): Promise<IPromotion> {
    if (isEmpty(id)) throw new HttpException(400, "provide Id");
    const findPromotion: IPromotion = await this.promotionModel.findOne({ _id: id }).populate("employee newDesignation");
    if (!findPromotion) throw new HttpException(404, "no record found");
    return findPromotion;
  }

  public async createPromotion(data: CreatePromotionDto): Promise<IPromotion> {
    if (isEmpty(data)) throw new HttpException(400, "Bad request");
    //checks if employee exists
    const findEmployeeById: Employee = await this.employeeModel.findOne({ _id:data.employee }).populate("employee");
    if (!findEmployeeById) throw new HttpException(404, 'Employee does not exist!');
    const createdata = await this.promotionModel.create(data);
    if(createdata){
      await this.employeeModel.findOneAndUpdate(
          {_id:data.employee },
          {$set : {designation:data.newDesignation}},
          {new : true}
      );
  }
    return createdata;
  }

  public async updatePromotion(PromotionId:string,PromotionData:UpdatePromotionDto) : Promise<IPromotion>{
    //Check if data is empty
   if (isEmpty(PromotionData)) throw new HttpException(400, "No data provided");
   const updatePromotionById: IPromotion = await this.promotionModel.findByIdAndUpdate(PromotionId,{PromotionData});
   if(!updatePromotionById) throw new HttpException(409,"Promotion does not exist");
   return updatePromotionById;
}

public async deletePromotion(PromotionId:string): Promise<IPromotion>{
  //checks if
  const deletePromotionById: IPromotion = await this.promotionModel.findByIdAndDelete(PromotionId);
  if(!deletePromotionById) throw new HttpException(409,"Promotion does not exist");
   return deletePromotionById;
}

}

export default PromotionService;
