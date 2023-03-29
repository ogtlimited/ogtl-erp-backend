/* eslint-disable prettier/prettier */

import EmployeeModel from '@models/employee/employee.model';
import EmployeeShiftModel from '@/models/shift/employee_shift.model';
import PersonalDetailModel from '@models/employee/personal-details.model';
import { HttpException } from '@exceptions/HttpException';
import {_} from "lodash"



class EmployeeVerificationService {
  private Employees = EmployeeModel;
  private employeeShiftModel = EmployeeShiftModel;
  private PersonalDetailModel = PersonalDetailModel;
  public async findEmployeeByOgId(ogid): Promise<any> {
    // if (isEmpty(EmployeeData)) throw new HttpException(400, "You're not EmployeeData");
    const employee = await this.Employees.findOne({ ogid })
      .populate('designation')
      .populate('department')
      .populate('projectId');
    const shifts = await this.employeeShiftModel.find({ ogid });
    const formattedShift = shifts.map(shift=>{
      return {
        day: shift.day,
        start: shift.start,
        end: shift.end
      }
    })
    if (!employee) throw new HttpException(404, "Record Not Found");
    const personalDetails = await this.PersonalDetailModel.findOne({ employee_id: employee?._id  })
    return {
      PictureUrl: employee.image,
      StaffUniqueId: employee.ogid,
      Email: employee.company_email,
      campaign: employee.projectId ? employee.projectId.tilte : null,
      department: employee.department ? employee.department.department : null ,
      FullName: this.formatFullname(employee, employee.first_name, employee.middle_name, employee.last_name),
      PhoneNumber: personalDetails ? personalDetails.phone_number : null,
      Gender: employee.gender,
      MaritalStatus: personalDetails ? personalDetails.marital_status : null,
      DateOfBirth: personalDetails ? personalDetails.date_of_birth : null,
      StateOfOrigin: personalDetails ? personalDetails.state : null,
      StartDate: new Date(employee.date_of_joining),
      Role: employee.designation ? employee.designation.designation : null,
      Shifts: shifts.length != 0 ? formattedShift : null,
    };
  }

  private formatFullname = (modelName,first_name, middle_name, last_name)=> {
    first_name = modelName.first_name.charAt(0).toUpperCase() + modelName.first_name.toLowerCase().slice(1)
    last_name = modelName.last_name.charAt(0).toUpperCase() + modelName.last_name.toLowerCase().slice(1)
    middle_name = modelName.middle_name.charAt(0).toUpperCase() + modelName.middle_name.toLowerCase().slice(1)
    return `${first_name} ${last_name} ${middle_name}` 
    
  }
}
export default EmployeeVerificationService;
