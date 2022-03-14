/* eslint-disable prettier/prettier */
// noinspection JSUnusedAssignment

import { HttpException } from '@exceptions/HttpException';
import {
  IAttendance, IAttendanceDeduction,
  ICreateAttendance, IPossibleDeductons
} from '@/interfaces/attendance-interface/attendance-interface';
import attendanceModel  from '@models/attendance/attendance.model';
import employeeModel  from '@models/employee/employee.model';
// import deductionModel  from '@models/payroll/deduction.model';
import { isEmpty } from '@utils/util';
import {getWorkTime}  from '@/utils/attendanceCalculator';
import {ObjectId} from 'mongodb'
import { attendanceofficeQueryGenerator} from '@/utils/payrollUtil';
import deductionModel from '@/models/payroll/deduction.model';
import deductionTypeModel from '@/models/payroll/deductionType.model';
import moment = require('moment');
import EmployeeModel from '@models/employee/employee.model';
import applicationModel from '@/models/leave/application.model';
import employeesSalaryModel from "@models/payroll/employees-salary";


class AttendanceTypeService {
  private attendanceTypes = attendanceModel;

  private leaveModel = applicationModel;

  public async findAllDepartmentAttendance(query): Promise<any> {
    const payload = []
    const {startOfMonth, endOfMonth} = query
    const officeQuery = attendanceofficeQueryGenerator(query)
    // console.log(officeQuery, "==================>of query")
    const employees = await employeeModel.find(officeQuery, {ogid: 1, first_name:1, last_name:1, profile_pic:1, gender: 1, designation:1, _id:1}).populate('designation')
    //consider the possilibty of random ObjectID causing an error......

    for (let index = 0; index < employees.length; index++) {
      const employee = {...employees[index].toObject(),attendance:null};

      const employeeAttendance = await this.attendanceTypes.aggregate(
        [
          {
            '$match': {
          'employeeId': employee._id,
          '$or': [
            {
              'departmentId': new ObjectId(query.departmentId)
            },
            {
              'projectId': new ObjectId(query.projectId)
            },
          ],
            'createdAt': {
              '$gte': new Date(startOfMonth),
              '$lte': new Date(endOfMonth)
            },
            }
          }, {
            '$group': {
              '_id': 'calculatedWorkTime',
              'daysWorked': {
                  '$sum': 1
              },
              'total_hours': {
                  '$sum': '$hoursWorked'
              },
        //       'total_minutes': {
        //           '$sum': '$minutesWorked'
        // }
            }
          }
        ]
        )

        if (employeeAttendance.length < 1) {
          continue
        }

      // console.log(employee, "======================>")
        employee.attendance = {
          ...employeeAttendance[0],
          // month: moment(startOfMonth).format('MMMM'),
          year: moment(startOfMonth).format('YYYY'),
        }
        payload.push(employee)
      }

    return payload;
  }

  public async findAllEmployeeAttendance(ogId: string, query): Promise<any> {
    let {startOfMonth, endOfMonth} = query
    startOfMonth = new Date(startOfMonth)
    endOfMonth = new Date(endOfMonth)
    const dbQuery: any = {ogId, createdAt:{$gte: startOfMonth, $lte: endOfMonth}}
    // if (query.departmentId) {
    //   dbQuery = {ogId, 'departmentId': query.departmentId , createdAt:{$gte: startOfMonth, $lte: endOfMonth}}
    // }
    const attendanceTypes = await this.attendanceTypes.find(dbQuery).populate('employeeId',{first_name:1,last_name:1});
    // console.log(attendanceTypes);
    return attendanceTypes
  }

  public async findAttendanceTypeById(attendanceId: string): Promise<IAttendance> {
    if (isEmpty(attendanceId)) throw new HttpException(400, "provide attendance Id");
    const findAttendanceType: IAttendance = await this.attendanceTypes.findOne({ _id: attendanceId });
    if (!findAttendanceType) throw new HttpException(404, "no record found");
    return findAttendanceType;
  }

