/* eslint-disable prettier/prettier */
import { CreateOnBoardingDto } from '@dtos/employee-lifecycle/onboarding.dto';
import { HttpException } from '@exceptions/HttpException';
import { IOnBoarding } from '@/interfaces/employee-lifecycle/onboarding.interface';
import onBoardingModel  from '@models/employee-lifecycle/onboarding.model';
import { isEmpty } from '@utils/util';


class OnBoardingService {
  public onBoardingModel = onBoardingModel;

  public async findAll(): Promise<IOnBoarding[]> {
    const data = await this.onBoardingModel.find();
    return data;
  }

  public async findById(id: string): Promise<IOnBoarding> {
    if (isEmpty(id)) throw new HttpException(400, "provide Id");
    const onBoardingData: IOnBoarding = await this.onBoardingModel.findOne({ _id: id });
    if (!onBoardingData) throw new HttpException(404, "no record found");
    return onBoardingData;
  }

  public async create(data: CreateOnBoardingDto): Promise<IOnBoarding> {

    if (isEmpty(data)) throw new HttpException(400, "Bad request");
    const createdata = await this.onBoardingModel.create(data);
    // const response: IOnBoarding =  omit(createdata.toObject(), [])
    return createdata;
  }

}

export default OnBoardingService;
