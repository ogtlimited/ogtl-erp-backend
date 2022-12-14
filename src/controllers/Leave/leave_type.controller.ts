/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import LeaveTypeService from '@/services/leave/leave_type.service';



class LeaveTypeController {
 public leaveType = new LeaveTypeService();
 public getAllLeaveTypes = async (req: any, res: Response, next: NextFunction) => {
    try {
      const leavesType: any = await this.leaveType.getAllLeaveTypes(req.query);
      res.status(200).json({ data: leavesType});
    } catch (error) {
      next(error);
    }
  };
 public getLeaveTypeById = async (req: any, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params
      const leaveType: any = await this.leaveType.getLeaveTypeByID(id);
      res.status(200).json({ data: leaveType});
    } catch (error) {
      next(error);
    }
  };
 public createLeaveType = async (req: any, res: Response, next: NextFunction) => {
    try {
      const leaveType: any = await this.leaveType.createLeaveType(req.body);
      res.status(200).json({ data: leaveType});
    } catch (error) {
      next(error);
    }
  };
}
export default LeaveTypeController;
