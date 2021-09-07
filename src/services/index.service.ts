/* eslint-disable prettier/prettier */
import  shiftTypeService  from '@/services/shift/shift.service';
import  DesignationService  from '@/services/employee/designation.service';
import EmployeeService from './employee.service';

class CombineServices {
  public designationS = new DesignationService();
  public shiftS = new shiftTypeService();
  public employeeS = new EmployeeService()
//   public departmentS = new Department

  public async createEmployeeFormSelection(){
    const shifts = await this.shiftS.findAllshiftType()
    const employees = await this.employeeS.findAllEmployee()
    const designations = await this.designationS.findAllDesignations()
    return {
        shifts: shifts,
        designations: designations,
        employees
    }
  }
}
 export default CombineServices
