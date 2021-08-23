/* eslint-disable prettier/prettier */
import { CreateAttendanceDto } from '@dtos/attendance/attendance.dto';
import { HttpException } from '@exceptions/HttpException';
import { IAttendance, IAttendanceCreatedResponse } from '@/interfaces/attendance-interface/attendance-interface';
import attendanceModel  from '@models/attendance/attendance.model';
import { isEmpty } from '@utils/util';
import omit from 'lodash/omit'

class AttendanceTypeService {
  public attendanceTypes = attendanceModel;

  public async findAllAttendanceType(): Promise<IAttendance[]> {
    const attendanceTypes: IAttendance[] = await this.attendanceTypes.find();
    return attendanceTypes;
  }

  public async findAttendanceTypeById(attendanceId: string): Promise<IAttendance> {
    if (isEmpty(attendanceId)) throw new HttpException(400, "provide attendance Id");

    const findAttendanceType: IAttendance = await this.attendanceTypes.findOne({ _id: attendanceId });
    if (!findAttendanceType) throw new HttpException(404, "no record found");

    return findAttendanceType;
  }

  public async createAttendanceType(attendanceTypeData: CreateAttendanceDto): Promise<IAttendanceCreatedResponse> {

    if (isEmpty(attendanceTypeData)) throw new HttpException(400, "Bad request");
    const createshiftTypeData = await this.attendanceTypes.create(attendanceTypeData);
    const response: IAttendanceCreatedResponse =  omit(createshiftTypeData.toObject(), ["employeeId"])
    return response;
  }

}

export default AttendanceTypeService;