  public async bulkAttendanceUpload(attendanceTypeData): Promise<any> {
    const employeesDeductions = []
    const employeesAttendance = []
    const latenessDeduction = await deductionTypeModel.findOne({title:"lateness"})
    const ncnsDeduction = await deductionTypeModel.findOne({title:"NCNS"})

    for(const employeeData of attendanceTypeData){
      // console.log(employeeData)
      const result = await this.generatePossibleDeductions(employeeData.ogid, employeeData, latenessDeduction, ncnsDeduction)
      const attendanceConstructor: ICreateAttendance = AttendanceTypeService.attendanceData(employeeData, result);

      if (result.departmentId != undefined){
        attendanceConstructor.departmentId = result.departmentId
      }
      if (result.projectId != undefined){
        attendanceConstructor.projectId = result.projectId
      }
      employeesAttendance.push(attendanceConstructor)

      if (result.employeesDeductions.length == 0){
        continue
      }
      employeesDeductions.push(...result.employeesDeductions)

    }

    await deductionModel.insertMany(employeesDeductions);
    await attendanceModel.insertMany(employeesAttendance)
    return {employeesDeductions, employeesAttendance}
  }

  public async createAttendanceType(user, attendanceTypeData: ICreateAttendance): Promise<any> {
        if (isEmpty(attendanceTypeData)) throw new HttpException(400, "Bad request");
        const startTime = moment().add(1, 'hour')
        const endOfDay = moment().endOf('day').add(1, 'hour')
        const existingAttendance = await this.attendanceTypes.exists({
          employeeId: user._id,
          createdAt:{
            $gte: startTime,
            $lte: endOfDay
          }
        })
        if (existingAttendance) {
          throw new HttpException(400, "already clocked In!")
        }
        attendanceTypeData.shiftTypeId = user.default_shift;
        attendanceTypeData.employeeId = user._id;
        attendanceTypeData.ogId = user.ogid;
        const attendance = await this.attendanceTypes.create(attendanceTypeData);
        return {attendance};
      }

  public async updateAttendance(user, attendanceData): Promise<any> {

    let attendanceRecord = await this.attendanceTypes.findOne({_id: attendanceData.attendanceId, employeeId: user._id})
    //.populate('shiftTypeId')
    .populate({path: 'employeeId', select:{salaryStructure_id:1}, populate:{path:'salaryStructure_id', model:'SalaryStructure', select:{grossPay:1}}})
    .populate({path:'earnings', model:'SalaryComponent'})
    if(!attendanceRecord){
      console.log('ERROR')
      throw new HttpException(404, "not found");
    }
    console.log('record', attendanceRecord)
    if(attendanceRecord.clockOutTime){
      throw new HttpException(400, "already clocked out!");
    }
    attendanceRecord = attendanceRecord.toObject()
    const workTimeResult: any = await getWorkTime(attendanceRecord.clockInTime, attendanceData.clockOutTime, attendanceRecord.shiftTypeId.start_time);
    attendanceRecord.hoursWorked = workTimeResult.hoursWorked
    attendanceRecord.minutesWorked = workTimeResult.minutesWorked
    attendanceRecord.clockOutTime = attendanceData.clockOutTime

    const updateRecord = await attendanceModel.findOneAndUpdate(
      {
        _id: attendanceData.attendanceId
      },
      {
        $set: attendanceRecord
      },
      { new: true })

    if(workTimeResult.timeDeductions > 0)
    {
     let deductionAmount: number
      const deductionType = await deductionTypeModel.findOne({title:"lateness"})
     deductionAmount = deductionType.percentage * attendanceRecord.employeeId.salaryStructure_id.grossPay;
     await deductionModel.create({employeeId: attendanceRecord.employeeId, deductionTypeId: deductionType._id, amount: deductionAmount })
    }
    return updateRecord;
  }

  private static attendanceData(employeeData, result: IPossibleDeductons): ICreateAttendance {
    return {
      clockInTime : employeeData.clockInTime,
      clockOutTime : employeeData.clockOutTime,
      employeeId : result.employeeId,
      hoursWorked : result.totalWorkHours,
      minutesWorked : result.minutesWorked,
      shiftTypeId : result.shiftTypeId._id,
      ogId : result.ogId
    }
  }

