/* eslint-disable prettier/prettier */


import SalarySettingRoute from '@routes/payroll/salary-settings.route';

process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from './app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import EmployeesRoute from '@routes/employee/employee.route';
import LeadsSubordinatesRoute from '@routes/employee/leads_subordinates.route';
import OfficeRoute from '@routes/employee/office.route';
import EmployeeVerificationRoute from '@routes/employee/employee_verification.route';
import DepartmentEmployeesRoute from '@routes/dashboard/hr/department_employees_count.route';
import EmployeesGenderDesignation from '@/routes/dashboard/hr/employees_gender_designation.route';
import DepartmentGenderCountRoute from '@routes/dashboard/hr/department_employees_gender_count.route';
import ShiftTypeRoute from './routes/shift/shiftType';
import EmployeeShiftRoute from './routes/shift/employee_shift.route';
import AttendanceRoute from './routes/attendance/attendance.route';
import TimeAndAttendanceEnrolledStaffRoute from './routes/attendance/biometrics.route';
import IncentiveRoute from './routes/payroll/incentive.route';
import SalaryStructureRoute from './routes/payroll/salary-structure.route';
import SalaryStructureAssignmentRoute from './routes/payroll/salary-structure-assignment.route';
import SalaryComponentRoute from './routes/payroll/salary-component.route';
import PayRollRoute from './routes/payroll/payroll.route';
import SalarySlipRoute from './routes/payroll/salary-slip.route';
import OnBoardingRoute from './routes/employee-lifecycle/onboarding.route';
import PromotionRoute from './routes/employee-lifecycle/promotion.route';
import TransferRoute from './routes/employee-lifecycle/transfers.route';
import LeaveAllocationRoute from './routes/leave/allocation.route';
import LeaveApplicationRoute from './routes/leave/application.route';
import LeadsLeaveApplicationsRoute from './routes/leave/leads/leads_leave_applications.route';
import LeaveApprovalLevelRoute from './routes/leave/leave_approval_levels.route';
import HrLeaveApplicationsRoute from './routes/leave/hr_leave_applications.route';
import LeadsLeaveRejectionRoute from './routes/leave/leads/leads_leave_rejection.route';
import LeadsLeaveApprovalRoute from './routes/leave/leads/leads_leave_approval.route';
// import LeaveTypeRoutes from './routes/leave/leave-type.route';
// import LeavePeriodRoute from './routes/leave/period.route';
// import LeavePolicyRoutes from './routes/leave/policy.route';
import BranchRoute from './routes/employee/branch.route';
import ContactDetailsRoute from './routes/employee/contact-details.route';
import DesignationRoute from './routes/employee/designation.route';
import DesignationByDepartmentRoute from './routes/employee/designation_by_departmentId.route';
import EducationRoute from './routes/employee/education.route';
import EmergencyContactRoute from './routes/employee/emergency-contact.route';
import EmployeeTypeRoute from './routes/employee/employee-type.route';
import ExitRoute from './routes/employee/exit.route';
import GradeRoute from './routes/employee/grade.route';
import HistoryRoute from './routes/employee/history.route';
import PersonalDetailsRoute from './routes/employee/personal-details.route';
import SalaryDetailsRoute from './routes/employee/salary-details.route';
import WorkExperienceRoute from './routes/employee/work-experience.route';
import ShiftRequestRoute from '@routes/shift/shiftRequest';
import ShiftAssignmentRoute from '@routes/shift/shiftAssignment';
import JobOpeningRoute from '@routes/recruitment/jobOpening.route';
import JobOfferRoute from '@routes/recruitment/jobOffer.route';
import JobApplicantRoute from '@routes/recruitment/jobApplicant.route';
import JobApplicantForRepSieversRoute from '@routes/recruitment/job_sievers.route';
import RecruitmentResultRoute from '@/routes/recruitment/recruitment_result.route';
import WarningLetterRoute from '@routes/pip/warningLetter.route';
import LoanRoute from '@routes/loan/loan.route';
import TrainingAttendanceRoute from '@routes/training/training-attendance.route';
import TrainingProgramRoute from '@routes/training/training-program.route';
import TrainingEventRoute from '@routes/training/training-event.route';
import TrainingResultRoute from '@routes/training/training-result.route';
import LoanTypeRoute from '@routes/loan/loan-type.route';
import LoanApplicationRoute from '@routes/loan/loan-application.route';
import CoachingFormRoute from './routes/coaching/coachingForm.route';
import ClientRoute  from '@routes/project/client.route';
import ClientAccountRoute from './routes/project/client_account.route';
import ClientProjectsRoute from './routes/project/client_projects.route';
import ClientAccountActivationRoute from './routes/project/client_account_activation.route';
import ClientAccountDeactivationRoute from './routes/project/client_account_deactivation.route';
import ResetDefaultClientAccountPasswordRoute from './routes/project/client_account_reset_default_password.route';
import AssetAssignmentRoute from '@/routes/assets/asset-assignment.route';
import ProjectRoute from '@routes/project/project.route';
import CampaignScheduleRoute from './routes/project/campaign_schedule.route';
import CampaignScheduleItemRoute from './routes/project/campaign_schedule_item.route';
import documentRoute from '@routes/project/document.route';
import JobDocumentRoute from '@routes/recruitment/document.route';

import RoleRoute from '@routes/role/role.route';
//import DepartmentRoute from './routes/employee/department.route';
import scoreCardRoute from './routes/pip/score-cards.route';
import TerminationRoute from './routes/employee-lifecycle/termination.route';

import DepartmentRoute from './routes/employee/department.route';
import NotificationRoute from '@routes/notification/notification.route';
import EmailRoute from '@routes/notification/email.route';
const socketio = require('socket.io');

