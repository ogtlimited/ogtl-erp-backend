/* eslint-disable prettier/prettier */
import { IShiftAssignment } from '@interfaces/shift-interface/shift_assignment.interface';
import shiftAssignmentModel from '@models/shift/shift_assignment.model';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { CreateShiftAssignmentDto, UpdateShiftAssignmentDto } from '@dtos/shift/shift_assignment.dto';
import EmployeeModel from '@models/employee/employee.model';

class ShiftAssignmentService {
  public shiftAssignment = shiftAssignmentModel;
  public employeeModel = EmployeeModel

  //Method for finding all shift assignments
  public async findAllShiftAssignments(): Promise<IShiftAssignment[]>{
    return this.shiftAssignment.find().populate('employee_id shift_type_id');
  }

  //Method for finding a single shift assignment
  public async findShiftAssignmentById(shiftAssignmentId: string): Promise<IShiftAssignment>{
    //check if no shift assignment id is empty
    if(isEmpty(shiftAssignmentId)) throw new HttpException(400,`Shift assignment not provided`);
    //find shift assignment using the id provided
    const findShiftAssignment:IShiftAssignment = await this.shiftAssignment.findOne({_id:shiftAssignmentId}).populate('employee_id shift_type_id');
    //throw error if shift assignment does not exist
    if(!findShiftAssignment) throw new HttpException(409,`Shift assignment with Id:${shiftAssignmentId}, does not exist`);
    //return shift assignment
    return findShiftAssignment;
  }

  //Method for creating shift assignment
  public async createShiftAssignment(shiftAssignmentData: CreateShiftAssignmentDto): Promise<IShiftAssignment>{
    //check if shift assignment data is empty
    if (isEmpty(shiftAssignmentData)) throw new HttpException(400, "Bad request");
    //find shift assignment using the employee id provided
    const findShitAssignment: IShiftAssignment = await this.shiftAssignment.findOne({ employee_id: shiftAssignmentData.employee_id });
    await this.employeeModel.findOneAndUpdate({_id: shiftAssignmentData.employee_id}, {$set: {default_shift:shiftAssignmentData.shift_type_id}}, { new: true })

    //throw error if shift assignment does exist
    if (findShitAssignment) throw new HttpException(409, `Shift assignment already exists`);
    // return created shift assignment
    return await this.shiftAssignment.create(shiftAssignmentData);
  }

  //Method for updating shift assignment
  public async updateShiftAssignment(shiftAssignmentId: string,shiftAssignmentData: UpdateShiftAssignmentDto):Promise<IShiftAssignment>{
    //check if no shift assignment data is empty

    if (isEmpty(shiftAssignmentData)) throw new HttpException(400, "Bad request");
    if(shiftAssignmentData._id){
      //find shift assignment using the employee id provided
      const findShitAssignment: IShiftAssignment = await this.shiftAssignment.findOne({ _id: shiftAssignmentData._id });
      if(findShitAssignment && findShitAssignment._id != shiftAssignmentId) throw new HttpException(409, `${shiftAssignmentData.employee_id} already exists`);
    }
    //find shift assignment using the id provided and update it
    const updateShiftAssignmentById:IShiftAssignment = await this.shiftAssignment.findByIdAndUpdate(shiftAssignmentId,shiftAssignmentData,{new:true})
    await this.employeeModel.findOneAndUpdate({_id: shiftAssignmentData.employee_id}, {$set: {default_shift:shiftAssignmentData.shift_type_id}}, { new: true })
    if (!updateShiftAssignmentById) throw new HttpException(409, "shift assignment could not be updated");
    // return updated shift assignment
    return updateShiftAssignmentById;
  }

  //Method for deleting shift assignment
  public async deleteShiftAssignment(shiftAssignmentId: string):Promise<IShiftAssignment>{
    //find shift assignment using the id provided and delete
    const deleteShiftAssignmentById: IShiftAssignment = await this.shiftAssignment.findByIdAndDelete(shiftAssignmentId);
    if(!deleteShiftAssignmentById) throw new HttpException(409, `Shift assignment with Id:${shiftAssignmentId}, does not exist`);
    return deleteShiftAssignmentById;
  }
}

export default ShiftAssignmentService;
