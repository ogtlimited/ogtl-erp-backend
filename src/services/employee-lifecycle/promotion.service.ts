/* eslint-disable prettier/prettier */
import { HttpException } from '@exceptions/HttpException';
import { CreatePromotionDto } from '@dtos/employee-lifecycle/promotion.dto';
import { IPromotion } from '@/interfaces/employee-lifecycle/promotion.interface';
import promotionModel  from '@models/employee-lifecycle/promotion.model';
import { isEmpty } from '@utils/util';


class PromotionService {
  public promotionModel = promotionModel;

  public async findAll(): Promise<IPromotion[]> {
    const promotions = await this.promotionModel.find();
    return promotions;
  }

  public async findById(id: string): Promise<IPromotion> {
    if (isEmpty(id)) throw new HttpException(400, "provide Id");
    const findDemoType: IPromotion = await this.promotionModel.findOne({ _id: id });
    if (!findDemoType) throw new HttpException(404, "no record found");
    return findDemoType;
  }

  public async create(data: CreatePromotionDto): Promise<IPromotion> {
    if (isEmpty(data)) throw new HttpException(400, "Bad request");
    const createdata = await this.promotionModel.create(data);
    return createdata;
  }

}

export default PromotionService;
