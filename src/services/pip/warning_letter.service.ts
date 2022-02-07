/* eslint-disable prettier/prettier */
import warningLetterModel from '@models/pip/warning_letter.model';
import { IWarningLetter } from '@interfaces/pip-interface/warning_letter.interface';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { CreateWarningLetterDto } from '@dtos/pip/warning_letter.dto';
import EmployeeModel from '@models/employee/employee.model';
import { Employee } from '@interfaces/employee-interface/employee.interface';
import  TerminationService  from '@/services/employee-lifecycle/termination.service';

class WarningLetterService {
  public warningLetter = warningLetterModel;
  public employeeModel = EmployeeModel;
  public terminationS = new TerminationService()

  //Method for getting all warning letters
  public async findAllWarningLetters(): Promise<IWarningLetter[]> {
    return this.warningLetter.find().populate('employee_id');
  }

  //Method for getting all warning Letters for an individual employee
  public async findAllWarningLettersForAnEmployee(employeeId: string): Promise<IWarningLetter[]> {
    //Check if employee id is empty
    if (isEmpty(employeeId)) throw new HttpException(400, `Employee Id not provided`);
    //return warning letter
    return this.warningLetter.find({ employee_id: employeeId }).populate('employee_id');
  }

  //Method for finding an individual warning letter
  public async findWarningLetterById(warningLetterId: string): Promise<IWarningLetter> {
    //Check if no warning letter id is empty
    if (isEmpty(warningLetterId)) throw new HttpException(400, `Warning Letter Id not provided`);
    //find warning letter using the id provided
    const findWarningLetter: IWarningLetter = await this.warningLetter.findOne({ _id: warningLetterId }).populate('employee_id');
    //throw error if warning letter does not exist
    if (!findWarningLetter) throw new HttpException(409, `Warning letter with ID:${warningLetterId} does not exist.`);
    //return warning letter
    return findWarningLetter;
  }

  //Method for creating warning letter
  public async createWarningLetter(warningLetterData: CreateWarningLetterDto): Promise<IWarningLetter> {
    if (isEmpty(warningLetterData)) throw new HttpException(400, 'Bad request');
    const findEmployeeById: Employee = await this.employeeModel.findOne({ _id: warningLetterData.employee_id });
    if (!findEmployeeById) throw new HttpException(404, 'Employee does not exist!');
    const newWarningLetter = await this.warningLetter.create(warningLetterData);
    if (Number(findEmployeeById.warningCount) === 2 && findEmployeeById.isInPIP) {
      await this.employeeModel.findOneAndUpdate(
        { _id: warningLetterData.employee_id },
        { $set: { warningCount: 3, status: 'terminated' } },
        { new: true },
      );
      const terminationData = {
        employee: warningLetterData.employee_id,
        reason: 'Employee has more than two warning letter',
        terminationType: 'others',
        terminationDate: new Date()
      }
      this.terminationS.createTermination(terminationData)

    } else if (findEmployeeById.warningCount === 1) {
      await this.employeeModel.findOneAndUpdate({ _id: warningLetterData.employee_id }, { $set: { warningCount: 2, isInPIP: true } }, { new: true });
    } else {
      await this.employeeModel.findOneAndUpdate({ _id: warningLetterData.employee_id }, { $set: { warningCount: 1 } }, { new: true });
    }
    return newWarningLetter;
  }

  //Method for deleting warning letter
  public async deleteWarningLetter(warningLetterId: string): Promise<IWarningLetter> {
    //find warning letter using id provided and delete
    const deleteWarningLetterById: IWarningLetter = await this.warningLetter.findByIdAndDelete(warningLetterId);
    if (!deleteWarningLetterById) throw new HttpException(409, `Warning Letter with Id:${warningLetterId}, does not exist`);
    return deleteWarningLetterById;
  }
}
export default WarningLetterService;
