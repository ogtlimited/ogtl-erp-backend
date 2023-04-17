/* eslint-disable prettier/prettier */


process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';


import compression from 'compression';
import { dirname } from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload'
import config from 'config';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { connect, set } from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from './middlewares/error.middleware';
import { logger, stream } from './utils/logger';
import * as cron from 'node-cron';
const { io } = require("@/utils/socket");
const redis = require('redis');
const client = redis.createClient({
  host: "dev-redis-cluster-001.zv58bt.0001.euw2.cache.amazonaws.com",
  port: 6379,
  password: "",
  username: ""
});
import LeaveApplicationService from "@services/leave/application.service";
import HrLeaveApplicationService from "@services/leave/hr/hr_application.service";
import employeeModel from "@models/employee/employee.model";
import EmployeeBirthDayService from "./services/employee/employee_birthday.service";
import EmployeeService from "./services/employee.service";
const fs = require('fs')
import EmailService from '@/utils/email.service';
import { leadsLeaveNotificationMessage, birthdayMessage } from '@/utils/message';
import ExitService from './services/employee/exit.service';
import { dbConnection } from '@utils/postgreQL';
import { createConnection } from 'typeorm';
import AttendanceTypeService from './services/attendance/attendance.service';

const path = require('path')
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: dirname( module.paths[1] ) + "/.env" });
}




class App {
  public app: express.Application;
  public port: string | number;
  public env: string;
  constructor(routes: Routes[]) {
    console.log(__dirname, 'DIRECTORY')

    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';


    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
    this.redisConnection();
    this.initializeCron();
    this.connectToPostgresDatabase();

  }

  public socketInstance(server)
  {
    const serverInstance = server;
      io.attach(serverInstance, {
        cors: {
          origin: '*',
        }
      });

      io.on('connection', socket => {

          console.log('Socket: client connected')
          socket.on('notification', (data) => {
              client.lrange(data, 0, -1, function(err, reply) {
                  socket.emit("messages", reply)
              });
          })
          socket.on('clear_notification', (data) => {
            client.del(data, function(err, reply) {
                socket.emit("cleared_messages", reply)
            });
          })

          socket.on('disconnect', (data) => {
              console.log('Client disconnected')
          })

      })
  }

  public redisConnection()
  {
    client.on('connect', function() {
      console.log('Redis Connected!');
    });
    client.on("error", function (err) {
      console.log("Error " + err);
    });
    client.on("error", function (err) {
      console.log("Error " + err);
    });
  }
  public listen() {
    const server = this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
    return server
  }

