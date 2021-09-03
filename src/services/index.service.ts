/* eslint-disable prettier/prettier */
import  shiftTypeService  from '@/services/shift/shift.service';
import  DesignationService  from '@/services/employee/designation.service';


class CombineServices {
  public designationS = new DesignationService();
  public shiftS = new shiftTypeService();
//   public departmentS = new Department

  public async createEmployeeFormSelection(){
    const shifts = await this.shiftS.findAllshiftType()
    const designations = await this.designationS.findAllDesignations()
    return {
        shifts: shifts,
        designations: designations
    }
  }
}
 export default CombineServices
