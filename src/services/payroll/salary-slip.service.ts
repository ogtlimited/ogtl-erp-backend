/* eslint-disable prettier/prettier */
import { CreateSalarySlipDto } from "@dtos/payroll/salary-slip.dto";
import { HttpException } from "@exceptions/HttpException";
import salarySlipModel from "@models/payroll/salary-slip.model";
import { isEmpty } from "@utils/util";
import projectModel from "@/models/project/project.model";
import EmployeeModel from "@/models/employee/employee.model";
import { calculateEmployeeDeductions, officeQueryGenerator } from "@/utils/payrollUtil";
import employeesSalaryModel from "@models/payroll/employees-salary";
import moment from "moment";
import AttendanceTypeService from "@services/attendance/attendance.service";
import differenceInBusinessDays from "date-fns/differenceInBusinessDays";
import applicationModel from "@models/leave/application.model";
import salaryArrearsModel from "@models/payroll/salary-arrears.model";
import BatchModel from "@models/payroll/batch.model";
import { IBatchInterface } from "@interfaces/payroll/batch.interface";
import { ReferenceGenerator } from "@services/payroll/reference-number.generator";
import { Bank3DPaymentService } from "@services/payroll/bank3d.service";
import SalarySlipModel from "@models/payroll/salary-slip.model";
import SalaryDetailModel from "@models/employee/salary-details.model";

class SalarySlipService {

  private startOfMonth = new Date(moment().startOf('month').format('YYYY-MM-DD')).toISOString();
  private endOfMonth   = new Date(moment().endOf('month').format('YYYY-MM-DD')).toISOString();
  // private axiosService = SalarySlipService.axiosInstance()

  public salarySlipModel = salarySlipModel;
  private attendanceService = new AttendanceTypeService();
  private leaveModel = applicationModel;

  public async findAll(query): Promise<any> {
    // console.log(query);
    const officeQuery = officeQueryGenerator(query);
    const agg = [
      {
        '$match':officeQuery
      },
      {
        $group: {
          _id: 'totalSalaries',
          salaries: {
            $sum: '$salaryAfterDeductions',
          },
        },
      },
    ];

    const results = await this.salarySlipModel
      .find(officeQuery, {
        employeeId: 1,
        employeeSalary: 1,
        _id: 1,
        netPay: 1,
        projectId: 1,
        departmentId: 1,
        createdAt: 1,
      })
      .populate({
        path: 'employeeId',
        select: {
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
          select: { _id: 0, designation: 1 },
        },
      })
      .populate({
        path: 'projectId',
        select: {
          _id: 0,
          project_name: 1,
        },
      })
      .populate({
        path: 'departmentId',
        select: {
          _id: 1,
          department: 1,
        },
      });
    const total = await salarySlipModel.aggregate(agg);
    return [{ salarySlips: results }, { total }];
  }

  public async findById(query): Promise<any> {
    // if (isEmpty(id)) throw new HttpException(400, "provide Id");
    const employeeSlip: any = {};
    // const salarySlip: ISalarySlip = await this.salarySlipModel.findOne({ _id: id }).populate('deductions salaryStructure employeeId');
    const salarySlip: any = await this.salarySlipModel
      .findOne({
        employeeId: query.empId,
        createdAt: {
          $gte: query.startOfMonth,
          $lte: query.endOfMonth,
        },
      })
      .populate({ path: 'employeeId', select: { first_name: 1, last_name: 1, ogid: 1, middle_name: 1 } })
      .populate({ path: 'departmentId' })
      .populate({ path: 'projectId', select: { project_name: 1 } })
      .populate({ path: 'deductions', populate: { path: 'deductionTypeId', model: 'DeductionType' } });
    if (!salarySlip) {
      throw new HttpException(404, 'no record found');
    }
    console.log(salarySlip);
    // const employeeSalary = await employeesSalaryModel.findOne({employeeId: salarySlip.employeeId}).populate(
    //   {path: 'employeeId', select: {first_name: 1, last_name:1, date_of_joining: 1 }}
    // )
    const additionalDeductions: any = {
      // deductions: []
      lateness: 0,
      NCNS: 0,
      absent: 0,
      incompleteHours: 0,
    };
    if (salarySlip.deductions.length > 0) {
      for (let index = 0; index < salarySlip.deductions.length; index++) {
        const deduction = salarySlip.deductions[index];
        console.log(deduction);
        if (!additionalDeductions[deduction.description]) {
          additionalDeductions[deduction.description] = deduction.amount;
          continue;
        }
        additionalDeductions[deduction.description] += deduction.amount;
      }
    }
    // record.salaryStructure = salarySlip.salaryStructure
    employeeSlip.additionalDeductions = additionalDeductions;
    employeeSlip.employeeSalary = {
      ...salarySlip.employeeSalary,
      employeeId: salarySlip.employeeId,
      department: salarySlip.departmentId,
    };
    employeeSlip.netPay = salarySlip.netPay;
    employeeSlip.deductionsBreakDown = salarySlip.deductions;
    employeeSlip.createdAt = salarySlip.createdAt;
    return { employeeSlip };
  }