  private async generatePossibleDeductions(ogid: string, attendanceRecord: ICreateAttendance = null, latenessDeductionData, ncnsDeductionData):Promise<IPossibleDeductons>{
    try {

      const latenessDeduction = latenessDeductionData
      const ncnsDeduction = ncnsDeductionData
      const employeesDeductions = []
      let deductionAmount = 0
      const deductionsConstructor:any = {}
      const latenessConstructor:any = {}

      let employee:any = await EmployeeModel.findOne({ogid: ogid, status: {$eq: "active"} }, {
        company_email: 1,
        default_shift:1,
        projectId:1,
        departmentId:1,
        ogid:1 }).populate({
        path: "default_shift",
        select:{
          start_time: 1,
          end_time: 1,
          expectedWorkTime:1
        },
      })

      console.log(employee, ogid, employee._id, "employee ---------------------------->1")
      let employeeSalary: any = await employeesSalaryModel.findOne({employeeId: employee._id})
      employee = employee.toObject();
      employeeSalary = employeeSalary.toObject()
      employee.employeeSalary = employeeSalary


      // const empHours = moment(attendanceRecord.clockInTime).subtract(1, 'hour').format("HH:mm")
      const resumptionTime = employee.default_shift['start_time']
      const workTime = employee.default_shift.expectedWorkTime.split(":")
      const expectedWorkHours = parseInt(workTime[0])
      const employeeTimeData = getWorkTime(attendanceRecord.clockInTime, attendanceRecord.clockOutTime, resumptionTime)
      const employeeLateness: number =  parseInt(String(employeeTimeData.timeDeductions));

      // console.log(attendanceRecord == null, "attendance record null check")
      if (!attendanceRecord) {
        const empLeave = await this.leaveModel.findOne({
          employee_id: employee._id,
          from_date: {'$lte': new Date(moment().format('YYYY-MM-DD'))},
          to_date:{'$gte': new Date(moment().format('YYYY-MM-DD'))}
        })

        if(!empLeave){
          deductionAmount = ncnsDeduction.percentage * employee.employeeSalary.monthlySalary;
          deductionsConstructor.employeeId= employee._id;
          deductionsConstructor.deductionTypeId= ncnsDeduction._id;
          deductionsConstructor.amount= deductionAmount;
          deductionsConstructor.description = "NCNS"
          employeesDeductions.push(deductionsConstructor)
        }
      }

      else if (attendanceRecord.clockOutTime ==  null) {
        // console.log(attendanceRecord == null, "attendance record clock out time check");
        deductionAmount = ncnsDeduction.percentage * employee.employeeSalary.monthlySalary;
        deductionsConstructor.employeeId= employee._id;
        deductionsConstructor.deductionTypeId= ncnsDeduction._id;
        deductionsConstructor.amount= deductionAmount;
        deductionsConstructor.description = "NCNS(no clock out)"
        employeesDeductions.push(deductionsConstructor)
      }

      // workTime calculation
      else if(attendanceRecord.clockInTime && attendanceRecord.clockOutTime){

        if(employeeLateness > 0) {
          deductionAmount = (latenessDeduction.percentage * employee.employeeSalary.monthlySalary) * employeeLateness;
          // console.log(employeeLateness, deductionAmount, "emp hours  ---------------------->>>>")
          latenessConstructor.employeeId= employee._id
          latenessConstructor.deductionTypeId= latenessDeduction._id
          latenessConstructor.amount= deductionAmount
          latenessConstructor.description = "lateness"
          employeesDeductions.push(latenessConstructor)
          // console.log(employeesDeductions, "employee is late")
        }

        //incomplete hours
        if (parseInt(attendanceRecord.totalHours) < expectedWorkHours) {
          const workTimeDeficit = expectedWorkHours - attendanceRecord.totalHours
          deductionAmount = Math.floor(((employee.employeeSalary.monthlySalary/22)/expectedWorkHours)) * workTimeDeficit;
          deductionsConstructor.employeeId= employee._id
          deductionsConstructor.description= "incompleteHours"
          deductionsConstructor.amount= deductionAmount
          employeesDeductions.push(deductionsConstructor)
        }

      }

      return {
        employeesDeductions,
        employeeId: employee._id,
        totalWorkHours: attendanceRecord.totalHours,
        minutesWorked: employeeTimeData.minutesWorked,
        departmentId: employee.departmentId,
        projectId: employee.projectId,
        shiftTypeId: employee.default_shift,
        ogId: employee.ogid
      }

    } catch (error) {
      console.log(error);
    }
  }

