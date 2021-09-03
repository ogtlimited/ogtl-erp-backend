/* eslint-disable prettier/prettier */
import { CreateDeductionDto } from '@dtos/payroll/deduction.dto';
import { HttpException } from '@exceptions/HttpException';
import deductionModel  from '@models/payroll/deduction.model';
import { isEmpty } from '@utils/util';
// import omit from 'lodash/omit'

class DeductionService {
  public deductionModel = deductionModel;

  public async findAll() {
    const results = await this.deductionModel.find();
    return results;
  }

  public async findById(id: string){
    if (isEmpty(id)) throw new HttpException(400, "provide Id");
    const deduction = await this.deductionModel.findOne({ _id: id });
    if (!deduction) throw new HttpException(404, "no record found");
    return deduction;
  }

  public async create(data: CreateDeductionDto){
    if (isEmpty(data)) throw new HttpException(400, "Bad request");
    const createdata = await this.deductionModel.create(data);
    return createdata;
  }

}

export default DeductionService;
