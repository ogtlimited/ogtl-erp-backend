/* eslint-disable prettier/prettier */
import { CreateSalaryComponentDto } from '@dtos/payroll/salary-component.dto';
import { HttpException } from '@exceptions/HttpException';
import { ISalaryComponent } from '@/interfaces/payroll/salary-component.interface';
import salaryComponentModel  from '@models/payroll/salary-component.model';
import { isEmpty } from '@utils/util';
import {ObjectId} from 'mongodb';
import { duplicateErrorMessageFormatter } from '@/utils/mongoDbErrorFormatter';
import { officeQueryGenerator } from '@/utils/payrollUtil';

class SalaryComponentService {
  public salaryComponentModel = salaryComponentModel;

  public async findAll(query): Promise<ISalaryComponent[]> {
    const dbQuery = officeQueryGenerator(query)
    console.log(dbQuery)
    const salaryComponents = await this.salaryComponentModel.find(dbQuery).populate("projectId departmentId");
    return salaryComponents;
  }

  public async findById(id: string): Promise<ISalaryComponent> {
    if (isEmpty(id)) throw new HttpException(400, "provide Id");
    const salaryComponent: ISalaryComponent = await this.salaryComponentModel.findOne({ _id: id }).populate("projectId departmentId");
    if (!salaryComponent) throw new HttpException(404, "no record found");
    return salaryComponent;
  }

  public async create(data: CreateSalaryComponentDto): Promise<ISalaryComponent> {
    try {
      if (isEmpty(data)) throw new HttpException(400, "Bad request");
      const createdata:any = await this.salaryComponentModel.create(data);
      return createdata;
    } catch (error) {
      if (error.code === 11000) {
         throw new HttpException(409, duplicateErrorMessageFormatter(error.keyPattern) )
      }
      throw error
    }
  }

//   public async updateIncentiveType(data: CreateSalaryComponentDto): Promise<ISalaryComponent> {

//     if (isEmpty(data)) throw new HttpException(400, "Bad request");
//     const createdata = await this.salaryComponentModel.create(data);
//     const response: ISalaryComponent =  omit(createdata.toObject(), ["employeeId"])
//     return response;
//   }

}

export default SalaryComponentService;
