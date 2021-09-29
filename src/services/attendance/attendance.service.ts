/* eslint-disable prettier/prettier */
import { CreateAttendanceDto, UpdateAttendanceDto } from '@dtos/attendance/attendance.dto';
import { HttpException } from '@exceptions/HttpException';
import { IAttendance, ICreateAttendance } from '@/interfaces/attendance-interface/attendance-interface';
import attendanceModel  from '@models/attendance/attendance.model';
import employeeModel  from '@models/employee/employee.model';
// import deductionModel  from '@models/payroll/deduction.model';
import { isEmpty } from '@utils/util';
import {getWorkTime}  from '@/utils/attendanceCalculator';
import {ObjectId} from 'mongodb'
import { attendanceofficeQueryGenerator, officeQueryGenerator } from '@/utils/payrollUtil';
import deductionModel from '@/models/payroll/deduction.model';
import deductionTypeModel from '@/models/payroll/deductionType.model';
import moment = require('moment');
import salaryComponentModel from '@/models/payroll/salary-component.model';
import projectModel from '@/models/project/project.model';
import departmentModel from '@/models/department/department.model';
import EmployeeModel from '@models/employee/employee.model';


class AttendanceTypeService {
  public attendanceTypes = attendanceModel;

  public async findAllDepartmentAttendance(query): Promise<any> {
    const payload = []
    const {startOfMonth, endOfMonth} = query
    const officeQuery = attendanceofficeQueryGenerator(query)
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
              'total_minutes': {
                  '$sum': '$minutesWorked'
        }
            }
          }
        ]
        )
        if (employeeAttendance.length < 1) {
          continue
        }
        employee.attendance = employeeAttendance[0]
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
      
  public async updateAttendance(user, attendanceData: UpdateAttendanceDto): Promise<any> {
    // const data = await this.generateAttendance("project")
    // return data
    let attendanceRecord = await this.attendanceTypes.findOne({_id: attendanceData.attendanceId, employeeId: user._id})
    .populate('shiftTypeId')
    .populate({path: 'employeeId', select:{salaryStructure_id:1}, populate:{path:'salaryStructure_id', model:'SalaryStructure', select:{grossPay:1}}})
    .populate({path:'earnings', model:'SalaryComponent'})
    if(!attendanceRecord){
      throw new HttpException(404, "not found");
    }
    // if(attendanceRecord.clockOutTime){
    //   throw new HttpException(400, "already clocked out!");
    // }
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
     let deductionAmount = 0
     const deductionType = await deductionTypeModel.findOne({title:"lateness"})
     deductionAmount = deductionType.percentage * attendanceRecord.employeeId.salaryStructure_id.grossPay;
     await deductionModel.create({employeeId: attendanceRecord.employeeId, deductionTypeId: deductionType._id, amount: deductionAmount })
    }
    return updateRecord;
  }
  
  public async generateAttendance(query = "project"){
    try {
      const startOfYesterday =  moment().subtract(1, 'day').startOf('day').add(59, "minutes")
      const endOfYesterday =  moment().subtract(1, 'day').endOf('day').add(1, "hour")

      //deductions
      const latenessDeduction = await deductionTypeModel.findOne({title:"lateness"})
      const ncnsDeduction = await deductionTypeModel.findOne({title:"NCNS"})

      //fetch all employees
      const employees = await EmployeeModel.find({status: {$eq: "active"}}, {_id:1, salaryStructure_id:1})
      .populate({path:'salaryStructure_id', select:{grossPay:1, netPay:1}})
      const employeesDeductions = []
      // const attendances = []
      // const peopleWeyShow = []
      // const bastards = []

      for (let index = 0; index < employees.length; index++) {
        let employee:any = employees[index];
        employee = employee.toObject();
       
        if (employee._id == "614a6babcf398e7c9cd95425") {
          bastards.push(employee)
        }
        
        const employeeAttendance = await this.attendanceTypes.findOne({employeeId: employee._id, createdAt:{$gte: startOfYesterday, $lte:endOfYesterday}})
        .populate('shiftTypeId')
        
        // NCNS for employees who do not have an attendance or clocked in without clocking out.
        let deductionAmount = 0

        // eslint-disable-next-line prefer-const
        let deductionsConstructor:any = {}
        let latenessConstructor:any = {}

        if (employeeAttendance == null || employeeAttendance.clockOutTime ==  null) {
          deductionAmount = ncnsDeduction.percentage * employee.salaryStructure_id.grossPay;
          deductionsConstructor.employeeId= employee._id,
          deductionsConstructor.deductionTypeId= ncnsDeduction._id,
          deductionsConstructor.amount= deductionAmount,
          employeesDeductions.push(deductionsConstructor)
          continue
        }

        // workTime calaculation
        const workTimeResult: any = await getWorkTime(employeeAttendance.clockInTime, employeeAttendance.clockOutTime, employeeAttendance.shiftTypeId.start_time);

        //lateness 
        if(workTimeResult.timeDeductions > 0)
        {
          
          deductionAmount = latenessDeduction.percentage * employee.salaryStructure_id.grossPay;
          latenessConstructor.employeeId= employee._id,
          latenessConstructor.deductionTypeId= latenessDeduction._id,
          latenessConstructor.amount= deductionAmount,
          employeesDeductions.push(latenessConstructor)
        }

        //incomplete hours
        if (workTimeResult.hoursWorked < 8) {
          const workTimeDeficit = 8 - workTimeResult.hoursWorked 
          deductionAmount = Math.floor(((employee.salaryStructure_id.grossPay/22)/8)) * workTimeDeficit;
          deductionsConstructor.employeeId= employee._id,
          deductionsConstructor.description= "incompleteHours",
          deductionsConstructor.amount= deductionAmount,      
          employeesDeductions.push(deductionsConstructor)
          continue
        }

      }
    await deductionModel.insertMany(employeesDeductions);
    return "done"
     
    } catch (error) {
      console.log(error);
      
    }
  }
}

  
export default AttendanceTypeService;

