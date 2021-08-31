/* eslint-disable prettier/prettier */
import { CreateAttendanceDto, UpdateAttendanceDto } from '@dtos/attendance/attendance.dto';
import { HttpException } from '@exceptions/HttpException';
import { IAttendance, IAttendanceCreatedResponse } from '@/interfaces/attendance-interface/attendance-interface';
import attendanceModel  from '@models/attendance/attendance.model';
import employeeModel  from '@models/employee/employee.model';
import { isEmpty } from '@utils/util';
// import {getWorkTime, calculateLateness}  from '@/utils/attendanceCalculator';
import {ObjectId} from 'mongodb'


class AttendanceTypeService {
  public attendanceTypes = attendanceModel;

  public async findAllDepartmentAttendance(id, query): Promise<any> {
    const payload = []
    const {clockInTime, clockOutTime} = query
    const departmentId = id
    // const dbQuery = {departmentId, clockInTime:{$gte: clockInTime, $lte: clockOutTime}}
    const employees = await employeeModel.find({department_id: "612ce924fc13ae5329000af8"}, {ogId: 1, first_name:1, last_name:1, profile_pic:1, _id:1})
    for (let index = 0; index < employees.length; index++) {
      const employee = employees[index].toObject();
      const employeeAttendance = await this.attendanceTypes.aggregate(
        [
          {
            '$match': {
          'employeeId': new ObjectId(employee._id), 
            'departmentId': new ObjectId(departmentId), 
            'clockInTime': {
              '$gte': new Date(clockInTime), 
              '$lte': new Date(clockOutTime)
            },
            }
          }, {
            '$group': {
              '_id': 'hoursWorked', 
              'daysWorked': {
                '$sum': 1
              }, 
              'total_hours': {
                '$sum': '$hoursWorked'
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
    console.log("who dey breeet");
    
    const {departmentId, clockInTime, clockOutTime} = query
    const dbQuery = {ogId, departmentId, clockInTime:{$gte: clockInTime, $lte: clockOutTime}}
    const attendanceTypes = await this.attendanceTypes.find(dbQuery);
    return attendanceTypes;
  }
  
  public async findAttendanceTypeById(attendanceId: string): Promise<IAttendance> {
    if (isEmpty(attendanceId)) throw new HttpException(400, "provide attendance Id");
    const findAttendanceType: IAttendance = await this.attendanceTypes.findOne({ _id: attendanceId });
    if (!findAttendanceType) throw new HttpException(404, "no record found");
    return findAttendanceType;
  }
  
  public async createAttendanceType(attendanceTypeData: CreateAttendanceDto): Promise<any> {
    // let day = 1
    
    // for (let index = 0; index < 32; index++) {
      //   console.log("here"+index);
      //   const num = `${day}`
      //   const data = {
        //     employeeId: "612cead8fc13ae35b5000353",
        //     shiftTypeId: "612ceef7fc13ae57e600012c",
        //     departmentId: "612ce924fc13ae5329000af8",
        //     clockInTime: new Date(2021, 7, Number(num), 10,),
        //     clockOutTime: new Date(2021, 7, Number(num), 18,),
        //     ogId: "850rho199",
        //   }
        
        //   const result = await getWorkTime(data.clockInTime, data.clockOutTime);
        //   data.hoursWorked = result.hoursWorked
        //   data.minutesWorked = result.minutesWorked    
        //   await this.attendanceTypes.create(data);
        //   day ++;
        
        // }
        // return "done";
        if (isEmpty(attendanceTypeData)) throw new HttpException(400, "Bad request");
        const createshiftTypeData = await this.attendanceTypes.create(attendanceTypeData);
        const response: IAttendanceCreatedResponse =  omit(createshiftTypeData.toObject(), ["employeeId"])
        return response;
        
      }  
      
  public async updateAttendance(attendanceData: UpdateAttendanceDto): Promise<any> {
    const updateRecord = await attendanceModel.findOneAndUpdate({
      _id: attendanceData.attendanceId},{clockOutTime: new Date(attendanceData.clockOutTime)
      },
      { new: true })
    return updateRecord;
  }
  
}

  
    export default AttendanceTypeService;
