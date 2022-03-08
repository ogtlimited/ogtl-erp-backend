import { CreateUpdateSalaryDto } from '@dtos/payroll/salary-setting.dto';
import { HttpException } from '@exceptions/HttpException';
import salarySettingModel from '@models/payroll/salary-setting';
import { isEmpty } from '@utils/util';
import { ISalarySetting } from '@interfaces/payroll/salary-setting.interface';

class SalarySettingService {
  public salarySettingModel = salarySettingModel;

  public async findAllSalarySettings(): Promise<ISalarySetting[]> {
    return this.salarySettingModel.find();
  }

  public async createUpdateSalarySettings(SalarySettingData: CreateUpdateSalaryDto): Promise<any> {
    if (isEmpty(SalarySettingData)) throw new HttpException(400, 'No data provided');
    const findSalarySettings: ISalarySetting = await this.salarySettingModel.findOne({ _id: SalarySettingData._id });
    if (findSalarySettings) {
      const updateSalarySettings: ISalarySetting = await this.salarySettingModel.findByIdAndUpdate(SalarySettingData._id, SalarySettingData, {
        new: true,
      });
      if (!updateSalarySettings) throw new HttpException(409, 'Salary settings could not be updated');
      return updateSalarySettings;
    } else {
      return await this.salarySettingModel.create(SalarySettingData);
    }
  }
}

export default SalarySettingService;
