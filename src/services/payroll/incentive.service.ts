/* eslint-disable prettier/prettier */
import { CreateIncentiveDto } from '@dtos/payroll/incentives.dto';
import { HttpException } from '@exceptions/HttpException';
import { IIncentiveCreatedResponse } from '@/interfaces/payroll/incentives.interface';
import incentiveModel  from '@models/payroll/incentives.model';
import { isEmpty } from '@utils/util';
import omit from 'lodash/omit'

class IncentiveTypeService {
  public incentiveTypes = incentiveModel;

  public async findAllIncentiveType(): Promise<IIncentiveCreatedResponse[]> {
    const incentiveTypes = await this.incentiveTypes.find();
    return incentiveTypes;
  }

  public async findIncentiveTypeById(incentiveId: string): Promise<IIncentiveCreatedResponse> {
    if (isEmpty(incentiveId)) throw new HttpException(400, "provide attendance Id");

    const findAttendanceType: IIncentiveCreatedResponse = await this.incentiveTypes.findOne({ _id: incentiveId });
    if (!findAttendanceType) throw new HttpException(404, "no record found");

    return findAttendanceType;
  }

  public async createIncentiveType(incentiveTypeData: CreateIncentiveDto): Promise<IIncentiveCreatedResponse> {

    if (isEmpty(incentiveTypeData)) throw new HttpException(400, "Bad request");
    const createIncentiveTypeData = await this.incentiveTypes.create(incentiveTypeData);
    const response: IIncentiveCreatedResponse =  omit(createIncentiveTypeData.toObject(), ["employeeId", "__v", "updatedAt"])
    response.ogId = "demo"
    return response;
  }

//   public async updateIncentiveType(incentiveTypeData: CreateIncentiveDto): Promise<IIncentiveCreatedResponse> {

//     if (isEmpty(incentiveTypeData)) throw new HttpException(400, "Bad request");
//     const createIncentiveTypeData = await this.incentiveTypes.create(incentiveTypeData);
//     const response: IIncentiveCreatedResponse =  omit(createIncentiveTypeData.toObject(), ["employeeId"])
//     return response;
//   }

}

export default IncentiveTypeService;