  public getServer() {
    return this.app;
  }

  
  private async connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    // const ca = [fs.readFileSync(__dirname, '/rds.pem'))];
    try {
      connect(process.env.databaseUrl);
    } catch (error) {
      console.log(error)
    }
    set('autoIndex', false)
    await connect(process.env.databaseUrl);

  }

  private initializeMiddlewares() {
    this.app.use(morgan(config.get('log.format'), { stream }));
    const allowedOrigins = [
     'https://erp.outsourceglobal.com',
     'https://erp.outsourceglobal.com',
     'http://localhost:3001',
     'http://localhost:3002/',
     'https://8029-102-91-5-194.ngrok.io',
     'https://www.outsourceglobal.com',
     'https://outsourceglobal.com'
    ];
    const options: cors.CorsOptions = {
      origin: allowedOrigins
    };
    this.app.use(cors());
    // this.app.use(cors(options))
    // this.app.use(cors({ origin: config.get('cors.origin'), credentials: config.get('cors.credentials') }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json({limit: '50mb'}));
    this.app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    this.app.use(cookieParser());
    this.app.use(
      fileUpload()
    );
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      components: {
        securitySchemes: {
          jwt: {
            type: 'http',
            scheme: 'bearer',
            in: 'header',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          jwt: [],
        },
      ],
      apis: ['swagger.yaml',
        'swagger/employee.yaml',
        'swagger/shift/shiftType.yaml',
        'swagger/shift/shiftAssignment.yaml',
        'swagger/shift/shiftRequest.yaml',
        'swagger/recruitment/jobOpening.yaml',
        'swagger/recruitment/jobOffer.yaml',
        'swagger/recruitment/jobApplicant.yaml',
        'swagger/recruitment/test.yaml',
        'swagger/leave/allocation.yaml',
        'swagger/leave/application.yaml',
        'swagger/attendance/attendance.yaml',
        'swagger/payroll/incentives.yaml',
        'swagger/payroll/payroll-entry.yaml',
        'swagger/payroll/salary-component.yaml',
        'swagger/payroll/salary-slip.yaml',
        'swagger/payroll/salary-structure-assignment.yaml',
        'swagger/payroll/salary-structure.yaml',
        'swagger/employee-lifecycle/onboarding.yaml',
        'swagger/employee-lifecycle/promotion.yaml',
        'swagger/employee-lifecycle/transfer.yaml',
        'swagger/pip/warningLetter.yaml',
        'swagger/employee/branch.yaml',
        'swagger/employee/contact-details.yaml',
        'swagger/employee/designation.yaml',
        'swagger/employee/education.yaml',
        'swagger/employee/emergency-contact.yaml',
        'swagger/employee/employee-type.yaml',
        'swagger/employee/exit.yaml',
        'swagger/employee/grade.yaml',
        'swagger/employee/history.yaml',
        'swagger/employee/personal-details.yaml',
        'swagger/employee/salary-details.yaml',
        'swagger/employee/work-experience.yaml',
        'swagger/pip/score-cards.yaml',
        'swagger/loan/loan.yaml',
        'swagger/loan/loan-type.yaml',
        'swagger/loan/loan-application.yaml',
        'swagger/company/company.yaml',
        'swagger/project/project.yaml',
        'swagger/project/client.yaml',
        'swagger/maintenance-report/maintenanceReport.yaml',
        'swagger/maintenance-report/maintenanceAndRepairs.yaml'
              ],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private connectToPostgresDatabase() {
    createConnection(dbConnection).then(e => {
      console.log('COONECTED TO PostgresDB ');
    });
  }

  private  initializeCron(){

    const task = cron.schedule('* 1 * * 1-5', async function() {
      // const attendanceService = new AttendanceTypeService()
      // await attendanceService.generateAttendance()
    //   console.log('running task 1am every day');
    //   const day = "saturday"
    //   if (day == "saturday" || day == "sunday") {
    //     console.log("skipping today")
    //   }else{
    //     console.log("no loveeeeeeeeeeeeeeeee");
    //     const attendanceService = new AttendanceTypeService()
    //     await attendanceService.generateAttendance("project")
    //   }
    })
      const task2 = cron.schedule('* 1 * * 1-5', async function() {
      const applicationService = new LeaveApplicationService()
      await applicationService.addLeavesForEmployees()
    })

    const employeeStat = cron.schedule('0 0 1 * *', async function() {
      const employeeStat = new EmployeeService()
      await employeeStat.EmployeeRatio()
    })
    const LeaveCountUpdate = cron.schedule('0 0 1 * *', async function() {
      const leaveApp = new LeaveApplicationService()
      await leaveApp.updateAllLeaveCount()
    })

    const automatedEmployeesBirthdayMail = cron.schedule('0 8 * * *', async function() {
      const employeeBirthday = new EmployeeBirthDayService()
      const employeesDetails = await employeeBirthday.getTodaysCelebrantsDetails()
      if(employeesDetails.length !== 0){
        employeesDetails.map(employee=>{
          const {message, subject} = birthdayMessage(employee.first_name)
          const body = `<div><h1 style="color:#00c2fa">Outsource Global Technology Limited</h1><br></div>${message}`
           EmailService.sendMail(employee.email, "hr@outsourceglobal.com", subject, message, body)
          })
      }
    })
    const leadsLeaveApplicationActionReminderForNonEmergencyLeaves = cron.schedule('0 */24 * * *', async function() {
      const hrLeaveApplicationService = new HrLeaveApplicationService()
      const leaveApplication = await hrLeaveApplicationService.sendReminderForNonEmergencyLeaves()
      if (leaveApplication.length !== 0){
        leaveApplication.map(async (leave)=>{
          const leaveApplicant = await employeeModel.findOne({_id: leave.employee_id})
          const leaveApprover = await employeeModel.findOne({_id: leave.leave_approver})
          const leaveApproverFirstName = leaveApprover?.first_name.charAt(0) + leaveApprover?.first_name.toLowerCase().slice(1)
          const { message, subject } = leadsLeaveNotificationMessage(leaveApproverFirstName, leaveApplicant.first_name, leaveApplicant.ogid)
          const body = `<div><h1 style="color:#00c2fa">Outsource Global Technology Limited</h1><br></div>${message}`
          if (leave.leave_approver!==null){
              EmailService.sendMail(leaveApprover.company_email, "hr@outsourceglobal.com", subject, message, body)
            }
          })
      }
    })
    const leadsLeaveApplicationActionReminderForEmergencyLeaves = cron.schedule('0 */1 * * *', async function () {
      const hrLeaveApplicationService = new HrLeaveApplicationService()
      const leaveApplication = await hrLeaveApplicationService.sendReminderForEmergencyLeaves()
      if (leaveApplication.length !== 0) {
        leaveApplication.map(async (leave) => {
          const leaveApplicant = await employeeModel.findOne({ _id: leave.employee_id })
          const leaveApprover = await employeeModel.findOne({ _id: leave.leave_approver })
          const leaveApproverFirstName = leaveApprover?.first_name.charAt(0) + leaveApprover?.first_name.toLowerCase().slice(1)
          const { message, subject } = leadsLeaveNotificationMessage(leaveApproverFirstName, leaveApplicant.first_name, leaveApplicant.ogid)
          const body = `<div><h1 style="color:#00c2fa">Outsource Global Technology Limited</h1><br></div>${message}`
          if (leave.leave_approver !== null) {
             EmailService.sendMail(leaveApprover.company_email, "hr@outsourceglobal.com", subject, message, body)
          }
        })
      }
    })
    const deactivateResigneesERPAccountOnEffectiveDate = cron.schedule('0 */24 * * *', async function () {
    // const deactivateResigneesERPAccountOnEffectiveDate = cron.schedule('*/3 * * * *', async function () {
      const exitService = new ExitService()
      await exitService.deactivateResigneesERPAccount()
    })

    const getAttendanceFromPostgresDB = cron.schedule('0 */24 * * *', async function () {
    // const getAttendanceFromPostgresDB = cron.schedule('*/2 * * * *', async function () {
      const attendanceService = new AttendanceTypeService
      attendanceService.uploadMultipleAttendanceRecord()
    })
    getAttendanceFromPostgresDB.start()
    leadsLeaveApplicationActionReminderForEmergencyLeaves.start()
    leadsLeaveApplicationActionReminderForNonEmergencyLeaves.start()
    automatedEmployeesBirthdayMail.start
    employeeStat.start()
    LeaveCountUpdate.start()
    deactivateResigneesERPAccountOnEffectiveDate.start()

  }
}

export default App;
