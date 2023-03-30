/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateEmployeeShiftDto, UpdateEmployeeShiftDto } from '@dtos/shift/employee_shift.dto';
import { IEmployeeShift } from '@interfaces/shift-interface/employee_shift.interface';
import EmployeeShiftService from '@/services/shift/employee_shift.service';

class EmployeeShiftController {
    public employeeShiftService = new EmployeeShiftService();

    public getEmployeesShifts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllshifts: IEmployeeShift[] = await this.employeeShiftService.findAllEmployeesShift();
            res.status(200).json({ data: findAllshifts });
        } catch (error) {
            next(error);
        }
    };
    public getEmployeeShiftById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const employeeShiftId: string = req.params.id;
            const findOneshift: IEmployeeShift = await this.employeeShiftService.findEmployeeShiftById(employeeShiftId);
            res.status(200).json({ data: findOneshift });
        } catch (error) {
            next(error);
        }
    };
    public createEmployeeShift = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const shiftData: CreateEmployeeShiftDto = req.body;
            const createshiftData: IEmployeeShift = await this.employeeShiftService.createEmployeeShift(shiftData);
            res.status(201).json({ data: createshiftData });
        } catch (error) {
            next(error);
        }
    };
    public updateEmployeesShift = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const shiftData: UpdateEmployeeShiftDto[] = req.body;
            const updatedshift: IEmployeeShift = await this.employeeShiftService.updateEmployeeShift(shiftData);
            res.status(200).json({ data: updatedshift });
        } catch (error) {
            next(error);
        }
    };
    public deleteEmployeeShift = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const shiftId: string = req.params.id;
            const deletedshift = await this.employeeShiftService.deleteEmployeeShift(shiftId);
            res.status(200).json({ data: deletedshift });
        } catch (error) {
            next(error);
        }
    };
    public getshiftTypeBasedOnOffice = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const shiftData = await this.employeeShiftService.getshiftTypeBasedOnOffice(req.query);
            res.status(200).json({ shiftData });
        } catch (error) {
            next(error);
        }
    };
}
export default EmployeeShiftController;