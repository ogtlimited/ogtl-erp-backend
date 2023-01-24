/* eslint-disable prettier/prettier */
import { generateOGID } from './../utils/util';
import  EmployeeService  from '@services/employee.service';
import config from 'config';
import jwt from 'jsonwebtoken';
import EmployeeModel from '@models/employee/employee.model';
import { CreateEmployeeDto, EmployeeLoginDto } from '@dtos/employee/employee.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import bcrypt from 'bcrypt';
import { Employee } from '@interfaces/employee-interface/employee.interface';

import { isEmpty } from '@utils/util';
import projectModel from "@models/project/project.model";
const csv = require('csv-parser');
const fs = require('fs');

class AuthService {
  private Employees = EmployeeModel;
  private empS = new EmployeeService()
  public async signup(EmployeeData: CreateEmployeeDto): Promise<Employee> {
    if (isEmpty(EmployeeData)) throw new HttpException(400, "You're not EmployeeData");

    const findEmployee: Employee = await this.Employees.findOne({ company_email: EmployeeData.company_email });

    if (findEmployee) throw new HttpException(409, `You're email ${EmployeeData.company_email} already exists`);

    const hashedPassword = await bcrypt.hash(EmployeeData.password, 10);

    const createEmployeeData: Employee = await this.Employees.create({ ...EmployeeData, password: hashedPassword });
    return createEmployeeData;
  }

  public async login(EmployeeData: EmployeeLoginDto): Promise<{ token: any; employee: Employee }> {
    // await this.updateProjects()
    console.log("done")
    if (isEmpty(EmployeeData)) throw new HttpException(400, "You're not EmployeeData");
    console.log('LOGIN ATTEMPT', EmployeeData);
    const employee: Employee =  await this.Employees.findOne({ company_email: EmployeeData.company_email }).populate('department designation default_shift projectId role');
    console.log('AUTH SERVICE', employee)
    
    if (!employee){
      const randomstring = Math.random().toString(36).slice(2);
    const hashedPassword = await bcrypt.hash(randomstring, 10);
      const newEmployee: any = {
        company_email: EmployeeData.company_email,
        date_of_joining: new Date(),
        employeeType: "FullTime",
        first_name: EmployeeData.first_name,
        last_name: EmployeeData.last_name,
        status: "active",
        default_shift: null,
        department: null,
        password: hashedPassword,
        designation: null,
        reports_to: null,
        gender: "Not Set",
        image: null,
        branch:null,
        projectId:null,
        ogId : generateOGID(),
        isAdmin: false,
        leaveCount: 0,
      };
      
      const createdEmployee = await this.empS.createEmployee(newEmployee)
      const tokenData = this.createToken(createdEmployee);
      return { token: tokenData, employee: createdEmployee };
    }else{

      console.log('AUTH SERVICE',employee)
      // const isPasswordMatching: boolean = await bcrypt.compare(EmployeeData.password, employee.password);
  
      // if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");
      if(employee.status === 'terminated') throw new HttpException(409, "Your employment has been terminated");
      const tokenData = this.createToken(employee);
      // const cookie = this.createCookie(tokenData);
      return { token: tokenData, employee };
    }
  }

