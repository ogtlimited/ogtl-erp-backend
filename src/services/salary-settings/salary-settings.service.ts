/* eslint-disable prettier/prettier */
import {HttpException} from '@exceptions/HttpException';
import salarySettingModel from '@models/salary-setting/salary-setting.model';
import {isEmpty} from '@utils/util';
import {CreateSalarySettingDto, UpdateSalarySettingDto} from "@dtos/salary-settings/salary-settings.dto";
import {UpdateBudgetDto} from "@dtos/budget/budget.dto";
import {IBudget, IUpdateBudget} from "@interfaces/budget/budget.interface";
import {ISalarySetting} from "@interfaces/salary-settings/salary_settings.interface";


class SalarySettingService {
  public salarySettingModel = salarySettingModel;

  public async findAll() {
    let data =  await this.salarySettingModel.find();
    return data
  }

  public async findById(id: string){
    if (isEmpty(id)) throw new HttpException(400, "provide Id");
    const salarySetting = await this.salarySettingModel.findOne({ _id: id });
    if (!salarySetting) throw new HttpException(404, "no record found");
    return salarySetting;
  }

  public async create(data: CreateSalarySettingDto){
    if (isEmpty(data)) throw new HttpException(400, "Bad request");
    return await this.salarySettingModel.create(data);
  }

  public async update( id, updateData: UpdateSalarySettingDto): Promise<ISalarySetting> {
    const data: ISalarySetting = updateData
    const updateSalarySetting:ISalarySetting  = await this.salarySettingModel.findOneAndUpdate({_id:id}, {
      $set: data
    },{new:true})
    if (!updateSalarySetting) {
      throw  new HttpException(400, "please provide valid budget Id");
    }
    return updateSalarySetting;
  }

}

export default SalarySettingService;