  // public async generateAttendance(){
  //   try {
  //     const startOfYesterday =  moment().subtract(1, 'day').startOf('day').add(59, "minutes")
  //     const endOfYesterday =  moment().subtract(1, 'day').endOf('day').add(1, "hour")
  //
  //     console.log(startOfYesterday, endOfYesterday, moment());
  //
  //
  //     //deductions
  //     const latenessDeduction = await deductionTypeModel.findOne({title:"lateness"})
  //     const ncnsDeduction = await deductionTypeModel.findOne({title:"NCNS"})
  //
  //     //fetch all employees
  //     const employees = await EmployeeModel.find({status: {$eq: "active"}}, {_id:1, salaryStructure_id:1})
  //     .populate({path:'salaryStructure_id', select:{grossPay:1, netPay:1}})
  //     const employeesDeductions = []
  //
  //     for (let index = 0; index < employees.length; index++) {
  //       let employee:any = employees[index];
  //       employee = employee.toObject();
  //
  //       const employeeAttendance = await this.attendanceTypes.findOne({
  //         employeeId: employee._id,
  //         createdAt:{
  //           $gte: startOfYesterday,
  //           $lte:endOfYesterday
  //         }
  //       })
  //       .populate('shiftTypeId')
  //
  //       // NCNS for employees who do not have an attendance or clocked in without clocking out.
  //       let deductionAmount = 0
  //
  //       // eslint-disable-next-line prefer-const
  //       let deductionsConstructor:any = {}
  //       const latenessConstructor:any = {}
  //
  //       if (employeeAttendance == null) {
  //         const empLeave = await this.leaveModel.findOne({
  //           employee_id: employee._id,
  //           from_date: {'$lte': new Date(moment().format('YYYY-MM-DD'))},
  //           to_date:{'$gte': new Date(moment().format('YYYY-MM-DD'))}
  //         })
  //
  //         if(!empLeave){
  //           deductionAmount = ncnsDeduction.percentage * employee.salaryStructure_id.grossPay;
  //           deductionsConstructor.employeeId= employee._id,
  //           deductionsConstructor.deductionTypeId= ncnsDeduction._id,
  //           deductionsConstructor.amount= deductionAmount,
  //           employeesDeductions.push(deductionsConstructor)
  //           continue
  //         }
  //         continue
  //       }
  //
  //       if (employeeAttendance.clockOutTime ==  null) {
  //         deductionAmount = ncnsDeduction.percentage * employee.salaryStructure_id.grossPay;
  //         deductionsConstructor.employeeId= employee._id,
  //         deductionsConstructor.deductionTypeId= ncnsDeduction._id,
  //         deductionsConstructor.amount= deductionAmount,
  //         employeesDeductions.push(deductionsConstructor)
  //         continue
  //       }
  //
  //       // workTime calaculation
  //       const workTimeResult: any = await getWorkTime(employeeAttendance.clockInTime, employeeAttendance.clockOutTime, employeeAttendance.shiftTypeId.start_time);
  //
  //       //lateness
  //       if(workTimeResult.timeDeductions > 0)
  //       {
  //
  //         deductionAmount = latenessDeduction.percentage * employee.salaryStructure_id.grossPay;
  //         latenessConstructor.employeeId= employee._id,
  //         latenessConstructor.deductionTypeId= latenessDeduction._id,
  //         latenessConstructor.amount= deductionAmount,
  //         employeesDeductions.push(latenessConstructor)
  //       }
  //
  //       //incomplete hours
  //       if (workTimeResult.hoursWorked < 8) {
  //         const workTimeDeficit = 8 - workTimeResult.hoursWorked
  //         deductionAmount = Math.floor(((employee.salaryStructure_id.grossPay/22)/8)) * workTimeDeficit;
  //         deductionsConstructor.employeeId= employee._id,
  //         deductionsConstructor.description= "incompleteHours",
  //         deductionsConstructor.amount= deductionAmount,
  //         employeesDeductions.push(deductionsConstructor)
  //         continue
  //       }
  //
  //     }
  //   await deductionModel.insertMany(employeesDeductions);
  //   return "done"
  //
  //   } catch (error) {
  //     console.log(error);
  //
  //   }
  // }
}


export default AttendanceTypeService;

