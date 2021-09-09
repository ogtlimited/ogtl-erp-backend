/* eslint-disable prettier/prettier */
process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';


import compression from 'compression';
import { dirname } from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from 'config';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { connect, set } from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { dbConnection } from '@databases';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import * as cron from 'node-cron';
import attendanceModel  from '@models/attendance/attendance.model';
// import {getWorkTime, calculateLateness}  from '@/utils/attendanceCalculator';
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: dirname( module.paths[1] ) + "/.env" });
}

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: Routes[]) { 

    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
    // this.initializeCron();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }    
    connect(process.env.databaseUrl, dbConnection.options);
  }

  private initializeMiddlewares() {
    this.app.use(morgan(config.get('log.format'), { stream }));
    this.app.use(cors({ origin: config.get('cors.origin'), credentials: config.get('cors.credentials') }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
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
        'swagger/project/client.yaml'
              ],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  // private  initializeCron(){

  //   const task = cron.schedule('* * * * *', async function() {
  //     console.log('running a task every minute');
  //     const d = new Date();
  //     console.log('At 1 Minutes:', d);
  //     const num = 23;
  //     const data: any = {
  //     employeeId: "612cead8fc13ae35b5000353",
  //     shiftTypeId: "612ceef7fc13ae57e600012c",
  //     departmentId: "612ce924fc13ae5329000af8",
  //     clockInTime: new Date(2021, 7, Number(num), 10,),
  //     clockOutTime: new Date(2021, 7, Number(num), 18,),
  //     ogId: "850rho199",
  //   }
  
  //   const result: any = await getWorkTime(data.clockInTime, data.clockOutTime);
  //   data.hoursWorked = result.hoursWorked
  //   data.minutesWorked = result.minutesWorked    
  //   await attendanceModel.create(data);

  //   });

  //   task.start()
  //   // console.log('Before job instantiation');
  //   // const job = new CronJob('* 1 * * * *', async function() {
  //   //   const d = new Date();
  //   //   console.log('At 1 Minutes:', d);
  //   //   const num = 23;
  //   //   const data: any = {
  //   //   employeeId: "612cead8fc13ae35b5000353",
  //   //   shiftTypeId: "612ceef7fc13ae57e600012c",
  //   //   departmentId: "612ce924fc13ae5329000af8",
  //   //   clockInTime: new Date(2021, 7, Number(num), 10,),
  //   //   clockOutTime: new Date(2021, 7, Number(num), 18,),
  //   //   ogId: "850rho199",
  //   // }
  
  //   // const result: any = await getWorkTime(data.clockInTime, data.clockOutTime);
  //   // data.hoursWorked = result.hoursWorked
  //   // data.minutesWorked = result.minutesWorked    
  //   // await attendanceModel.create(data);
  //   // });
  //   // console.log('After job instantiation');
  //   // job.
  //   // console.log('is job running? ', job.running);
  // }
}

export default App;
