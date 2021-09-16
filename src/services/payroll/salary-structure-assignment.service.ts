/* eslint-disable prettier/prettier */
import { CreateSalaryStructureAssignmentDto } from '@/dtos/payroll/salary-structure-assignment.dto';
import { HttpException } from '@exceptions/HttpException';
import { ISalaryStructureAssignment } from '@/interfaces/payroll/salary-structure-assignment.interface';
import salaryStructureAssignmentModel  from '@/models/payroll/salary-structure-assignment.model';
import { isEmpty } from '@utils/util';
import EmployeeModel from '@/models/employee/employee.model';
// import omit from 'lodash/omit'

class SalaryStructureAssignmentService {
  public salaryStructureAssignmentModel = salaryStructureAssignmentModel;

  public async findAll(query): Promise<ISalaryStructureAssignment[]> {
  
    const employee = await EmployeeModel.findOne({ogid: query.ogId},{_id:1})
    if(!employee)
    {
      throw new HttpException(404, "unable to find record")
    }
    const assignments = await this.salaryStructureAssignmentModel.find({employeeId: employee._id}).populate('salaryStructureId',{_id:1, title:1, netPay:1}).populate('employeeId',{_id:1, first_name:1, last_name:1});
    return assignments;
  }

  public async findById(id: string): Promise<ISalaryStructureAssignment> {
    if (isEmpty(id)) throw new HttpException(400, "provide Id");
    const salaryStructureAssignment: ISalaryStructureAssignment = await this.salaryStructureAssignmentModel.findOne({ _id: id });
    if (!salaryStructureAssignment) throw new HttpException(404, "no record found");
    return salaryStructureAssignment;
  }

  //remember to validate salary structure and employees for matching project and departments
  public async create(data: ISalaryStructureAssignment): Promise<any> {
  
   const employees = await EmployeeModel.find({_id: {$in: [...data.employeeIds]}}, {_id:1})
   const records = [];
   if(employees.length<data.employeeIds.length || employees.length < 1)
   {
     throw new HttpException(401, "unable to perform request")
   }
   for (let index = 0; index < employees.length; index++) {
     const employee = employees[index];
     const structureConstructor = {
      employeeId: employee._id,
      salaryStructureId: data.salaryStructureId,
      fromDate: data.fromDate
     }
     records.push(structureConstructor)
   }
   console.log(employees);
   await this.salaryStructureAssignmentModel.insertMany(records)
   await EmployeeModel.updateMany({_id: {$in: [...data.employeeIds]}},{$set: {salaryStructure_id: data.salaryStructureId}})
   return 'done'
   
  }

//   public async updateIncentiveType(data: DTO): Promise<ISalaryStructureAssignment> {

//     if (isEmpty(data)) throw new HttpException(400, "Bad request");
//     const createdata = await this.salaryStructureAssignmentModel.create(data);
//     const response: INTERFACE =  omit(createdata.toObject(), ["employeeId"])
//     return response;
//   }

}

export default SalaryStructureAssignmentService;
