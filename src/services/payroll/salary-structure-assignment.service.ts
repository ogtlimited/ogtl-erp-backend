/* eslint-disable prettier/prettier */
import { CreateSalaryStructureAssignmentDto } from '@/dtos/payroll/salary-structure-assignment.dto';
import { HttpException } from '@exceptions/HttpException';
import { ISalaryStructureAssignment } from '@/interfaces/payroll/salary-structure-assignment.interface';
import salaryStructureAssignmentModel  from '@/models/payroll/salary-structure-assignment.model';
import { isEmpty } from '@utils/util';
// import omit from 'lodash/omit'

class SalaryStructureAssignmentService {
  public salaryStructureAssignmentModel = salaryStructureAssignmentModel;

  public async findAll(): Promise<ISalaryStructureAssignment[]> {
    const assignments = await this.salaryStructureAssignmentModel.find();
    return assignments;
  }

  public async findById(id: string): Promise<ISalaryStructureAssignment> {
    if (isEmpty(id)) throw new HttpException(400, "provide Id");

    const salaryStructureAssignment: ISalaryStructureAssignment = await this.salaryStructureAssignmentModel.findOne({ _id: id });
    if (!salaryStructureAssignment) throw new HttpException(404, "no record found");
    return salaryStructureAssignment;
  }

  public async create(data: CreateSalaryStructureAssignmentDto): Promise<ISalaryStructureAssignment> {

    if (isEmpty(data)) throw new HttpException(400, "Bad request");
    const createdata = await this.salaryStructureAssignmentModel.create(data);
    return createdata;
  }

//   public async updateIncentiveType(data: DTO): Promise<ISalaryStructureAssignment> {

//     if (isEmpty(data)) throw new HttpException(400, "Bad request");
//     const createdata = await this.salaryStructureAssignmentModel.create(data);
//     const response: INTERFACE =  omit(createdata.toObject(), ["employeeId"])
//     return response;
//   }

}

export default SalaryStructureAssignmentService;
