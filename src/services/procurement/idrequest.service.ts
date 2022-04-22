/* eslint-disable prettier/prettier */

import idRequestModel from '@/models/procurement/idrequest.model';
import { IIdRequest } from '@/interfaces/procurement/idrequest.interface';
import { HttpException } from '@exceptions/HttpException';

import { isEmpty } from '@utils/util';
import { CreateIdRequestDto, UpdateIdRequestDto } from '@/dtos/procurement/idrequest.dto';


class IdRequestService {
  public idRequest = idRequestModel;

  public async findAllIdRequest(): Promise<IIdRequest[]> {
    const idRequest: IIdRequest[] = await this.idRequest.find().populate({path:"employee_id",populate: {path: "designation"}});
    return idRequest;
  }

  public async findIdRequestById(IdRequestId: string): Promise<IIdRequest> {
    if (isEmpty(IdRequestId)) throw new HttpException(400, "You're not IdRequestId");

    const findIdRequest: IIdRequest = await this.idRequest.findOne({ _id: IdRequestId }).populate('employee_id');
    if (!findIdRequest) throw new HttpException(409, "Leave idRequest not found");

    return findIdRequest;
  }

  public async createIdRequest(IdRequestData: CreateIdRequestDto): Promise<IIdRequest> {
    if (isEmpty(IdRequestData)) throw new HttpException(400, "Bad request");

   
    const createIdRequestData: IIdRequest = await this.idRequest.create(IdRequestData);

    return createIdRequestData;
  }

  public async updateIdRequest(IdRequestId: string, IdRequestData: UpdateIdRequestDto): Promise<IIdRequest> {
    if (isEmpty(IdRequestData)) throw new HttpException(400, "Bad request");

    if (IdRequestData._id ) {
      const findIdRequest: IIdRequest = await this.idRequest.findOne({ _id : IdRequestData._id  });
      if (findIdRequest && findIdRequest._id != IdRequestId) throw new HttpException(409, `${IdRequestData._id } already exists`);
    }
    const updateIdRequestById: IIdRequest = await this.idRequest.findByIdAndUpdate(IdRequestId, { IdRequestData });
    if (!updateIdRequestById) throw new HttpException(409, "shift does not exist");

    return updateIdRequestById;
  }

  public async deleteIdRequest(IdRequestId: string): Promise<IIdRequest> {
    const deleteIdRequestById: IIdRequest = await this.idRequest.findByIdAndDelete(IdRequestId);
    if (!deleteIdRequestById) throw new HttpException(409, " Id Request does not exist");

    return deleteIdRequestById;
  }
}

export default IdRequestService;
