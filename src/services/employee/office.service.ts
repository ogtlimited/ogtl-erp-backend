/* eslint-disable prettier/prettier */
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import  DepartmentService  from '@services/employee/department.service';
import  ProjectService  from '@services/project/project.service';
import  ShiftService  from '@services/shift/shift.service';
import { IDepartment } from '@/interfaces/employee-interface/department.interface';
import { IProject } from '@/interfaces/project-interface/project.interface';
import { IShiftType } from '@/interfaces/shift-interface/shift_type.interface';

class OfficeService{
    public DepartmentService = new DepartmentService()
    public ProjectService = new ProjectService()
    public ShiftService = new ShiftService()

  public async createOffice(body) : Promise<IDepartment | IProject>{
       if (isEmpty(body)) throw new HttpException(400, "No data provided");
       if(body.office_type === "department"){
         const department: IDepartment = await this.DepartmentService.createDepartment(body)
         body.departmentId = department._id
         await this.ShiftService.createshiftType(body)
         return department
        }
       if(body.office_type === "campaign"){
         const campaign: IProject = await this.ProjectService.create(body)
         body.campaignId = campaign._id 
         await this.ShiftService.createshiftType(body)
         return campaign
        }
      }
}
export default OfficeService;
