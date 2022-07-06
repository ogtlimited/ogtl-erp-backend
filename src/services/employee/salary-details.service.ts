/* eslint-disable prettier/prettier */
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { SalaryDetail } from '@/interfaces/employee-interface/salary-details.interface';
import { CreateSalaryDetailsDto, UpdateSalaryDetailsDto } from '@/dtos/employee/salary-details.dto';
import SalaryDetailsModel from '@models/employee/salary-details.model';
import json from './temp.json';

class SalaryDetailsService {
  public SalaryDetails = SalaryDetailsModel;

  async logBank() {
    const b = await this.findAllSalaryDetails();
    const res: SalaryDetail[] = b.map(e => {
      const abbrev = json.filter(j => j.bank_abbrev.toLowerCase().includes(e.bank_name.split(' ')[0].toLowerCase()))[0];
      const code = abbrev?.bank_code < 100 ? abbrev?.bank_code.toString() : '0' + abbrev?.bank_code || 'not found';
      return {
        _id: e._id,
        employee_id: e.employee_id,
        bank_name: e.bank_name,
        salary_mode: e.salary_mode,
        bank_account_number: e.bank_account_number,
        bank_code: code,
      };
    });
    // console.log(res)

    for (let index = 0; index < res.length; index++) {
      const element = res[index];
      try {
        const ressult = await this.SalaryDetails.findByIdAndUpdate(element._id, element);
        console.log(ressult);
      } catch (error) {
        console.log(error);
      }
    }

    // fs.writeFile('output.json', jsonContent, 'utf8', function (err) {
    //   if (err) {
    //     console.log('An error occured while writing JSON Object to File.');
    //     return console.log(err);
    //   }

    //   console.log('JSON file has been saved.');
    // });
    // console.log(res);
  }
  /**
   *Returns all Salary Details
   */

  public async findAllSalaryDetails(): Promise<SalaryDetail[]> {
    return this.SalaryDetails.find();
  }

  /**
   *Returns the Salary details with the Id given
   */

  public async findSalaryDetailsById(SalaryDetailsId: string): Promise<SalaryDetail> {
    //Check if Id is empty
    if (isEmpty(SalaryDetailsId)) throw new HttpException(400, 'No Id provided');
    return this.SalaryDetails.findOne({ employee_id: SalaryDetailsId });
  }

  /**
   * Creates new Salary details
   */
  public async createSalaryDetails(SalaryDetailData: CreateSalaryDetailsDto): Promise<SalaryDetail> {
    if (isEmpty(SalaryDetailData)) throw new HttpException(400, 'No data provided');

    //check if employee already provided Salary details
    const findSalaryDetails: SalaryDetail = await this.SalaryDetails.findOne({ employee_id: SalaryDetailData.employee_id });

    if (findSalaryDetails) {
      const updateSalaryDetailsData: SalaryDetail = await this.SalaryDetails.findByIdAndUpdate(SalaryDetailData._id, SalaryDetailData, { new: true });
      if (!updateSalaryDetailsData) throw new HttpException(409, 'details could not be updated');
      return updateSalaryDetailsData;
    } else {
      return await this.SalaryDetails.create(SalaryDetailData);
    }
  }

  /**
   * Updates SalaryDetails
   */

  public async updateSalaryDetails(SalaryDetailsId: string, SalaryDetailData: UpdateSalaryDetailsDto): Promise<SalaryDetail> {
    if (isEmpty(SalaryDetailData)) throw new HttpException(400, 'No data provided');

    if (SalaryDetailData.employee_id) {
      const findSalaryDetails: SalaryDetail = await this.SalaryDetails.findOne({ employee_id: SalaryDetailData.employee_id });
      console.log(findSalaryDetails._id, SalaryDetailsId);
      if (findSalaryDetails._id !== SalaryDetailsId) {
        throw new HttpException(409, `Employee ${SalaryDetailData.employee_id} Salary details dont exist`);
      }
    }

    const updateSalaryDetailsData: SalaryDetail = await this.SalaryDetails.findByIdAndUpdate(SalaryDetailsId, { SalaryDetailData });
    if (!updateSalaryDetailsData) throw new HttpException(409, 'details could not be updated');
    return updateSalaryDetailsData;
  }

  public async deleteSalaryDetails(SalaryDetailsId: string): Promise<SalaryDetail> {
    const deleteSalaryDetailsById: SalaryDetail = await this.SalaryDetails.findByIdAndDelete(SalaryDetailsId);
    if (!deleteSalaryDetailsById) throw new HttpException(409, "Details don't exist");
    return deleteSalaryDetailsById;
  }
}
export default SalaryDetailsService;
