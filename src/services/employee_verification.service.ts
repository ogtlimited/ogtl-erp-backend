/* eslint-disable prettier/prettier */

import { Employee } from '@interfaces/employee-interface/employee.interface';
import EmployeeModel from '@models/employee/employee.model';

class EmployeeVerificationService {
  public Employees = EmployeeModel;
  public async findEmployeeByOgId(ogid): Promise<any> {
    const employeeExists = await this.Employees.exists({ogid});
    return employeeExists;
  }
}

export default EmployeeVerificationService;
