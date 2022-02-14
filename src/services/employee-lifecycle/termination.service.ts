/* eslint-disable prettier/prettier */
import { HttpException } from '@exceptions/HttpException';
import { CreateTerminationDto, UpdateTerminationDto } from '@dtos/employee-lifecycle/termination.dto';
import { ITermination } from '@/interfaces/employee-lifecycle/termination.interface';
import TerminationModel  from '@models/employee-lifecycle/termination.model';
import { isEmpty } from '@utils/util';
import EmployeeModel from '@models/employee/employee.model';
import { Employee } from '@interfaces/employee-interface/employee.interface';
import moment from "moment";


class TerminationService {
  public TerminationModel = TerminationModel;
  public employeeModel = EmployeeModel;

  public async findAllTerminations(): Promise<ITermination[]> {
    const Terminations = await this.TerminationModel.find().populate("employee");
    return Terminations;
  }

  public async findTerminationById(id: string): Promise<ITermination> {
    if (isEmpty(id)) throw new HttpException(400, "provide Id");
    const findTermination: ITermination = await this.TerminationModel.findOne({ _id: id }).populate("employee");
    if (!findTermination) throw new HttpException(404, "no record found");
    return findTermination;
  }

  public async findAllTerminationsByMonth(): Promise<ITermination[]> {
    const d = new Date()
    const month: number = d.getMonth() + 1
    const year = d.getFullYear() 
    const EmployeesTerminated: ITermination[] = await this.TerminationModel.find({
      date_of_joining: {
          $gte: moment(`${year}/${month}`, 'YYYY/MM').startOf('month').format('x'),
          $lte: moment(`${year}/${month}`, 'YYYY/MM').endOf('month').format('x')
      }
  }).populate('employee');
    return EmployeesTerminated;
  }

  public async createTermination(data: CreateTerminationDto): Promise<ITermination> {
    if (isEmpty(data)) throw new HttpException(400, "Bad request");
    //checks if employee exists
    const findEmployeeById: Employee = await this.employeeModel.findOne({ _id:data.employee }).populate("employee");
    if (!findEmployeeById) throw new HttpException(404, 'Employee does not exist!');
    const createdata = await this.TerminationModel.create(data);
    if(createdata){
        await this.employeeModel.findOneAndUpdate(
            {_id:data.employee },
            {$set : {status:'terminated'}},
            {new : true}
        );
    }
    return createdata;
  }

  public async updateTermination(TerminationId:string,TerminationData:UpdateTerminationDto) : Promise<ITermination>{
    //Check if data is empty
   if (isEmpty(TerminationData)) throw new HttpException(400, "No data provided");
   const updateTerminationById: ITermination = await this.TerminationModel.findByIdAndUpdate(TerminationId,{TerminationData});
   if(!updateTerminationById) throw new HttpException(409,"Termination does not exist");
   return updateTerminationById;
}

public async deleteTermination(TerminationId:string): Promise<ITermination>{
  //checks if 
  const deleteTerminationById: ITermination = await this.TerminationModel.findByIdAndDelete(TerminationId);
  if(!deleteTerminationById) throw new HttpException(409,"Termination does not exist");
   return deleteTerminationById;
}

}

export default TerminationService;
