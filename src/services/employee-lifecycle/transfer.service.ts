/* eslint-disable prettier/prettier */
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateTransferDto } from '@dtos/employee-lifecycle/transfer.dto';
import { ITransfer } from '@/interfaces/employee-lifecycle/transfer.interface';
import transferModel  from '@models/employee-lifecycle/transfer.model';


class TransferService {
  public transferModel = transferModel;

  public async findAll(): Promise<ITransfer[]> {
    const transfers = await this.transferModel.find();
    return transfers;
  }

  public async findById(id: string): Promise<ITransfer> {
    if (isEmpty(id)) throw new HttpException(400, "provide Id");
    const findDemoType: ITransfer = await this.transferModel.findOne({ _id: id });
    if (!findDemoType) throw new HttpException(404, "no record found");
    return findDemoType;
  }

  public async create(data: CreateTransferDto): Promise<ITransfer> {
    if (isEmpty(data)) throw new HttpException(400, "Bad request");
    const createdata = await this.transferModel.create(data);
    return createdata;
  }

}

export default TransferService;
