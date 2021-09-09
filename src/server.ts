/* eslint-disable prettier/prettier */
import ShiftAssignmentRoute from '@routes/shift/shiftAssignment';

process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import EmployeesRoute from '@routes/employee/employee.route';
import ShiftTypeRoute from './routes/shift/shiftType';
import AttendanceRoute from './routes/attendance/attendance.route';
import IncentiveRoute from './routes/payroll/incentive.route';
import SalaryStructureRoute from './routes/payroll/salary-structure.route';
import SalaryStructureAssignmentRoute from './routes/payroll/salary-structure-assignment.route';
import SalaryComponentRoute from './routes/payroll/salary-component.route';
import PayRollEntryRoute from './routes/payroll/payroll-entry.route';
import SalarySlipRoute from './routes/payroll/salary-slip.route';
import OnBoardingRoute from './routes/employee-lifecycle/onboarding.route';
import PromotionRoute from './routes/employee-lifecycle/promotion.route';
import TransferRoute from './routes/employee-lifecycle/transfers.route';
import LeaveAllocationRoute from './routes/leave/allocation.route';
import LeaveApplicationRoute from './routes/leave/application.route';
// import LeaveTypeRoutes from './routes/leave/leave-type.route';
// import LeavePeriodRoute from './routes/leave/period.route';
// import LeavePolicyRoutes from './routes/leave/policy.route';
import BranchRoute from './routes/employee/branch.route';
import ContactDetailsRoute from './routes/employee/contact-details.route';
import DesignationRoute from './routes/employee/designation.route';
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
import JobOpeningRoute from '@routes/recruitment/jobOpening.route';
import JobOfferRoute from '@routes/recruitment/jobOffer.route';
import JobApplicantRoute from '@routes/recruitment/jobApplicant.route';
import TestRoute from '@routes/recruitment/test.route';
import WarningLetterRoute from '@routes/pip/warningLetter.route';
import LoanRoute from '@routes/loan/loan.route';
import LoanTypeRoute from '@routes/loan/loan-type.route';
import LoanApplicationRoute from '@routes/loan/loan-application.route';
import CoachingFormRoute from './routes/coaching/coachingForm.route';
import ClientRoute  from '@routes/project/client.route';
import AssetsRoute from '@routes/assets/assets.route';
import ProjectRoute from '@routes/project/project.route';



validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new EmployeesRoute(),
  new ShiftTypeRoute(),
  new AttendanceRoute(),
  new IncentiveRoute(),
  new SalaryStructureRoute(),
  new SalaryStructureAssignmentRoute(),
  new SalaryComponentRoute(),
  new PayRollEntryRoute(),
  new SalarySlipRoute(),
  new OnBoardingRoute(),
  new PromotionRoute(),
  new TransferRoute(),
  new LeaveAllocationRoute(),
  new LeaveApplicationRoute(),
  // new LeaveTypeRoutes(),
  // new LeavePeriodRoute(),
  // new LeavePolicyRoutes(),
  new BranchRoute(),
  new ContactDetailsRoute(),
  new DesignationRoute(),
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
  new TestRoute(),
  new ShiftAssignmentRoute(),
  new WarningLetterRoute(),
  new LoanRoute(),
  new LoanTypeRoute(),
  // new LoanApplicationRoute(),

  new ProjectRoute(),
  new ClientRoute(),
  new AssetsRoute(),

  new CoachingFormRoute()
]);

app.listen();