  public async create(data: CreateSalarySlipDto): Promise<any> {
    if (isEmpty(data)) throw new HttpException(400, 'Bad request');
    const projects = await projectModel.find();
    const records = [];
    const wahalaPeople = [];
    for (let index = 0; index < projects.length; index++) {
      const project = projects[index];
      // console.log(project);
      const employees: any = await EmployeeModel.find(
        { projectId: project._id, status: 'active' },
        {
          _id: 1,
          salaryStructure_id: 1,
          status: 1,
        },
      ).populate('salaryStructure_id');
      console.log(employees[0]);
      // break
      if (employees.length < 1) {
        continue;
      }
      for (let index = 0; index < employees.length; index++) {
        const employee = employees[index];
        if (employee.salaryStructure_id == null) {
          wahalaPeople.push(employee);
        }
        const salarySlipConstructor: any = {
          employeeId: employee._id,
          salaryStructure: employee.salaryStructure_id._id,
          netPay: employee.salaryStructure_id.netPay,
          projectId: project._id,
        };
        const deductions = await calculateEmployeeDeductions(employee, employee.salaryStructure_id);
        if (deductions.hasDeductions) {
          salarySlipConstructor.deductions = [...deductions.deductionIds];
          salarySlipConstructor.netPay = deductions.totalAmount;
        }
        deductions.employee = employee._id;
        records.push(salarySlipConstructor);
      }
    }
    await this.salarySlipModel.insertMany(records);
    return records;
  }

  public async createDepartmentPayroll(data: CreateSalarySlipDto): Promise<any> {
    /*
      The steps for this method are:

      1. Fetch all employees salaries
      2. loop through each of the employee salaries and get the employee
      3. check the days the employee has worked if he meets the attendance threshold.
      4. if yes, check if emp has pending deductions.
      5. If emp hasn't met threshold....TODO

    */
    await this.salarySlipExistenceCheck();
    const token = await Bank3DPaymentService.getBankToken();
    const batchData = await Bank3DPaymentService.initiateBankPayment(token)
    const salarySlipBatch: IBatchInterface = await  BatchModel.create({
      batch_id: batchData.BatchID,
      reference_id: batchData.Reference
    })

    // const salarySlipBatch: IBatchInterface = await  BatchModel.create({
    //   batch_id: "qwertyu",
    //   reference_id: "1234543223"
    // })


    const records = [];

    const employeeSalaries = await employeesSalaryModel.find({}).populate(
      {path: 'employeeId', select: {first_name: 1, last_name:1, date_of_joining: 1 , ogid:1, remote:1}}
    )

    for (let index = 0; index < employeeSalaries.length; index++) {
      const employeeSalary: any = employeeSalaries[index];

      if (employeeSalary.employeeId.remote){
        const salarySlipConstructor = await SalarySlipService.employeeSalarySlipGenerator(employeeSalary, salarySlipBatch);
        records.push(salarySlipConstructor)
      }
    }

    await this.salarySlipModel.insertMany(records);
    return `${records.length} salary slips created`;
  }

  private getWorkDaysInMonth() {
    return differenceInBusinessDays(
      new Date(this.endOfMonth),
      new Date(this.startOfMonth)
    );
  }

  private async getEmployeeTotalAttendance(employeeSalary: any) {
    return await this.attendanceService.findAllEmployeeAttendance(employeeSalary.employeeId.ogid, {
      startOfMonth: this.startOfMonth,
      endOfMonth: this.endOfMonth
    });
  }

