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
import { calculateEmployeeDeductions, officeQueryGenerator } from '@/utils/payrollUtil';
// import omit from 'lodash/omit'

class SalarySlipService {
  public salarySlipModel = salarySlipModel;

  public async findAll(query): Promise<ISalarySlip[]> {
    console.log(query);
    
    const officeQuery = officeQueryGenerator(query)
    const results = await this.salarySlipModel.find(officeQuery,{employeeId:1,_id:1,netPay:1, projectId:1, departmentId:1, createdAt:1})
    .populate({path:'employeeId', select:{
      first_name:1, 
      last_name:1, 
      ogid:1, 
      designation:1, 
      company_email:1,
      middle_name:1,
      date_of_joining:1,
    }, 
      populate:{
        path:'designation', 
        model:'Designation', 
        select:{_id:0, designation:1}
      }
    }).populate({
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
    return results;
  }

  public async findById(id: string): Promise<any> {
    if (isEmpty(id)) throw new HttpException(400, "provide Id");
    const employeeSlip: any = {}
    // const salarySlip: ISalarySlip = await this.salarySlipModel.findOne({ _id: id }).populate('deductions salaryStructure employeeId');
    const salarySlip: any = await this.salarySlipModel.findOne({ _id: id })
    .populate({ path:"projectId", select:{project_name:1}})
    .populate({ path:"departmentId", select:{project_name:1}})
    .populate({path: 'deductions', populate:{path:'deductionTypeId', model:'DeductionType'}})
    .populate({path: 'salaryStructure', select:{deparmentId:0, projectId:0},populate:{path:'earnings', model:'SalaryComponent', select:{title:1, amount:1, _id:0}}})
    .populate({path: 'salaryStructure', select:{deparmentId:0, projectId:0},populate:{path:'deductions', model:'SalaryComponent', select:{title:1, amount:1, _id:0}}});
    if (!salarySlip) {
      throw new HttpException(404, "no record found")
    }
    const additionalDeductions: any = {
      // deductions: []
      "lateness": 0,
      "NCNS": 0,
      "absent":0
    }
    if (salarySlip.deductions.length > 1)
    {
      for (let index = 0; index < salarySlip.deductions.length; index++) {
        const deduction = salarySlip.deductions[index];
        if(!additionalDeductions[deduction.deductionTypeId.title])
        {
          additionalDeductions[deduction.deductionTypeId.title] = deduction.deductionTypeId.amount
          continue
        }
        additionalDeductions[deduction.deductionTypeId.title] +=  deduction.deductionTypeId.amount
      }
    }
    // record.salaryStructure = salarySlip.salaryStructure
    if (!salarySlip) throw new HttpException(404, "no record found");
    employeeSlip.additionalDeductions = additionalDeductions;
    employeeSlip.project = salarySlip.projectId;
    employeeSlip.salaryStructure = salarySlip.salaryStructure;
    employeeSlip.netPay = salarySlip.netPay;
    employeeSlip.createdAt = salarySlip.createdAt;

    return {employeeSlip};
  }

  public async create(data: CreateSalarySlipDto): Promise<any> {
    if (isEmpty(data)) throw new HttpException(400, "Bad request");
    const projects = await projectModel.find();
    const records = [];
    const wahalaPeople = []
    for (let index = 0; index < projects.length; index++) {
      const project = projects[index];
      // console.log(project);
      const employees:any = await EmployeeModel.find({projectId: project._id, status: 'active'},{_id:1, salaryStructure_id:1, status:1}).populate('salaryStructure_id');
      console.log(employees[0]);
      // break
      if(employees.length<1)
      {
        continue
      }
      for (let index = 0; index < employees.length; index++) {
        const employee = employees[index];
        if(employee.salaryStructure_id == null)
        {
          wahalaPeople.push(employee)
        }
        const salarySlipConstructor:any = {
          employeeId: employee._id,
          salaryStructure: employee.salaryStructure_id._id,
          netPay: employee.salaryStructure_id.netPay,
          projectId: project._id
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
    return records;
  }

  public async createDepartmentPayroll(data: CreateSalarySlipDto): Promise<any> {
    if (isEmpty(data)) throw new HttpException(400, "Bad request");
    const departments = await departmentModel.find();
    console.log(departments);

    const records = [];
    for (let index = 0; index < departments.length; index++) {
      const department = departments[index];
      // console.log(department);
      const employees:any = await EmployeeModel.find({department: department._id, status: {$eq: "active"}},{_id:1, salaryStructure_id:1}).populate('salaryStructure_id');
      if(employees.length<1)
      {
        continue
      }
      for (let index = 0; index < employees.length; index++) {
        const employee = employees[index];
        // console.log(employee);

        const salarySlipConstructor:any = {
          employeeId: employee._id,
          salaryStructure: employee.salaryStructure_id._id,
          netPay: employee.salaryStructure_id.netPay,
          departmentId: department._id
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
    return records;
  }

}

export default SalarySlipService;


