/* eslint-disable prettier/prettier */
import  shiftTypeService  from '@/services/shift/shift.service';

import  DesignationService  from '@/services/employee/designation.service';
import  DepartmentService  from '@/services/employee/department.service';
import EmployeeService from './employee.service';
import ProjectService from '@services/project/project.service';
import ClientService from '@services/project/client.service';
import JobApplicantService from '@services/recruitment/job_applicant.service';
import ContactDetailsService from '@services/employee/contact-details.service';
import EducationService from '@services/employee/education.service';
import EmergencyContactService from '@services/employee/emergency-contact.service';
import HistoryService from '@services/employee/history.service';
import PersonalDetailsService from '@services/employee/personal-details.service';
import SalaryDetailsService from '@services/employee/salary-details.service';
import WorkExperienceService from '@services/employee/work-experience.service';
import BranchService from '@services/employee/branch.service';
import JobOfferService from '@services/recruitment/job_offer.service';
import TestServices from '@services/recruitment/test.services';
import AssetService from './assets/assets.service';
import PurchaseOrderService from './assets/purchase-order.service';
import InvoiceService from '@services/invoice/invoice.service';
import PaymentService from '@services/payments/payment.service';

class CombineServices {
  public designationS = new DesignationService();
  public departmentS = new DepartmentService();
  public shiftS = new shiftTypeService();
  public employeeS = new EmployeeService()
  public projectS = new ProjectService()
  public clientS  = new ClientService()
  public jobApplicantS = new JobApplicantService()
  public contactDetailS = new ContactDetailsService()
  public educationService = new EducationService()
  public emergencyContactS = new EmergencyContactService()
  public historyS = new HistoryService()
  public personalDetailS = new PersonalDetailsService()
  public salaryDetailS = new SalaryDetailsService()
  public  workExperienceS = new WorkExperienceService()
  public brancheS = new BranchService()
  public acceptedJobOfferS = new JobOfferService()
  public passedTestApplicants = new TestServices()
  public Assets = new AssetService()
  public PurchaseOrder = new PurchaseOrderService()
  public Invoice = new InvoiceService()
  public Payments = new PaymentService()
//   public departmentS = new Department

  public async createEmployeeFormSelection(){
    const shifts = await this.shiftS.findAllshiftType()
    const employees = await this.employeeS.findAllEmployee()
    const designations = await this.designationS.findAllDesignations()
    const departments = await this.departmentS.findAllDepartments()
    const projects = await this.projectS.findAll();
    const jobApplicants = await this.jobApplicantS.findAllJobApplicants()
    const branches = await this.brancheS.findAllBranches();
    const acceptedJobOffers = await this.acceptedJobOfferS.findAllAcceptedJobOffers()
    const passedApplicants = await this.passedTestApplicants.findAllPassedTests()
    const allAssets = await this.Assets.findAllAsset()
    const allPurchaseOrders = await this.PurchaseOrder.findAllPurchaseOrders()
    const clientS = await this.clientS.findAll()


    return {
        shifts: shifts,
        designations: designations,
        departments,
        employees,
        projects,
        jobApplicants,
        branches,
        acceptedJobOffers,
        passedApplicants,
        allAssets,
        allPurchaseOrders,
       clientS
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
  public async employeeFullInfo(EmployeeId: string) {
    const employee = await this.employeeS.findEmployeeById(EmployeeId)
    const contactDetails = await this.contactDetailS.findContactDetailsById(EmployeeId)
    const education = await this.educationService.findEducationById(EmployeeId)
    const emergencyContact = await this.emergencyContactS.findEmergencyContactById(EmployeeId)
    const history = await this.historyS.findHistoryById(EmployeeId)
    const personalDetails = await this.personalDetailS.findPersonalDetailsById(EmployeeId)
    const salaryDetails = await this.salaryDetailS.findSalaryDetailsById(EmployeeId)
    const workExperience = await this.workExperienceS.findWorkExperienceById(EmployeeId)

    return{
      employee,
      contactDetails,
      education,
      emergencyContact,
      history,
      personalDetails,
      salaryDetails,
      workExperience
    }

  }

  public async accountDashboard(){
    const invoices = await this.Invoice.findAllInvoices()
    const payments = await this.Payments.findAllPayment()

    return {invoices, payments}
  }
}
 export default CombineServices
