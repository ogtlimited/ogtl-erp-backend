/* eslint-disable prettier/prettier */
import { CreatePayrollDto } from '@dtos/payroll/payroll-entry.dto';
import { HttpException } from '@exceptions/HttpException';
import { IPayRollEntry } from '@/interfaces/payroll/payroll-Entry.interface';
import payRollEntryModel  from '@models/payroll/payroll-Entry.model';
import { isEmpty } from '@utils/util';
// import omit from 'lodash/omit'

class PayRollEntryService {
  public payRollEntryModel = payRollEntryModel;

  public async findAll(): Promise<IPayRollEntry[]> {
    const results = await this.payRollEntryModel.find();
    return results;
  }

  public async findById(id: string): Promise<IPayRollEntry> {
    if (isEmpty(id)) throw new HttpException(400, "provide Id");

    const payRollEntry: IPayRollEntry = await this.payRollEntryModel.findOne({ _id: id });
    if (!payRollEntry) throw new HttpException(404, "no record found");

    return payRollEntry;
  }

  public async create(data: CreatePayrollDto): Promise<IPayRollEntry> {

    if (isEmpty(data)) throw new HttpException(400, "Bad request");
    const createdata = await this.payRollEntryModel.create(data);
    return createdata;
  }


}

export default PayRollEntryService;
