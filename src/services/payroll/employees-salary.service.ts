/* eslint-disable prettier/prettier */
import { CreateSalaryStructureAssignmentDto } from '@/dtos/payroll/salary-structure-assignment.dto';
import { HttpException } from '@exceptions/HttpException';
import { IEmployeesSalary, ISalarySetting } from '@interfaces/payroll/employees-salary.interface';
import employeesSalaryModel from '@models/payroll/employees-salary';
import { isEmpty } from '@utils/util';
import { CreateEmployeeSalaryDto, UpdateEmployeeSalaryDto } from '@dtos/payroll/employees-salary.dto';
import salarySettingModel from '@models/payroll/salary-setting';
import EmployeeModel from '@models/employee/employee.model';
import { Request } from 'express';

class EmployeeSalaryService {
  public employeeSalary = employeesSalaryModel;

  private static schema = [
    {
      group: 300000,
      percent: 0.07,
    },
    {
      group: 600000,
      percent: 0.11,
    },
    {
      group: 1100000,
      percent: 0.15,
    },
    {
      group: 1600000,
      percent: 0.19,
    },
    {
      group: 3200000,
      percent: 0.21,
    },
    {
      group: 60000000,
      percent: 0.24,
    },
  ];

  public async findAll(query): Promise<IEmployeesSalary[]> {
    const employeeSalaries = await employeesSalaryModel.find(query).populate('employeeId');
    return employeeSalaries;
  }

  public async findById(id: string): Promise<IEmployeesSalary> {
    const employeeSalary: IEmployeesSalary = await this.employeeSalary.findOne({ employeeId: id });
    if (!employeeSalary) throw new HttpException(404, 'no record found');
    return employeeSalary;
  }

  //remember to validate salary structure and employees for matching project and departments
  //refactor. consider getting all employees.
  public async create(info, user): Promise<any> {
    const salarySetting = await salarySettingModel.findOne({ active: true })
    const employeeInfo = await EmployeeModel.findOne({ company_email: info.company_email }).populate({ path: 'department' });
    const result = await EmployeeSalaryService.salaryGeneratorHelper(info, employeeInfo, salarySetting)
    result.employeeId = employeeInfo._id
    result.departmentId = employeeInfo.department
    result.projectId = employeeInfo.projectId
    result.addedBy = user._id
     
      
    // for(let idx = 0; idx < data.length; idx++){
    //   const record = data[idx]
    //   const employeeInfo  = await EmployeeModel.findOne({company_email: record.company_email}).populate({path: 'department'});
    //   if(employeeInfo.department == null){
    //     nonExistingEmployees.push(employeeInfo)
    //   }
    //   if(!employeeInfo){
    //     nonExistingEmployees.push(record)
    //     continue
    //   }
    //   const result = await EmployeeSalaryService.salaryGeneratorHelper(record, employeeInfo, salarySetting)
    //   result.employeeId = employeeInfo._id
    //   result.departmentId = employeeInfo.department
    //   result.projectId = employeeInfo.projectId
    //   const existingSalary  = await employeesSalaryModel.findOne({employeeId: result.employeeId});

    //   if(existingSalary){
    //     const updateSalary = await employeesSalaryModel.findOneAndUpdate({employeeId: existingSalary.employeeId},result, {
    //       new: true
    //     })
    //     if(!updateSalary){
    //       throw new HttpException(404, 'employee salary record does not exist')
    //     }
    //   } else {
    //     employeesSalary.push(result);
    //   }
    //  }

    return await employeesSalaryModel.create(result)

  }


  public async updateEmployeeSalary(payload) {
    const salarySetting = await salarySettingModel.findOne({ active: true });
    const employeeInfo = await EmployeeModel.findOne({ company_email: payload.company_email }).populate({ path: 'department' });
    if (!employeeInfo) {
      throw new HttpException(404, 'employee does not exist');
    }
    const result = await EmployeeSalaryService.salaryGeneratorHelper(payload, employeeInfo, salarySetting);
    const updateSalary = await employeesSalaryModel.findOneAndUpdate(
      { employeeId: employeeInfo._id },
      {
        $set: result,
      },
      {
        new: true,
      },
    );

    if (!updateSalary) {
      throw new HttpException(404, 'employee salary record does not exist');
    }

    return updateSalary;
  }

  //Private Helper Methods

