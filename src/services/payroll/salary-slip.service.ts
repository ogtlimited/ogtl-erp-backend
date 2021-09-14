/* eslint-disable prettier/prettier */
import { CreateSalarySlipDto } from '@dtos/payroll/salary-slip.dto';
import { HttpException } from '@exceptions/HttpException';
import { ISalarySlip } from '@/interfaces/payroll/salary-slip.interface';
import salarySlipModel  from '@models/payroll/salary-slip.model';
import { isEmpty } from '@utils/util';
import departmentModel from '@/models/department/department.model';
import projectModel from '@/models/project/project.model';
import { isValidObjectId } from 'mongoose';
// import omit from 'lodash/omit'

class SalarySlipService {
  public salarySlipModel = salarySlipModel;

  public async findAll(): Promise<ISalarySlip[]> {
    const results = await this.salarySlipModel.find();
    return results;
  }

  public async findById(id: string): Promise<ISalarySlip> {
    if (isEmpty(id)) throw new HttpException(400, "provide Id");

    const salarySlip: ISalarySlip = await this.salarySlipModel.findOne({ _id: id });
    if (!salarySlip) throw new HttpException(404, "no record found");

    return salarySlip;
  }

  public async create(data: CreateSalarySlipDto): Promise<any> {



    if (isEmpty(data)) throw new HttpException(400, "Bad request");
    const projects = await projectModel.find();
    // console.log(projects);
    
    // const createdata = await this.salarySlipModel.create(data);
    // const response: ISalarySlip =  omit(createdata.toObject(), [])
    // return createdata;
    return projects;
  }

//   public async updateIncentiveType(data: DTO): Promise<ISalarySlip> {

//     if (isEmpty(data)) throw new HttpException(400, "Bad request");
//     const createdata = await this.salarySlipModel.create(data);
//     const response: ISalarySlip =  omit(createdata.toObject(), ["employeeId"])
//     return response;
//   }

}

export default SalarySlipService;


