/* eslint-disable prettier/prettier */
import { DTO } from '@dtos';
import { HttpException } from '@exceptions/HttpException';
import { INTERFACE } from '@/interfaces';
import MODEL  from '@models';
import { isEmpty } from '@utils/util';


class SERVICE {
  public MODELINJECTION = MODEL;

  public async findAll(): Promise<INTERFACE[]> {
    const RESULTS = await this.MODELINJECTION.find();
    return RESULTS;
  }

  public async findById(id: string): Promise<INTERFACE> {
    if (isEmpty(id)) throw new HttpException(400, "provide Id");

    const findDemoType: INTERFACE = await this.MODELINJECTION.findOne({ _id: id });
    if (!findDemoType) throw new HttpException(404, "no record found");
    return findDemoType;
  }

  public async create(data: DTO): Promise<INTERFACE> {

    if (isEmpty(data)) throw new HttpException(400, "Bad request");
    const createdata = await this.MODELINJECTION.create(data);
    return createdata;
  }

}

export default SERVICE;
