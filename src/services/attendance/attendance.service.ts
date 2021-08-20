/* eslint-disable prettier/prettier */
import { CreateAttendanceDto } from '@dtos/attendance/attendance.dto';
import { HttpException } from '@exceptions/HttpException';
import { IAttendance } from '@interfaces/attendance-interface/attendance-interface';
import attendanceModel  from '@models/attendance/attendance.model';
import { isEmpty } from '@utils/util';

class AttendanceTypeService {
  public attendanceTypes = attendanceModel;

  public async findAllAttendanceType(): Promise<IAttendance[]> {
    const attendanceTypes: IAttendance[] = await this.attendanceTypes.find();
    return attendanceTypes;
  }

  public async findAttendanceTypeById(attendanceId: string): Promise<IAttendance> {
    if (isEmpty(attendanceId)) throw new HttpException(400, "You're not attendanceId");

    const findAttendanceType: IAttendance = await this.attendanceTypes.findOne({ _id: attendanceId });
    if (!findAttendanceType) throw new HttpException(409, "You're not shiftType");

    return findAttendanceType;
  }

  public async createAttendanceType(attendanceTypeData: CreateAttendanceDto): Promise<IAttendance> {

    if (isEmpty(attendanceTypeData)) throw new HttpException(400, "Bad request");
    const createshiftTypeData: IAttendance = await this.attendanceTypes.create(attendanceTypeData);
    return createshiftTypeData;
  }

}

export default AttendanceTypeService;
