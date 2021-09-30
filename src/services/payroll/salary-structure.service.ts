/* eslint-disable prettier/prettier */
import { CreateSalaryStructureDto, UpdateSalaryStructureDto } from '@dtos/payroll/salary-structure.dto';
import { HttpException } from '@exceptions/HttpException';
import { ISalaryStructure} from '@/interfaces/payroll/salary-structure.interface';
import  salaryStructureModel from '@models/payroll/salary-structure.model';
import { isEmpty } from '@utils/util';
import salaryComponentModel from '@/models/payroll/salary-component.model';
import { calculateNetAndGrossPay, officeQueryGenerator} from '@/utils/payrollUtil';
import { duplicateErrorMessageFormatter } from '@/utils/mongoDbErrorFormatter';
// import omit from 'lodash/omit'

class SalaryStructureService {
  public salaryStructureModel = salaryStructureModel;

  public async findAll(query): Promise<Array<ISalaryStructure>> {
    const dbQuery = officeQueryGenerator(query)
    const salaryStructures = await this.salaryStructureModel.find(dbQuery).populate('deductions earnings projectId departmentId');
    return salaryStructures;
  }

  public async findById(id: string): Promise<ISalaryStructure> {
    if (isEmpty(id)) throw new HttpException(400, "provide attendance Id");
     const salaryStructure: ISalaryStructure = await this.salaryStructureModel.findOne({ _id: id }).populate('deductions earnings projectId departmentId' );
    if (!salaryStructure) throw new HttpException(404, "no record found");
    return salaryStructure;
  }

  public async create(data: ISalaryStructure): Promise<any> {
    try {
      const records = [...data.earnings,...data.deductions]
      const projection = {amount:1, type:1}
      const query = {_id: { $in: records}}
      const componentsData = await salaryComponentModel.find(query,projection);
      const result = calculateNetAndGrossPay(componentsData);
      data.netPay = result.netPay;
      data.grossPay = result.grossPay;
      const newSalaryStructure = await this.salaryStructureModel.create(data);
      return {newSalaryStructure};
    } catch (error) {
      if (error.code === 11000){
        throw new HttpException(409, duplicateErrorMessageFormatter(error.keyPattern) )
     }
     throw error
    }
  }

  public async update(id:string, data: ISalaryStructure): Promise<any>{
    try {
      const records = []
      const projection = {amount:1, type:1}
      if(data.earnings)
      {
        records.push(...data.earnings)
      }
      if(data.deductions)
      {
        records.push(...data.deductions)
      }
      if(records.length > 0)
      {
        const componentsData = await salaryComponentModel.find({_id: { $in: records}},projection);
        const result = calculateNetAndGrossPay(componentsData);
        data.netPay = Number(result.netPay);
        data.grossPay = Number(result.grossPay);
      }
      
      const updateRecord = await this.salaryStructureModel.findOneAndUpdate(
        {
          _id: id
        },
        {
          $set: data
        },
        { new: true })
      
      if (!updateRecord) {
        throw new HttpException(404, "record not found") 
      }
      return updateRecord;
    } catch (error) {
      if (error.code === 11000){
        throw new HttpException(409, duplicateErrorMessageFormatter(error.keyPattern) )
     }
     throw error
    }
  }

  // public async assignSalaries

//   public async updateIncentiveType(data: CreateSalaryStructureDto): Promise<ISalaryStructure> {

//     if (isEmpty(data)) throw new HttpException(400, "Bad request");
//     const createdata = await this.salaryStructureModel.create(data);
//     const response: ISalaryStructure =  omit(createdata.toObject(), ["employeeId"])
//     return response;
//   }

}

export default SalaryStructureService;