import LeaveSettingsRoute from './routes/leave/leave-settings.route';
import LeaveTypeRoute from './routes/leave/leave_type.route';
import PurchaseOrderRoute from './routes/assets/purchase-order.route';
import AssetRoute from './routes/assets/assets.route';
import MaintenanceReportRoute from '@routes/maintenance-report/maintenance_report.route';
import MaintenanceAndRepairsRoute from '@routes/maintenance-report/maintenance_repair.route';

import AcademyRoute from './routes/academy/academy.route';
import BatchRoute from './routes/payroll/batch.route';
import AccountRoute from '@routes/account/account.route';
import AccountTypeRoute from '@routes/account/account-type.route';
import BudgetRoute from '@routes/budget/budget.route'
import ProductServiceRoute from './routes/product/products.route';
import JournalRoute from './routes/journals/journals.route';
import InvoiceRoute from './routes/invoice/invoice.routes';
import VendorRoute from '@routes/vendor/vendor.route';
import BillsRoute from '@routes/vendor/bills.route';
import PublicHolidayRoute from './routes/public-holiday/public-holiday.route';


import ProcurementRoute from '@/routes/procurement/procurement.route'
import PaymentRoute from './routes/payments/payment.route';
import ExpenseHeadDraftRoute from "@routes/expense-head/expense-head.route";
import EmployeesSalaryRoute from "@routes/payroll/employees-salary.route";
import OrientationRoute from "@routes/recruitment/orientation_and_training.route";
import IdRequestRoute from "@routes/procurement/idrequest.route";
import DeductionTypeRoute from "@routes/payroll/deductionType.route";
import DeductionRoute from "@routes/payroll/deduction.route";
import NotesRoute from "@routes/payroll/notes.route";
import PayRollArchiveRoute from "@routes/payroll/payroll_archive.route";
import TicketingRoute from '@routes/ticketing/ticketing.route';


validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new EmployeesRoute(),
  new LeadsSubordinatesRoute(),
  new OfficeRoute(),
  new EmployeeVerificationRoute(),
  new DepartmentGenderCountRoute(),
  new DepartmentEmployeesRoute(),
  new EmployeesGenderDesignation(),
  new ShiftTypeRoute(),
  new EmployeeShiftRoute(),
  new AttendanceRoute(),
  new TimeAndAttendanceEnrolledStaffRoute(),
  new IncentiveRoute(),
  new SalaryStructureRoute(),
  new SalaryStructureAssignmentRoute(),
  new SalaryComponentRoute(),
  new PayRollRoute(),
  new SalarySlipRoute(),
  new OnBoardingRoute(),
  new PromotionRoute(),
  new TransferRoute(),
  new LeaveAllocationRoute(),
  new LeaveApplicationRoute(),
  new LeadsLeaveApplicationsRoute(),
  new LeaveApprovalLevelRoute(),
  new HrLeaveApplicationsRoute(),
  new LeadsLeaveRejectionRoute(),
  new LeadsLeaveApprovalRoute(),
  new LeaveSettingsRoute(),
  new LeaveTypeRoute(),
  new BranchRoute(),
  new ContactDetailsRoute(),
  new DesignationRoute(),
  new DesignationByDepartmentRoute(),
  new EducationRoute(),
  new EmployeeTypeRoute(),
  new EmergencyContactRoute(),
  new ExitRoute(),
  new GradeRoute(),
  new HistoryRoute(),
  new PersonalDetailsRoute(),
  new SalaryDetailsRoute(),
  new WorkExperienceRoute(),
  new ShiftRequestRoute(),
  new JobOpeningRoute(),
  new JobOfferRoute(),
  new JobApplicantRoute(),
  new JobApplicantForRepSieversRoute(),
  new RecruitmentResultRoute(),
  new ShiftAssignmentRoute(),
  new WarningLetterRoute(),
  new LoanRoute(),
  new LoanTypeRoute(),
  new LoanApplicationRoute(),

  new ProjectRoute(),
  new CampaignScheduleRoute(),
  new CampaignScheduleItemRoute(),
  new ClientRoute(),
  new ClientAccountRoute(),
  new ClientProjectsRoute(),
  new ClientAccountActivationRoute(),
  new ClientAccountDeactivationRoute(),
  new ResetDefaultClientAccountPasswordRoute(),
  new AssetAssignmentRoute(),
  new CoachingFormRoute(),
  new scoreCardRoute(),
  new PromotionRoute(),
  new TerminationRoute(),
  new DepartmentRoute(),
  new scoreCardRoute(),

  new TrainingAttendanceRoute(),
  new TrainingEventRoute(),
  new TrainingProgramRoute(),
  new TrainingResultRoute(),

  new RoleRoute(),
  new PurchaseOrderRoute(),
  new AssetRoute(),
  new MaintenanceReportRoute(),
  new MaintenanceAndRepairsRoute(),
  new NotificationRoute(),
  new EmailRoute(),

  new AccountRoute(),
  new AccountTypeRoute(),
  new BudgetRoute(),
  new ProcurementRoute(),

  new ProductServiceRoute(),
  new JournalRoute(),
  new InvoiceRoute(),
  new PublicHolidayRoute(),

  new VendorRoute(),
  new BillsRoute(),
  new PaymentRoute(),
  new ExpenseHeadDraftRoute(),
  new documentRoute(),
  new JobDocumentRoute(),
  new EmployeesSalaryRoute(),

  new SalarySettingRoute(),
  new OrientationRoute(),
  new IdRequestRoute(),
  new DeductionTypeRoute(),
  new DeductionRoute(),
  new NotesRoute(),
  new PayRollArchiveRoute(),

  new TicketingRoute(),
  new AcademyRoute(),
  new BatchRoute()
]);

const server = app.listen();
app.socketInstance(server)
export default server


