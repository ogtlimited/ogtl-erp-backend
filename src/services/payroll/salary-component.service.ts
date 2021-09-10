/* eslint-disable prettier/prettier */
import { CreateSalaryComponentDto } from '@dtos/payroll/salary-component.dto';
import { HttpException } from '@exceptions/HttpException';
import { ISalaryComponent } from '@/interfaces/payroll/salary-component.interface';
import salaryComponentModel  from '@models/payroll/salary-component.model';
import { isEmpty } from '@utils/util';


class SalaryComponentService {
  public salaryComponentModel = salaryComponentModel;

  public async findAll(query): Promise<ISalaryComponent[]> {
    const dbQuery = query.departmentId ? {departmentId: query.departmentId} : {projectId: query.projectId};
    const salaryComponents = await this.salaryComponentModel.find(dbQuery);
    return salaryComponents;
  }

  public async findById(id: string): Promise<ISalaryComponent> {
    if (isEmpty(id)) throw new HttpException(400, "provide Id");
    const salaryComponent: ISalaryComponent = await this.salaryComponentModel.findOne({ _id: id });
    if (!salaryComponent) throw new HttpException(404, "no record found");
    return salaryComponent;
  }

  public async create(data: CreateSalaryComponentDto): Promise<ISalaryComponent> {
    if (isEmpty(data)) throw new HttpException(400, "Bad request");
    const createdata = await this.salaryComponentModel.create(data);
    return createdata;
  }

//   public async updateIncentiveType(data: CreateSalaryComponentDto): Promise<ISalaryComponent> {

//     if (isEmpty(data)) throw new HttpException(400, "Bad request");
//     const createdata = await this.salaryComponentModel.create(data);
//     const response: ISalaryComponent =  omit(createdata.toObject(), ["employeeId"])
//     return response;
//   }

}

export default SalaryComponentService;
