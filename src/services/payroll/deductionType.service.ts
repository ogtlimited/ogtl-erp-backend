/* eslint-disable prettier/prettier */
import { CreateDeductionTypeDto } from '@dtos/payroll/deductionType.dto';
import { HttpException } from '@exceptions/HttpException';
import deductionTypeModel  from '@models/payroll/deductionType.model';
import departmentModel  from '@models/department/department.model';
import { isEmpty } from '@utils/util';
// import omit from 'lodash/omit'

class DeductionTypeService {
  public deductionTypeModel = deductionTypeModel;

  public async findAll() {
    const results = await this.deductionTypeModel.find();
    return results;
  }

  public async findById(id: string){
    if (isEmpty(id)) throw new HttpException(400, "provide Id");
    const deductionType = await this.deductionTypeModel.findOne({ _id: id });
    if (!deductionType) throw new HttpException(404, "no record found");
    return deductionType;
  }

  public async create(data: CreateDeductionTypeDto){
    if (isEmpty(data)) throw new HttpException(400, "Bad request");
    const createdata = await this.deductionTypeModel.create(data);
    const createdDepartment = await departmentModel.create({title: "lmaoe"});
    return createdata;
  }

}

export default DeductionTypeService;
