/* eslint-disable prettier/prettier */

import { Employee } from '@interfaces/employee-interface/employee.interface';
import EmployeeModel from '@models/employee/employee.model';
import PersonalDetailModel from '@models/employee/personal-details.model';
import DesignationModel from '@models/employee/designation.model';
import projectModel from '@models/project/project.model';


class EmployeeVerificationService {
  private Employees = EmployeeModel;
  private PersonalDetailModel = PersonalDetailModel;
  private DesignationModel = DesignationModel;
  private projectModel = projectModel;
  public async findEmployeeByOgId(ogid): Promise<any> {
    const employee: Employee = await this.Employees.findOne({ ogid });
    const role = employee.designation ? await this.DesignationModel.findById({ _id:employee?.designation }) : null
    const campaign = employee.projectId? await this.projectModel.findById({ _id: employee?.projectId }) : null
    const personalDetails = await this.PersonalDetailModel.findOne({ employee_id: employee?._id  })
    return {
      PictureUrl: employee.image,
      StaffUniqueId: employee.ogid,
      Email: employee.company_email,
      FullName: this.formatFullname(employee, employee.first_name, employee.middle_name, employee.last_name),
      // PhoneNumber: "Phone Number",
      Gender: employee.gender,
      MaritalStatus: personalDetails.marital_status,
      DateOfBirth: personalDetails.date_of_birth,
      // StateOfOrigin: "State of Origin",
      StartDate: new Date(employee.date_of_joining),
      Campaign: campaign? campaign.project_name : null,
      Role: role ? role.designation : null
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
