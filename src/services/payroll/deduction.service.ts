/* eslint-disable prettier/prettier */
import { CreateDeductionDto } from '@dtos/payroll/deduction.dto';
import { HttpException } from '@exceptions/HttpException';
import deductionModel  from '@models/payroll/deduction.model';
import { isEmpty } from '@utils/util';
import moment from "moment";
// import omit from 'lodash/omit'

class DeductionService {
  private deductionModel = deductionModel;
  // private deductionModel =  deductionModel;
  private startOfDay = new Date(moment().startOf('day').format('YYYY-MM-DD')).toISOString();
  private endOfDay = new Date(moment().endOf('day').format('YYYY-MM-DD')).toISOString();

  private startOfMonth = new Date(moment().startOf('month').format('YYYY-MM-DD')).toISOString();
  private endOfMonth   = new Date(moment().endOf('month').format('YYYY-MM-DD')).toISOString();

  public async findAll() {
    const results = await this.deductionModel.find().populate('deductionTypeId employeeId');
    return results;
  }

  public async findById(id: string){
    if (isEmpty(id)) throw new HttpException(400, "provide Id");
    const deduction = await this.deductionModel.findOne({ _id: id });
    if (!deduction) throw new HttpException(404, "no record found");
    return deduction;
  }

  #refactor
  public async create(data: CreateDeductionDto){
    if (isEmpty(data)) throw new HttpException(400, "Bad request");
    const dailyDeductionExists: any = await this.dailyDeductionCheck(data.employeeId, data.deductionTypeId)
    if(dailyDeductionExists && dailyDeductionExists.length == 1){
      throw new HttpException(401, "daily deduction already exists for employee")
    }

    //daily rate check --> set usedDailyRate field for model
    const consectiveDeductions = await this.dailyConsecutiveDeductionCheck(data.employeeId, data.deductionTypeId)
    if(!consectiveDeductions || consectiveDeductions.count===0){
      const createdData = await this.deductionModel.create(data);
      return createdData;
    }
    // data.amount = 10000
    const createdData = await this.deductionModel.create(data);

    //update previous deductions


    return createdData;
  }

  private async dailyDeductionCheck(employeeId, deductionTypeId){
   const dailyDeductions = await this.deductionModel.exists({
      _id: deductionTypeId,
     employeeId,
     createdAt: {
        $gte: this.startOfDay,
        $lte: this.endOfDay
      }
   })
    return dailyDeductions
  }

  private async dailyConsecutiveDeductionCheck(employeeId, deductionTypeId){
    const dailyDeductions: any = await this.deductionModel.exists({
      _id: deductionTypeId,
      employeeId,
      createdAt: {
        $gte: this.startOfMonth,
        $lte: this.endOfMonth
      }
    })

    let days;
    if(dailyDeductions && dailyDeductions.length <= 1){
      return false
    }

    // eslint-disable-next-line prefer-const
    days  = dailyDeductions

    const sequceIsConsecutive = (obj) =>{
      return Boolean(obj.reduce((output, lastest) => (output ?
        (Number(output) + 1=== Number(lastest) ? lastest : false)
        : false)));
    }


      let count = 0
      const dayArr = []
      const dates = days && days.map(e => new Date(e).getDate())
      for(let i =0; i < dates && dates.length; i++){
        let temp = dates.slice(i, i+3)
        console.log(temp)
        if(temp.length === 3 && sequceIsConsecutive(temp)){
          count++
          dayArr.push(days.slice(i, i+3))
        }
      }
      return {
        count,
        dates: dayArr
      }
  }

}

export default DeductionService;
