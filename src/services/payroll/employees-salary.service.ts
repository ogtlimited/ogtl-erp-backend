/* eslint-disable prettier/prettier */
import { CreateSalaryStructureAssignmentDto } from '@/dtos/payroll/salary-structure-assignment.dto';
import { HttpException } from '@exceptions/HttpException';
import {IEmployeesSalary, ISalarySetting} from "@interfaces/payroll/employees-salary.interface";
import employeesSalaryModel from "@models/payroll/employees-salary";
import { isEmpty } from '@utils/util';
import {CreateEmployeeSalaryDto} from "@dtos/payroll/employees-salary.dto";
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
    const salarySettingConstructor = {
      basic: 0.3,
      medical: 0.09,
      housing: 0.2,
      transport: 0.17,
      monthlyEmployeePension: 0.8,
      CRA:0.2,
      CRABonusAmount:200000,
      active: true
    }
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
      employeesSalary.push(result)
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
}

export default EmployeeSalaryService;
