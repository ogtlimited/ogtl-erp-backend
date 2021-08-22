/* eslint-disable prettier/prettier */
import { CreateSalaryStructureDto } from '@dtos/payroll/salary-structure.dto';
import { HttpException } from '@exceptions/HttpException';
import { ISalaryStructure } from '@/interfaces/payroll/salary-structure.interface';
import  salaryStructureModel from '@models/payroll/salary-structure.model';
import { isEmpty } from '@utils/util';
// import omit from 'lodash/omit'

class SalaryStructureService {
  public salaryStructureModel = salaryStructureModel;

  public async findAll(): Promise<ISalaryStructure[]> {
    const salaryStructures = await this.salaryStructureModel.find();
    return salaryStructures;
  }

  public async findById(id: string): Promise<ISalaryStructure> {
    if (isEmpty(id)) throw new HttpException(400, "provide attendance Id");

    const salaryStructure: ISalaryStructure = await this.salaryStructureModel.findOne({ _id: id });
    if (!salaryStructure) throw new HttpException(404, "no record found");
    return salaryStructure;
  }

  public async create(data: CreateSalaryStructureDto): Promise<ISalaryStructure> {

    if (isEmpty(data)) throw new HttpException(400, "Bad request");
    const createdata = await this.salaryStructureModel.create(data);
    return createdata;
  }

//   public async updateIncentiveType(data: CreateSalaryStructureDto): Promise<ISalaryStructure> {

//     if (isEmpty(data)) throw new HttpException(400, "Bad request");
//     const createdata = await this.salaryStructureModel.create(data);
//     const response: ISalaryStructure =  omit(createdata.toObject(), ["employeeId"])
//     return response;
//   }

}

export default SalaryStructureService;
