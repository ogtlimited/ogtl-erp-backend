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
import ShiftRequestRoute from '@routes/shift/shiftRequest';
import JobOpeningRoute from '@routes/recruitment/jobOpening.route';
import JobOfferRoute from '@routes/recruitment/jobOffer.route';
import JobApplicantRoute from '@routes/recruitment/jobApplicant.route';
import TestRoute from '@routes/recruitment/test.route';
import LeaveAllocationRoute from '@routes/leave/allocation.route';
import LeaveApplicationRoute from '@routes/leave/application.route';
import LeaveTypeRoutes from '@routes/leave/leave-type.route';
import LeavePeriodRoute from '@routes/leave/period.route';
import LeavePolicyRoutes from '@routes/leave/policy.route';

validateEnv();

const app = new App([new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new EmployeesRoute(),
  new ShiftTypeRoute(),
  new ShiftAssignmentRoute(),
  new ShiftRequestRoute(),
  new JobOpeningRoute(),
  new JobOfferRoute(),
  new JobApplicantRoute(),
  new TestRoute(),
  new LeaveAllocationRoute(),
  new LeaveApplicationRoute(),
  new LeaveTypeRoutes(),
  new LeavePeriodRoute(),
  new LeavePolicyRoutes()
]);

app.listen();
