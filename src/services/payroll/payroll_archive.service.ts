/* eslint-disable prettier/prettier */

import moment from "moment";
import payRollArchiveModel from "@models/payroll/payroll_archive.model";
import { officeQueryGenerator } from "@utils/payrollUtil";
import { CreatePayrollArchiveDto } from "@dtos/payroll/payroll_archive.dto";

class PayrollArchiveService {

  private startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
  private endOfMonth   = moment().endOf('month').format('YYYY-MM-DD');

  private payrollArchiveModel = payRollArchiveModel;

  public async findAll(query): Promise<any> {
    const officeQuery = officeQueryGenerator(query)
    const payrollArchives = await this.payrollArchiveModel.find(officeQuery).populate({
      path: 'employee', select: {
        first_name: 1,
        last_name: 1,
        ogid: 1,
        designation: 1,
        company_email: 1,
        middle_name: 1,
        date_of_joining: 1,
      },
      populate: {
        path: 'designation',
        model: 'Designation',
        select: {_id: 0, designation: 1}
      }
    }).populate({
      path: 'salarySlip'
    })
    return payrollArchives
  }

  public async findById(id: string): Promise<any> {
    const payrollArchive = await this.payrollArchiveModel.find({ id }).populate({
      path: 'employee', select: {
        first_name: 1,
        last_name: 1,
        ogid: 1,
        designation: 1,
        company_email: 1,
        middle_name: 1,
        date_of_joining: 1,
      },
      populate: {
        path: 'designation',
        model: 'Designation',
        select: {_id: 0, designation: 1}
      }
    }).populate({
      path: 'salarySlip'
    })
    return payrollArchive
  }

  public async createArchive(payload: CreatePayrollArchiveDto): Promise<any> {
    const payrollArchive = await this.payrollArchiveModel.create(payload)
    return payrollArchive
  }



}

export default PayrollArchiveService;


