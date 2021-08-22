/* eslint-disable prettier/prettier */

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
import LeaveTypeRoutes from './routes/leave/leave-type.route';
import LeavePeriodRoute from './routes/leave/period.route';
import LeavePolicyRoutes from './routes/leave/policy.route';


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
  new LeaveTypeRoutes(),
  new LeavePeriodRoute(),
  new LeavePolicyRoutes()
]);

app.listen();
