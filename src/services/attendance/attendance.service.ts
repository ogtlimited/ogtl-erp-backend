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
// const moment = require('moment');


class AttendanceTypeService {
  public attendanceTypes = attendanceModel;

  public async findAllDepartmentAttendance(query): Promise<any> {
    const payload = []
    const {startOfMonth, endOfMonth} = query
    const officeQuery = attendanceofficeQueryGenerator(query)
    console.log('----------------')
    console.log(officeQuery)
    const employees = await employeeModel.find(officeQuery, {ogid: 1, first_name:1, last_name:1, profile_pic:1, gender: 1, designation:1, _id:1}).populate('designation')
    console.log(employees);
    
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
  
  public async createAttendanceType(attendanceTypeData: ICreateAttendance): Promise<any> {
        if (isEmpty(attendanceTypeData)) throw new HttpException(400, "Bad request");
        const employee = await  employeeModel.findOne({ogid: attendanceTypeData.ogId})
        if(!employee)
        {
          throw new HttpException(404, 'employee not found')
        }
        attendanceTypeData.shiftTypeId = employee.default_shift;
        attendanceTypeData.employeeId = employee._id;
        const attendance = await this.attendanceTypes.create(attendanceTypeData);
        // const allEmployeeAttendance = await this.findAllEmployeeAttendance(attendanceTypeData.ogId, {departmentId: attendanceTypeData.departmentId})
        return {attendance};
      } 
      
  public async updateAttendance(attendanceData: UpdateAttendanceDto): Promise<any> {
    let attendanceRecord = await this.attendanceTypes.findOne({_id: attendanceData.attendanceId}).populate('shiftTypeId')
    if(!attendanceRecord){
      throw new HttpException(404, "not found");
    }
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
    
    // return workTimeResult;
    if(workTimeResult.timeDeductions > 0)
    {
     const deductionType = await deductionTypeModel.findOne({title:"lateness"})
     await deductionModel.create({employeeId: attendanceRecord.employeeId, deductionTypeId: deductionType._id, amount: deductionType.amount })
    }
    return updateRecord;
  }
  
}

  
    export default AttendanceTypeService;
