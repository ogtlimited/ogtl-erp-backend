/* eslint-disable prettier/prettier */

import EmployeeModel from '@models/employee/employee.model';
import PersonalDetailModel from '@models/employee/personal-details.model';


class EmployeeVerificationService {
  private Employees = EmployeeModel;
  private PersonalDetailModel = PersonalDetailModel;
  public async findEmployeeByOgId(ogid): Promise<any> {
    const employee = await this.Employees.findOne({ ogid })
      .populate('designation')
      .populate('projectId')
      .populate('default_shift');
    const personalDetails = await this.PersonalDetailModel.findOne({ employee_id: employee?._id  })
    return {
      PictureUrl: employee.image,
      StaffUniqueId: employee.ogid,
      Email: employee.company_email,
      FullName: this.formatFullname(employee, employee.first_name, employee.middle_name, employee.last_name),
      PhoneNumber: personalDetails.phone_number ? personalDetails.phone_number : null,
      Gender: employee.gender,
      MaritalStatus: personalDetails.marital_status,
      DateOfBirth: personalDetails.date_of_birth,
      StateOfOrigin: personalDetails.state ? personalDetails.state : null,
      StartDate: new Date(employee.date_of_joining),
      Campaign: employee.projectId ? employee.projectId.project_name : null,
      Role: employee.designation ? employee.designation.designation : null,
      ShiftStartTime: employee.default_shift ? employee.default_shift.start_time : null,
      ShiftEndTime: employee.default_shift ? employee.default_shift.end_time : null
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