  private static async employeeSalarySlipGenerator(employeeSalary: any, salarySlipBatch) {

    const today = new Date();
    const monthName = moment(today).format('MMMM')
    const referenceNumber = ReferenceGenerator.referenceNumberGenerator();
    const employeeSalaryDetails = await SalaryDetailModel.findOne({employee_id: employeeSalary.employeeId._id})
    const fullName = `${employeeSalary.employeeId.first_name} ${employeeSalary.employeeId.last_name}`
    const salarySlipConstructor: any = {
      employeeId: employeeSalary.employeeId._id,
      employeeSalary: employeeSalary,
      month: today.toISOString(),
      batchId: salarySlipBatch._id,
      AccountNumber: employeeSalaryDetails.bank_account_number,
      BankCode: employeeSalaryDetails.bank_code,
      BeneficiaryName: fullName,
      Narration: `${monthName} ${today.getFullYear()} Salary`,
      Reference: referenceNumber,
      Amount:100.0
    };

    // const salaryDetails = await salaryDetailsModel.findOne({employee_id: employeeSalary.employeeId._id})

    const salaryArrears: any = await salaryArrearsModel.findOne({
      employeeId: employeeSalary.employeeId,
      createdAt: {
        $gte: new Date(moment().subtract(1, 'M').startOf('month').format('YYYY-MM-DD')).toISOString(),
        $lte: new Date(moment().subtract(1, 'M').endOf('month').format('YYYY-MM-DD')).toISOString()
      }
    })
    const deductions = await calculateEmployeeDeductions(employeeSalary.employeeId._id, employeeSalary.netPay);
    salarySlipConstructor.totalDeductions = deductions.totalDeductions;
    console.log(deductions);
    salarySlipConstructor.salaryAfterDeductions = deductions.salaryAfterDeductions.toFixed(2);
    salarySlipConstructor.Amount = salarySlipConstructor.salaryAfterDeductions
    if (deductions.hasDeductions) {
      salarySlipConstructor.deductions = [...deductions.deductionIds];
    }
    if (salaryArrears){
      salarySlipConstructor.salaryArrears = salaryArrears._id
      salarySlipConstructor.salaryAfterDeductions = salaryArrears.amount + deductions.salaryAfterDeductions
      salarySlipConstructor.Amount = salarySlipConstructor.salaryAfterDeductions
    }
    return salarySlipConstructor;
  }

  // private static axiosInstance() {
  //    return axios.create({
  //     timeout: 60000, //optional
  //     httpsAgent: new https.Agent({ keepAlive: true }),
  //     headers: {'Content-Type':'application/xml'}
  //   })
  // }

  public async approveAndPay() {

    /*

      - update after response from bank3d


     */

    const token = await Bank3DPaymentService.getBankToken();


    const batch = await BatchModel.findOne({
      "createdAt": {
        "$gte": new Date(this.startOfMonth),
        "$lte": new Date(this.endOfMonth)
      }
    })

    if(!batch){
      throw new HttpException(400, "No Batch available for this month. Please Generate slips to create batch")
    }

    if(batch.approved){
      throw new HttpException(401, "Batch and Salary Slips for this month have already be created and approved")
    }

    const SalarySlips = await SalarySlipModel.find({
      batchId: batch._id
    },{
      _id:0,
      AccountNumber:1,
      BankCode:1,
      BeneficiaryName:1,
      Narration:1,
      Amount:1,
      Reference:1
    })

    // return {token, SalarySlips, batch, url: process.env.BANK_3D_URL_Update_Payment}
    const today =moment().format().split("+")[0]
    // console.log(today);

    // new Promise((resolve , reject) => {
    //   const result = Bank3DPaymentService.loadPayments(today, SalarySlips, batch._id, token)
    //   if (result){
    //
    //     resolve("process complete")
    //   }
    // })
    await Bank3DPaymentService.loadPayments(today, SalarySlips, batch.batch_id, token)
    // await Bank3DPaymentService.processPayments(batch.batch_id, token, today)
    // await BatchModel.findOneAndUpdate( {_id: batch._id},{
    //   $set: {
    //     approved: true
    //   }
    // })
    return "Payments being Processed"
  }

  private async salarySlipExistenceCheck() {
    const salarySlipExists = await this.salarySlipModel.exists({
      "createdAt": {
        "$gte": new Date(this.startOfMonth),
        "$lte": new Date(this.endOfMonth)
      }
    });

    if (salarySlipExists) {
      throw new HttpException(403, "salary slips already generated for this month!");
    }
  }
}

export default SalarySlipService;
