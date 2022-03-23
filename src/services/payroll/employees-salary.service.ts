/* eslint-disable prettier/prettier */
import { CreateSalaryStructureAssignmentDto } from '@/dtos/payroll/salary-structure-assignment.dto';
import { HttpException } from '@exceptions/HttpException';
import {IEmployeesSalary, ISalarySetting} from "@interfaces/payroll/employees-salary.interface";
import employeesSalaryModel from "@models/payroll/employees-salary";
import { isEmpty } from '@utils/util';
import {CreateEmployeeSalaryDto, UpdateEmployeeSalaryDto} from "@dtos/payroll/employees-salary.dto";
import salarySettingModel from "@models/payroll/salary-setting";
import EmployeeModel from "@models/employee/employee.model";


class EmployeeSalaryService {
  public employeeSalary = employeesSalaryModel;

  private schema = [
    {
      group: 300000,
      percent: 0.07
    },
    {
      group: 600000,
      percent: 0.11
    },
    {
      group: 1100000,
      percent: 0.15
    },
    {
      group: 1600000,
      percent: 0.19
    },
    {
      group: 3200000,
      percent: 0.21
    },
    {
      group: 60000000,
      percent: 0.24
    }
  ]

  public async findAll(query): Promise<IEmployeesSalary[]> {
    const employeeSalaries = await employeesSalaryModel.find(query).populate('employeeId')
    return employeeSalaries;
  }

  public async findById(id: string): Promise<IEmployeesSalary> {
    const employeeSalary: IEmployeesSalary = await this.employeeSalary.findOne({ employeeId: id });
    if (!employeeSalary) throw new HttpException(404, "no record found");
    return employeeSalary;
  }

  //remember to validate salary structure and employees for matching project and departments
  public async create(info): Promise<any> {
    const {data} = info
    console.log(info)
    const salarySetting = await salarySettingModel.findOne({active: true})
    const employeesSalary = [];
    const nonExistingEmployees = []
    console.log(data, "data ----> ")
    for(let idx = 0; idx < data.length; idx++){
      console.log("looping bish")
      const record = data[idx]
      const employeeInfo  = await EmployeeModel.findOne({company_email: record.company_email}).populate({path: 'department'});
      if(!employeeInfo){
        nonExistingEmployees.push(record)
        continue
      }
      const result = await this.salaryGeneratorHelper(record, employeeInfo, salarySetting)
      result.employeeId = employeeInfo._id
      const existingSalary  = await employeesSalaryModel.findOne({employeeId: result.employeeId});
      console.log(existingSalary, 'EXISTING');
      if(existingSalary){
        const updateSalary = await employeesSalaryModel.findOneAndUpdate({employeeId: existingSalary.employeeId},result, {
          new: true
        })
        console.log(updateSalary, 'EMPLOYEE UPY');
        if(!updateSalary){
          throw new HttpException(404, 'employee salary record does not exist')
        }
      }else{
        employeesSalary.push(result)
      }

    }

    await employeesSalaryModel.insertMany(employeesSalary)
    return `${employeesSalary.length} record(s) uploaded successfully`

  }

  private async salaryGeneratorHelper(data, employeeInfo,  salarySetting: ISalarySetting){

    const salaryGenerator: ISalarySetting = {};
    const {annualGrossSalary} = data
    const monthlySalary = annualGrossSalary/12;
    salaryGenerator.monthlyEmployeePension = 0
    salaryGenerator.monthlySalary = monthlySalary;
    salaryGenerator.basic = Number(salarySetting.basic) * annualGrossSalary;
    salaryGenerator.housing = Number(salarySetting.housing) * annualGrossSalary;
    salaryGenerator.medical = Number(salarySetting.medical) * annualGrossSalary;
    salaryGenerator.transport = Number(salarySetting.transport) * annualGrossSalary;
    salaryGenerator.otherAllowances = Number(salarySetting.otherAllowances) * annualGrossSalary;
    salaryGenerator.CRA = (salarySetting.CRA * annualGrossSalary) + Number(salarySetting.CRABonusAmount)
    if(monthlySalary < 30000 || employeeInfo.isExpatriate){
      salaryGenerator.monthlyIncomeTax = this.taxCalculator(annualGrossSalary - salaryGenerator.CRA)/12
      salaryGenerator.netPay = monthlySalary - salaryGenerator.monthlyIncomeTax
    }

    if(monthlySalary > 30000 && employeeInfo.department.department.toLowerCase() != "operations"){
      salaryGenerator.monthlyEmployeePension = salarySetting.monthlyEmployeePension * Number(monthlySalary)
      salaryGenerator.monthlyIncomeTax = this.taxCalculator(annualGrossSalary - (salaryGenerator.CRA + salaryGenerator.monthlyEmployeePension * 12))/12
      salaryGenerator.netPay = Number(monthlySalary) - (salaryGenerator.monthlyEmployeePension + salaryGenerator.monthlyIncomeTax)
    }

    if(employeeInfo.department.department.toLowerCase() === "operations"){
      if(employeeInfo.isAdmin){
        salaryGenerator.monthlyEmployeePension = salarySetting.monthlyEmployeePension * Number(monthlySalary)
      }
      salaryGenerator.monthlyIncomeTax = this.taxCalculator(annualGrossSalary - salaryGenerator.CRA)/12
      salaryGenerator.netPay = monthlySalary - (salaryGenerator.monthlyIncomeTax)
    }

    return salaryGenerator
  }

  private taxCalculator(annualTaxableIncome: number) {
      const rates =[21000,54000,129000,224000,560000,1232000]
      for(let i=0; i < this.schema.length; i++){
        if(annualTaxableIncome <= this.schema[i].group){
          const current = annualTaxableIncome - this.schema[i -1].group;
          return rates[i-1] + current * this.schema[i].percent
        }
      }
  }

  public async updateEmployeeSalary(payload){

    const salarySetting = await salarySettingModel.findOne({active: true})
    const employeeInfo  = await EmployeeModel.findOne({company_email: payload.company_email}).populate({path: 'department'});
    if(!employeeInfo){
      throw new HttpException(404, "employee does not exist")
    }
    const result = await this.salaryGeneratorHelper(payload, employeeInfo, salarySetting)
    const updateSalary = await employeesSalaryModel.findOneAndUpdate({employeeId: employeeInfo._id},{
      $set: result
    }, {
      new: true
    })

    if(!updateSalary){
      throw new HttpException(404, 'employee salary record does not exist')
    }

    return updateSalary

  }
}

export default EmployeeSalaryService;
