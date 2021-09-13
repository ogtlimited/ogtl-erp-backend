/* eslint-disable prettier/prettier */
import  shiftTypeService  from '@/services/shift/shift.service';
import DepartmentService  from '@/services/employee/department.service';
import  DesignationService  from '@/services/employee/designation.service';
import EmployeeService from './employee.service';
import ProjectService from '@services/project/project.service';
import ClientService from '@services/project/client.service';
import JobApplicantService from '@services/recruitment/job_applicant.service';

class CombineServices {
  public designationS = new DesignationService();
  public departmentS = new DepartmentService();
  public shiftS = new shiftTypeService();
  public employeeS = new EmployeeService()
  public projectS = new ProjectService()
  public clientS  = new ClientService()
  public jobApplicantS = new JobApplicantService()
//   public departmentS = new Department

  public async createEmployeeFormSelection(){
    const shifts = await this.shiftS.findAllshiftType()
    const employees = await this.employeeS.findAllEmployee()
    const designations = await this.designationS.findAllDesignations()
    const departments = await this.departmentS.findAllDepartments()
    const projects = await this.projectS.findAll();
    const jobApplicants = await this.jobApplicantS.findAllJobApplicants()
    return {
        shifts: shifts,
        designations: designations,
        departments,
        employees,
        projects,
        jobApplicants
    }
  }

  public async adminDashboardDate(){
    const projects = await this.projectS.findAll();
    const clients = await  this.clientS.findAll();
    const employees = await this.employeeS.findAllEmployee()

    return {
      totalProjects: projects.length,
      totalClients: clients.length,
      totalEmployees: employees.length
    }
  }
}
 export default CombineServices