  private async updateProjects(){
    const data = [
      {
        "campaign_name": "CS Live 1",
        "leave_cap": 3,
        "parent": "CS Live"
      },
      {
        "campaign_name": "Cs Live 2",
        "leave_cap": 3,
        "parent": "CS Live"
      },
      {
        "campaign_name": "Fin Ops",
        "leave_cap": 1,
        "parent": "Fin Ops"
      },
      {
        "campaign_name": "Cs Appeals",
        "leave_cap": 1,
        "parent": "Cs Appeals"
      },
      {
        "campaign_name": "CS Docs 1",
        "leave_cap": 1,
        "parent": "CS Docs"
      },
      {
        "campaign_name": "MR Follow-Up",
        "leave_cap": 4,
        "parent": "MR Follow-Up"
      },
      {
        "campaign_name": "CS Docs 2",
        "leave_cap": 1,
        "parent": "CS Docs"
      },
      {
        "campaign_name": "EMR",
        "leave_cap": 2,
        "parent": "EMR"
      },
      {
        "campaign_name": "MR Renaming",
        "leave_cap": 1,
        "parent": "MR Renaming"
      },
      {
        "campaign_name": "MR Pre-Audit",
        "leave_cap": 3,
        "parent": "MR Pre-Audit"
      },
      {
        "campaign_name": "MR Admin",
        "leave_cap": 1,
        "parent": "MR Admin"
      },
      {
        "campaign_name": "MR Invoice",
        "leave_cap": 1,
        "parent": "MR Invoice"
      },
      {
        "campaign_name": "Canvassing",
        "leave_cap": 1,
        "parent": "Canvassing"
      },
      {
        "campaign_name": "Health & Wellness",
        "leave_cap": 5,
        "parent": "Health & Wellness"
      },
      {
        "campaign_name": "Legal",
        "leave_cap": 3,
        "parent": "Legal"
      },
      {
        "campaign_name": "Intake",
        "leave_cap": 2,
        "parent": "Intake"
      },
      {
        "campaign_name": "My Self Health",
        "leave_cap": 1,
        "parent": "My Self Health"
      },
      {
        "campaign_name": "Legend 1",
        "leave_cap": 1,
        "parent": "Legend"
      },
      {
        "campaign_name": "Mailroom",
        "leave_cap": 1,
        "parent": "Mailroom"
      },
      {
        "campaign_name": "Lead Generation",
        "leave_cap": 1,
        "parent": "Lead Generation"
      },
      {
        "campaign_name": "Legend 2",
        "leave_cap": 1,
        "parent": "Legend"
      },
      {
        "campaign_name": "Sterling Bank",
        "leave_cap": 4,
        "parent": "Sterling Bank"
      },
      {
        "campaign_name": "Unilever",
        "leave_cap": 1,
        "parent": "Unilever"
      },
      {
        "campaign_name": "Parkway 1",
        "leave_cap": 1,
        "parent": "Parkway"
      },
      {
        "campaign_name": "Parkway 3",
        "leave_cap": 1,
        "parent": "Parkway"
      },
      {
        "campaign_name": "Paystack",
        "leave_cap": 3,
        "parent": "Parkway"
      },
      {
        "campaign_name": "Gomoney1",
        "leave_cap": 1,
        "parent": "Gomoney"
      },
      {
        "campaign_name": "Gomoney2",
        "leave_cap": 1,
        "parent": "Gomoney"
      },
      {
        "campaign_name": "Parkway 2",
        "leave_cap": 1,
        "parent": "Parkway"
      },
      {
        "campaign_name": "Sloane&CO",
        "leave_cap": 1,
        "parent": "Sloane&CO"
      },
      {
        "campaign_name": "Software Developers",
        "leave_cap": 2,
        "parent": "Software Developers"
      },
      {
        "campaign_name": "Raven&Macaw",
        "leave_cap": 1,
        "parent": "Raven&Macaw"
      },
      {
        "campaign_name": "CBN",
        "leave_cap": 1,
        "parent": "CBN"
      }
    ]
    for (const info of data){
      await projectModel.findOneAndUpdate({project_name: info.campaign_name}, {
        $set: {parent: info.parent, leave_cap: info.leave_cap}
      })
    }
  }

  public async logout(EmployeeData: EmployeeLoginDto): Promise<Employee> {
    if (isEmpty(EmployeeData)) throw new HttpException(400, "You're not EmployeeData");

    const findEmployee: Employee = await this.Employees.findOne({ email: EmployeeData.company_email });

    if (!findEmployee) throw new HttpException(409, `Ogid ${EmployeeData.company_email} not found`);

    return findEmployee;
  }
  public createToken(Employee: Employee): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: Employee._id };

    const secretKey: string = config.get('secretKey');
    const expiresIn: number = 60 * 60;
    return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

  public async importEmployees(){
    const results = []
    try {
      await fs.createReadStream('src/imports/csvs/new_employees.csv')
      .pipe(csv())
      .on('data', async function (data) {
        const employeesExists = await EmployeeModel.findOne({company_email: data.company_email}, {company_email:1})
        if (!employeesExists){
          data.status = 'active'
          delete data.reports_to
          delete data.department
          delete data.projectId
          delete data.isAdmin
          delete data.default_shift
          delete data.designation
          console.log(data.company_email);
          await EmployeeModel.create(data)
        }
        return results.push(data);
      })
      .on('end', function () {
        console.log(results);
        return "results";
      });
      return "inserting records"
    } catch (error) {
        console.log(error);
    }
  }
}

export default AuthService;