  private static async salaryGeneratorHelper(data, employeeInfo,  salarySetting: ISalarySetting){

    console.log(employeeInfo, "in the salary helper!");
    const salaryGenerator: ISalarySetting = {};
    const { annualGrossSalary } = data;
    const monthlySalary = annualGrossSalary / 12;
    EmployeeSalaryService.salaryGeneratorInitializer(salaryGenerator, monthlySalary, salarySetting, annualGrossSalary);
    EmployeeSalaryService.salaryGeneratorTaxNetPayPensionCalculator(monthlySalary, employeeInfo, salaryGenerator, annualGrossSalary, salarySetting, EmployeeSalaryService.taxCalculator);

    salaryGenerator.monthlyIncomeTax = EmployeeSalaryService.decimalPointFormatter(salaryGenerator.monthlyIncomeTax)
    salaryGenerator.transport = EmployeeSalaryService.decimalPointFormatter(salaryGenerator.transport)
    salaryGenerator.netPay = EmployeeSalaryService.decimalPointFormatter(salaryGenerator.netPay)
    return salaryGenerator;
  }

  private  static salaryGeneratorTaxNetPayPensionCalculator(monthlySalary: number, employeeInfo, salaryGenerator: ISalarySetting, annualGrossSalary, salarySetting: ISalarySetting, taxCalculator) {
    if (monthlySalary < 30000 || employeeInfo.isExpatriate) {
      salaryGenerator.monthlyIncomeTax = taxCalculator(annualGrossSalary - salaryGenerator.CRA) / 12;
      salaryGenerator.netPay = monthlySalary - salaryGenerator.monthlyIncomeTax;
    }

    if (monthlySalary > 30000 && employeeInfo.department.department.toLowerCase() != "OPERATIONS") {
      salaryGenerator.monthlyEmployeePension = salarySetting.monthlyEmployeePension * Number(monthlySalary);
      salaryGenerator.monthlyIncomeTax =
        taxCalculator(annualGrossSalary - (salaryGenerator.CRA + salaryGenerator.monthlyEmployeePension * 12)) / 12;
      salaryGenerator.netPay = Number(monthlySalary) - (salaryGenerator.monthlyEmployeePension + salaryGenerator.monthlyIncomeTax);
    }

    if (employeeInfo.department.department.toLowerCase() === "OPERATIONS") {
      if (employeeInfo.isAdmin) {
        salaryGenerator.monthlyEmployeePension = salarySetting.monthlyEmployeePension * Number(monthlySalary);
      }
      salaryGenerator.monthlyIncomeTax = taxCalculator(annualGrossSalary - salaryGenerator.CRA) / 12;
      salaryGenerator.netPay = monthlySalary - salaryGenerator.monthlyIncomeTax;
    }
  }

  private static salaryGeneratorInitializer(salaryGenerator: ISalarySetting, monthlySalary: number, salarySetting: ISalarySetting, annualGrossSalary) {
    salaryGenerator.monthlyEmployeePension = 0;
    salaryGenerator.monthlySalary = monthlySalary;
    salaryGenerator.basic = Number(salarySetting.basic) * annualGrossSalary;
    salaryGenerator.housing = Number(salarySetting.housing) * annualGrossSalary;
    salaryGenerator.medical = Number(salarySetting.medical) * annualGrossSalary;
    salaryGenerator.transport = Number((Number(salarySetting.transport) * annualGrossSalary).toFixed(2));
    salaryGenerator.otherAllowances = Number(salarySetting.otherAllowances) * annualGrossSalary;
    salaryGenerator.CRA = salarySetting.CRA * annualGrossSalary + Number(salarySetting.CRABonusAmount);
  }

  private static decimalPointFormatter(amount, decimalPoints=2) {
    return Number((amount).toFixed(decimalPoints));
  }

  private static taxCalculator(annualTaxableIncome: number) {
    const rates =[21000,54000,129000,224000,560000,1232000]
    for(let i=0; i < EmployeeSalaryService.schema.length; i++){
      console.log(EmployeeSalaryService.schema[i], "schema info -------->");
      if(annualTaxableIncome <= EmployeeSalaryService.schema[i]?.group){
        console.log(`schema group: ${EmployeeSalaryService.schema[i]?.group}, schema ded: ${EmployeeSalaryService.schema[i -1]?.group}`);
        const current = annualTaxableIncome - EmployeeSalaryService.schema[i -1].group;
        return rates[i-1] + current * EmployeeSalaryService.schema[i].percent
      }
    }
  }
}

export default EmployeeSalaryService;
