import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import TimeAndAttendanceEnrolledStaffController from '@/controllers/attendance/biometrics.controller';

class TimeAndAttendanceEnrolledStaffRoute implements Routes {
    public path = '/time-and-attendance';
    public router = Router();
    public timeAndAttendanceEnrolledStaffController = new TimeAndAttendanceEnrolledStaffController();

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(`${this.path}/enrolled-staff`, this.timeAndAttendanceEnrolledStaffController.findEnrolledStaff);
        this.router.get(`${this.path}/not-enrolled`, this.timeAndAttendanceEnrolledStaffController.findStaffThatAreNotEnrolled);
        this.router.get(`${this.path}/without-shift`, this.timeAndAttendanceEnrolledStaffController.findStaffWithoutShift);

    }
}

export default TimeAndAttendanceEnrolledStaffRoute;