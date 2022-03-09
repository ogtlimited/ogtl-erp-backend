/* eslint-disable prettier/prettier */
import {CreateSalarySlipDto} from '@dtos/payroll/salary-slip.dto';
import {HttpException} from '@exceptions/HttpException';
import {ISalarySlip} from '@/interfaces/payroll/salary-slip.interface';
import salarySlipModel from '@models/payroll/salary-slip.model';
import {isEmpty} from '@utils/util';
import departmentModel from '@/models/department/department.model';
import projectModel from '@/models/project/project.model';
import {isValidObjectId} from 'mongoose';
import EmployeeModel from '@/models/employee/employee.model';
import {calculateEmployeeDeductions, officeQueryGenerator} from '@/utils/payrollUtil';
import employeesSalaryModel from "@models/payroll/employees-salary";

// import omit from 'lodash/omit'

class SalarySlipService {
  public salarySlipModel = salarySlipModel;

  public async findAll(query): Promise<any> {
    console.log(query);

    const agg = [
      {
        '$group': {
          '_id': 'totalSalaries',
          'salaries': {
            '$sum': '$netPay'
          }
        }
      }
    ];

    const officeQuery = officeQueryGenerator(query)
    const results = await this.salarySlipModel.find(officeQuery, {
      employeeId: 1,
      _id: 1,
      netPay: 1,
      projectId: 1,
      departmentId: 1,
      createdAt: 1
    })
      .populate({
        path: 'employeeId', select: {
          first_name: 1,
          last_name: 1,
          ogid: 1,
          designation: 1,
          company_email: 1,
          middle_name: 1,
          date_of_joining: 1,
        },
        populate: {
          path: 'designation',
          model: 'Designation',
          select: {_id: 0, designation: 1}
        }
      }).populate({
        path: "projectId",
        select: {
          _id: 0,
          project_name: 1
        }
      }).populate({
        path: "departmentId",
        select: {
          _id: 0,
          department: 1
        }
      });
    const total = await salarySlipModel.aggregate(agg)
    return [{salarySlips: results}, {total}];
  }

  public async findById(query): Promise<any> {
    // if (isEmpty(id)) throw new HttpException(400, "provide Id");
    const employeeSlip: any = {}
    // const salarySlip: ISalarySlip = await this.salarySlipModel.findOne({ _id: id }).populate('deductions salaryStructure employeeId');
    const salarySlip: any = await this.salarySlipModel.findOne({employeeId: query.empId,   createdAt: {
        $gte: query.startOfMonth,
        $lte: query.endOfMonth
      }})
      .populate({path: "projectId", select: {project_name: 1}})
      .populate({path: "departmentId", select: {project_name: 1}})
      .populate({path: 'deductions', populate: {path: 'deductionTypeId', model: 'DeductionType'}})
    if (!salarySlip) {
      throw new HttpException(404, "no record found")
    }
    // const employeeSalary = await employeesSalaryModel.findOne({employeeId: salarySlip.employeeId}).populate(
    //   {path: 'employeeId', select: {first_name: 1, last_name:1, date_of_joining: 1 }}
    // )
    const additionalDeductions: any = {
      // deductions: []
      "lateness": 0,
      "NCNS": 0,
      "absent": 0,
      "incompleteHours": 0
    }
    if (salarySlip.deductions.length > 0) {
      for (let index = 0; index < salarySlip.deductions.length; index++) {
        const deduction = salarySlip.deductions[index];
        console.log(deduction)
        if (!additionalDeductions[deduction.description]) {
          additionalDeductions[deduction.description] = deduction.amount
          continue
        }
        additionalDeductions[deduction.description] += deduction.amount
      }
    }
    // record.salaryStructure = salarySlip.salaryStructure
    employeeSlip.additionalDeductions = additionalDeductions;
    employeeSlip.employeeSalary = salarySlip.employeeSalary;
    employeeSlip.netPay = salarySlip.netPay;
    employeeSlip.deductionsBreakDown = salarySlip.deductions
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
      const employees: any = await EmployeeModel.find({projectId: project._id, status: 'active'}, {
        _id: 1,
        salaryStructure_id: 1,
        status: 1
      }).populate('salaryStructure_id');
      console.log(employees[0]);
      // break
      if (employees.length < 1) {
        continue
      }
      for (let index = 0; index < employees.length; index++) {
        const employee = employees[index];
        if (employee.salaryStructure_id == null) {
          wahalaPeople.push(employee)
        }
        const salarySlipConstructor: any = {
          employeeId: employee._id,
          salaryStructure: employee.salaryStructure_id._id,
          netPay: employee.salaryStructure_id.netPay,
          projectId: project._id
        }
        const deductions = await calculateEmployeeDeductions(employee, employee.salaryStructure_id)
        if (deductions.hasDeductions) {
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

    const records = [];
    const today = new Date()
    if(today.getDate() != 25){
      throw new HttpException(400, "Cannot generate slip before the 25th!")
    }
    const noSalaries = []
    const employeeSalaries = await employeesSalaryModel.find({}).populate(
      {path: 'employeeId', select: {first_name: 1, last_name:1, date_of_joining: 1 }}
    )

    for (let index = 0; index < employeeSalaries.length; index++) {
      const employeeSalary = employeeSalaries[index];
      // console.log(employeeSalary);
      const today = new Date()
      const salarySlipConstructor: any = {
        employeeId: employeeSalary.employeeId,
        employeeSalary: employeeSalary,
        netPay: employeeSalary.netPay,
        // departmentId: employee.department,
        month: today.toISOString()
      }
      const deductions = await calculateEmployeeDeductions(employeeSalary.employeeId, employeeSalary.netPay)
      if (deductions.hasDeductions) {
        salarySlipConstructor.deductions = [...deductions.deductionIds]
        salarySlipConstructor.netPay = deductions.salaryAfterDeductions
      }
      records.push(salarySlipConstructor)
    }

    await this.salarySlipModel.insertMany(records);
    return `${records.length} salary slips created`;
  }

  // public async employeeDeductions(id): Promise<any>{}

}

export default SalarySlipService;


