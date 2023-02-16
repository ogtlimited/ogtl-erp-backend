/* eslint-disable prettier/prettier */
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import DepartmentService from '@services/employee/department.service';
import ProjectService from '@services/project/project.service';
import ShiftService from '@services/shift/shift.service';
import { IDepartment } from '@/interfaces/employee-interface/department.interface';
import { IProject } from '@/interfaces/project-interface/project.interface';

class OfficeService {
    public DepartmentService = new DepartmentService()
    public ProjectService = new ProjectService()
    public ShiftService = new ShiftService()

    public async createOffice(body): Promise<IDepartment | IProject> {
        if (isEmpty(body)) throw new HttpException(400, "No data provided");
        if (body.office_type === "department"){
            return await this.createOfficeHelperMethod(body, this.DepartmentService.createDepartment(body))}
        if (body.office_type === "campaign")  {
            return await this.createOfficeHelperMethod(body, this.ProjectService.create(body))}
    }
    private async createOfficeHelperMethod(body, service){
        const office_name = await service
        if (body.office_type === "department") { body.departmentId = office_name._id } 
        if (body.office_type === "campaign") { body.campaignId = office_name._id } 
        await this.ShiftService.createshiftType(body)
        return office_name
    }
}
export default OfficeService;
