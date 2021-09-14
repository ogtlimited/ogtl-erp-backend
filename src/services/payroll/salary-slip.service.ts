/* eslint-disable prettier/prettier */
import { CreateSalarySlipDto } from '@dtos/payroll/salary-slip.dto';
import { HttpException } from '@exceptions/HttpException';
import { ISalarySlip } from '@/interfaces/payroll/salary-slip.interface';
import salarySlipModel  from '@models/payroll/salary-slip.model';
import { isEmpty } from '@utils/util';
import departmentModel from '@/models/department/department.model';
import projectModel from '@/models/project/project.model';
import { isValidObjectId } from 'mongoose';
import EmployeeModel from '@/models/employee/employee.model';
import { calculateEmployeeDeductions } from '@/utils/payrollUtil';
// import omit from 'lodash/omit'

class SalarySlipService {
  public salarySlipModel = salarySlipModel;

  public async findAll(): Promise<ISalarySlip[]> {
    const results = await this.salarySlipModel.find();
    return results;
  }

  public async findById(id: string): Promise<ISalarySlip> {
    if (isEmpty(id)) throw new HttpException(400, "provide Id");

    const salarySlip: ISalarySlip = await (await this.salarySlipModel.findOne({ _id: id })).populated('shawarmwa');
    if (!salarySlip) throw new HttpException(404, "no record found");

    return salarySlip;
  }

  public async create(data: CreateSalarySlipDto): Promise<any> {
    if (isEmpty(data)) throw new HttpException(400, "Bad request");
    const projects = await projectModel.find();
    const records = [];
    for (let index = 0; index < projects.length; index++) {
      const project = projects[index];
      // console.log(project);
      const employees:any = await EmployeeModel.find({project_id: project._id},{_id:1, salaryStructure_id:1}).populate('salaryStructure_id');
      if(employees.length<1)
      {
        continue
      }
      for (let index = 0; index < employees.length; index++) {
        const employee = employees[index];
        const salarySlipConstructor:any = {
          employeeId: employee._id,
          salaryStructure: employee.salaryStructure_id._id,
          netPay: employee.salaryStructure_id.netPay,
          project_id: project._id
        }
        const deductions = await calculateEmployeeDeductions(employee,"date",employee.salaryStructure_id)
        if(deductions.hasDeductions)
        {
          salarySlipConstructor.deductions = [...deductions.deductionIds]
          salarySlipConstructor.netPay = deductions.totalAmount
        }
        deductions.employee = employee._id
        records.push(salarySlipConstructor)
      }
    }
    await this.salarySlipModel.insertMany(records);
    return "done";
  }

}

export default SalarySlipService;


