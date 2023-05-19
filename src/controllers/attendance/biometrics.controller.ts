import { NextFunction, Request, Response } from 'express';
import { Employee } from '@interfaces/employee-interface/employee.interface';
import TimeAndAttendanceEnrolledStaffService from '@/services/attendance/biometrics.service';

class TimeAndAttendanceEnrolledStaffController {
    public timeAndAttendanceEnrolledStaffService = new TimeAndAttendanceEnrolledStaffService();

    public findEnrolledStaff = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const timeAndAttendanceEnrolledStaff: Employee = await this.timeAndAttendanceEnrolledStaffService.findEnrolledStaff();
            res.status(200).json({ data: timeAndAttendanceEnrolledStaff });
        } catch (error) {
            next(error);
        }
    }
    public findStaffThatAreNotEnrolled = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const staff: Employee = await this.timeAndAttendanceEnrolledStaffService.findStaffThatAreNotEnrolled();
            res.status(200).json({ data: staff });
        } catch (error) {
            next(error);
        }
    }
    public findStaffWithoutShift = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const employees: Employee = await this.timeAndAttendanceEnrolledStaffService.findStaffWithoutShift();
            res.status(200).json({ data: employees });
        } catch (error) {
            next(error);
        }
    }
}

export default TimeAndAttendanceEnrolledStaffController;