/* eslint-disable prettier/prettier */
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import DepartmentService from '@services/employee/department.service';
import ProjectService from '@services/project/project.service';
import ShiftService from '@services/shift/shift.service';
import EmployeeModel from '@/models/employee/employee.model';
import OfficeFiltrationService from './office_filtration.service';
import { IDepartment } from '@/interfaces/employee-interface/department.interface';
import { IProject } from '@/interfaces/project-interface/project.interface';
import { Employee } from '@/interfaces/employee-interface/employee.interface';
const { ObjectId } = require('mongodb');

class OfficeService {
    private DepartmentService = new DepartmentService()
    private ProjectService = new ProjectService()
    private ShiftService = new ShiftService()
    private officeFiltrationService = new OfficeFiltrationService()
    private employeeModel = EmployeeModel

    public async createOffice(body): Promise<IDepartment | IProject> {
        if (isEmpty(body)) throw new HttpException(400, "No data provided");
        if (body.office_type === "department"){
            return await this.createOfficeHelperMethod(body, this.DepartmentService.createDepartment(body))}
        if (body.office_type === "campaign")  {
            return await this.createOfficeHelperMethod(body, this.ProjectService.create(body))}
    }
    public async findEmployeesByOffice(query): Promise< Employee[] > {
        if (query.department) {
            const employees: Employee[] = await this.officeFiltrationService
                .getAllEmployeesHelperMethod({ department: new ObjectId(query.department) }, query, this.employeeModel)
            // console.log("departmentID", `${query.department}` )
            return employees
        }
        if (query.campaign)  {
            const employees: Employee[] = await this.officeFiltrationService
            .getAllEmployeesHelperMethod({ projectId: query.campaign }, query, this.employeeModel)
            return employees
        }
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
