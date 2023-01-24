/* eslint-disable prettier/prettier */

import { Employee } from '@interfaces/employee-interface/employee.interface';
import EmployeeModel from '@models/employee/employee.model';

class EmployeeVerificationService {
  public Employees = EmployeeModel;
  public async findEmployeeByOgId(ogid): Promise<Employee[]> {
    const Employees: Employee[] = await this.Employees.findOne({ogid}).populate('default_shift designation department branch projectId reports_to role');
    return Employees;
  }
}

export default EmployeeVerificationService;
