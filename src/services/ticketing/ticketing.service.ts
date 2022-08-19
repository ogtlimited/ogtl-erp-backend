/* eslint-disable prettier/prettier */
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import EmployeeModel from '@models/employee/employee.model';
import ticketingModel from '@models/ticketing/ticketing.model';
import { ITicketing } from '@interfaces/ticketing/ticketing.interface';
import { CreateTicketingDto, UpdateTicketingDto } from '@dtos/ticketing/ticketing.dto';
import { sendEmail } from '@utils/sendEmail';
import { ticketingMessage,resolvedTicketingMessage } from '@utils/message';
import EmployeeService from '@services/employee.service';
import DepartmentService from '@services/employee/department.service';

class TicketingService {
  public ticketing = ticketingModel;
  public employeeModel = EmployeeModel
  public employeeService = new EmployeeService()
  public departmentService = new DepartmentService()

  //Method for finding all ticketing
  public async findAllTicketings(): Promise<ITicketing[]>{
    return this.ticketing.find().populate('employee_id department');
  }

  //Method for finding a single ticketing
  public async findTicketingById(ticketingId: string): Promise<ITicketing>{
    //check if no ticketing id is empty
    if(isEmpty(ticketingId)) throw new HttpException(400,`Ticketing not provided`);
    //find ticketing using the id provided
    const findTicketing:ITicketing = await this.ticketing.findOne({_id:ticketingId}).populate('employee_id department');
    //throw error if ticketing does not exist
    if(!findTicketing) throw new HttpException(409,`Ticketing with Id:${ticketingId}, does not exist`);
    //return ticketing
    return findTicketing;
  }

   //Method for finding all tickets for an employee
  public async findTicketingByEmployeeId(userId: string): Promise<ITicketing[]>{
    //check if no ticketing id is empty
    if(isEmpty(userId)) throw new HttpException(400,`Ticketing not provided`);
    //find ticketing using the id provided
    const findTicketing:ITicketing[] = await this.ticketing.find({employee_id:userId}).populate('employee_id department');
    //throw error if ticketing does not exist
    if(!findTicketing) throw new HttpException(409,`Ticketing with Employee Id:${userId}, does not exist`);
    //return ticketing
    return findTicketing;
  }

   //Method for finding all tickets for a department
  public async findTicketingByDepartmentId(departmentId: string): Promise<ITicketing[]>{
    //check if no ticketing id is empty
    if(isEmpty(departmentId)) throw new HttpException(400,`Ticketing not provided`);
    //find ticketing using the id provided
    const findTicketing:ITicketing[] = await this.ticketing.find({department:departmentId}).populate('employee_id department');
    //throw error if ticketing does not exist
    if(!findTicketing) throw new HttpException(409,`Ticketing with Department Id:${departmentId}, does not exist`);
    //return ticketing
    return findTicketing;
  }




  //Method for creating ticketing
  public async createTicketing(ticketingData: CreateTicketingDto): Promise<ITicketing>{
    //check if ticketing data is empty
    if (isEmpty(ticketingData)) throw new HttpException(400, "Bad request");
    const employee = await this.employeeService.findEmployeeById(ticketingData.employee_id)
    const department = await this.departmentService.findDepartmentById(ticketingData.department)
    let departmentEmail =""
    switch (department.department) {
      case "HR":
        departmentEmail ="hrteam@outsourceglobal.com"
        break;
      case "IT":
        departmentEmail ="it_helpdesk@outsourceglobal.com"
        break;
      case "Accounting":
        departmentEmail =""
        break
      default:
        departmentEmail ="hrteam@outsourceglobal.com"
        break;
    }
    // return created ticketing
    sendEmail(ticketingMessage.subject,ticketingMessage.message,[employee.company_email,departmentEmail])
    return await this.ticketing.create(ticketingData);
  }

  //Method for updating ticketing
  public async updateTicketing(ticketingId: string,ticketingData: UpdateTicketingDto):Promise<ITicketing>{
    //check if no ticketing data is empty

    if (isEmpty(ticketingData)) throw new HttpException(400, "Bad request");
    if(ticketingData._id){
      //find ticketing using the employee id provided
      const findTicketing: ITicketing = await this.ticketing.findOne({ _id: ticketingData._id });
      if(findTicketing && findTicketing._id != ticketingId) throw new HttpException(409, `${ticketingData.employee_id} already exists`);
    }
    const employee = await this.employeeService.findEmployeeById(ticketingData.employee_id)
    //find ticketing using the id provided and update it
    const updateTicketingById:ITicketing = await this.ticketing.findByIdAndUpdate(ticketingId,ticketingData,{new:true})
    if (!updateTicketingById) throw new HttpException(409, "ticketing could not be updated");
    if(ticketingData.status === "Resolved"){
      sendEmail(resolvedTicketingMessage.subject,resolvedTicketingMessage.message,[employee.company_email])
    }
    // return updated ticketing
    return updateTicketingById;
  }

  //Method for deleting ticketing
  public async deleteTicketing(ticketingId: string):Promise<ITicketing>{
    //find ticketing using the id provided and delete
    const deleteTicketingById: ITicketing = await this.ticketing.findByIdAndDelete(ticketingId);
    if(!deleteTicketingById) throw new HttpException(409, `Ticketing with Id:${ticketingId}, does not exist`);
    return deleteTicketingById;
  }


}

export default TicketingService;
