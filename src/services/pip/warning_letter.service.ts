import warningLetterModel from '@models/pip/warning_letter.model';
import { IWarningLetter } from '@interfaces/pip-interface/warning_letter.interface';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { CreateWarningLetterDto } from '@dtos/pip/warning_letter.dto';
import EmployeeModel from '@models/employee/employee.model';

class WarningLetterService {
  public warningLetter = warningLetterModel;
  public employeeModel = EmployeeModel

  //Method for getting all warning letters
  public async findAllWarningLetters(): Promise<IWarningLetter[]>{
    return this.warningLetter.find().populate('employee_id hr_user_id');
  }

  //Method for finding an individual warning letter
  public async findWarningLetterById(warningLetterId:string): Promise<IWarningLetter>{
    //Check if no warning letter id is empty
    if(isEmpty(warningLetterId)) throw new HttpException(400,`Warning Letter Id not provided`);
    //find warning letter using the id provided
    const findWarningLetter:IWarningLetter = await this.warningLetter.findOne({_id:warningLetterId}).populate('employee_id hr_user_id');
    //throw error if warning letter does not exist
    if(!findWarningLetter) throw new HttpException(409,`Warning letter with ID:${warningLetterId} does not exist.`)
    //return warning letter
    return findWarningLetter;
  }

  //Method for creating warning letter
  public async createWarningLetter(warningLetterData: CreateWarningLetterDto): Promise<IWarningLetter>{
    //check if warning letter data is empty
    if(isEmpty(warningLetterData)) throw new HttpException(400,"Bad request");
    //Find warning letter using employee id;
    const findWarningLetterByEmployeeId: IWarningLetter = await this.warningLetter.findOne({employee_id:warningLetterData.employee_id})
    //1) check if warning count of employee is greater than 2 and terminate employee
    if(findWarningLetterByEmployeeId.warningCount > 2 ){
      //set employee active to false
      const newWarningCount = findWarningLetterByEmployeeId.warningCount+= 1
      this.warningLetter.findOneAndUpdate({employee_id: warningLetterData.employee_id}, {$set: {warningCount: newWarningCount}},{ new: true })
      this.employeeModel.findOneAndUpdate({employee_id: warningLetterData.employee_id}, {$set: {status:'terminated'}}, { new: true })
      return await this.warningLetter.create(warningLetterData);
    }
    //2) check if warning count of employee is greater than 1
    //   i: increment warning count
    //  ii: change inPipStatus to true
    else if(findWarningLetterByEmployeeId.warningCount > 1 ){
      this.warningLetter.findOneAndUpdate({employee_id: warningLetterData.employee_id}, {$set: {warningCount: findWarningLetterByEmployeeId.warningCount+= 1,isInPip: true}},{ new: true })
      return await this.warningLetter.create(warningLetterData);
    }
    //3) check if warning count ===0
    //  i: increment warning count to 1
      else{
      this.warningLetter.findOneAndUpdate({employee_id: warningLetterData.employee_id}, {$set: {warningCount: 1}},{ new: true })
      return await this.warningLetter.create(warningLetterData);
    }
    // return warning letter

  }

  //Method for deleting warning letter
  public async deleteWarningLetter(warningLetterId:string):Promise<IWarningLetter>{
    //find warning letter using id provided and delete
    const deleteWarningLetterById:IWarningLetter = await this.warningLetter.findByIdAndDelete(warningLetterId);
    if(!deleteWarningLetterById) throw new HttpException(409,`Warning Letter with Id:${warningLetterId}, does not exist`);
    return deleteWarningLetterById;
  }
}
export default WarningLetterService;
