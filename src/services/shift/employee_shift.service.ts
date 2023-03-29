/* eslint-disable prettier/prettier */
import { CreateEmployeeShiftDto, UpdateEmployeeShiftDto } from '@dtos/shift/employee_shift.dto';
import { HttpException } from '@exceptions/HttpException';
import { IEmployeeShift } from '@interfaces/shift-interface/employee_shift.interface';
import EmployeeShiftModel from '@models/shift/employee_shift.model';
import { isEmpty } from '@utils/util';
import { SumHours } from '@utils/calculateTimeDifference';
class EmployeeShiftService {
    public employeeShiftModel = EmployeeShiftModel;
    constructor() {
    }

    public async findAllEmployeesShift(): Promise<IEmployeeShift[]> {
        return this.employeeShiftModel.find()
    }
    public async findEmployeeShiftById(employeeShiftId: string): Promise<IEmployeeShift> {
        if (isEmpty(employeeShiftId)) throw new HttpException(400, "No shift Id provided");
        const findEmployeeShift: IEmployeeShift = await this.employeeShiftModel.findOne({ _id: employeeShiftId });
        if (!findEmployeeShift) throw new HttpException(409, "You're not shiftType");
        return findEmployeeShift;
    }

    public async createEmployeeShift(shiftData: CreateEmployeeShiftDto): Promise<IEmployeeShift> {
        if (isEmpty(shiftData)) throw new HttpException(400, "Bad request");
        const findShift: IEmployeeShift = await this.employeeShiftModel.findOne({ ogid: shiftData.ogid });
        if (findShift) throw new HttpException(409, `shift belonging to ${shiftData.ogid} already exists`);
        const result = SumHours(shiftData.end, shiftData.start)
        shiftData.expectedWorkTime = result.toString()
        if (result < 8) throw new HttpException(409, "Working hours has to be 8 hours or more");
        return await this.employeeShiftModel.create(shiftData);
    }

    public async updateEmployeeShift(employeeShiftId: string, shiftData: UpdateEmployeeShiftDto): Promise<IEmployeeShift> {
        if (isEmpty(shiftData)) throw new HttpException(400, "Bad request");
        const updateEmployeeShiftById: IEmployeeShift = await this.employeeShiftModel.findByIdAndUpdate({ _id: employeeShiftId }, shiftData, { new: true });
        if (!updateEmployeeShiftById) throw new HttpException(409, "shift does not exist");
        return updateEmployeeShiftById;
    }
    public async deleteEmployeeShift(employeeShiftId: string): Promise<IEmployeeShift> {
        const deletedShift: IEmployeeShift = await this.employeeShiftModel.findByIdAndDelete(employeeShiftId);
        if (!deletedShift) throw new HttpException(409, "shift does not exist");
        return deletedShift;
    }
    public async getshiftTypeBasedOnOffice(query): Promise<IEmployeeShift[]> {
        if (query.departmentId) {
            const shift: IEmployeeShift[] = await this.employeeShiftModel.find({ departmentId: query.departmentId });
            return shift
        }
        if (query.campaignId) {
            const shift: IEmployeeShift[] = await this.employeeShiftModel.find({ campaignId: query.campaignId });
            return shift
        }
    }
}
export default EmployeeShiftService;
