/* eslint-disable prettier/prettier */
import { CreatePayrollDto } from '@/dtos/payroll/payroll.dto';
import { HttpException } from '@exceptions/HttpException';
import { IPayRoll } from '@/interfaces/payroll/payroll.interface';
import payRollModel  from '@/models/payroll/payroll.model';
import { isEmpty } from '@utils/util';
import { officeQueryGenerator } from '@/utils/payrollUtil';
import salarySlipModel from '@/models/payroll/salary-slip.model';
import payRollArchiveModel from "@models/payroll/payroll_archive.model";
// import omit from 'lodash/omit'

class PayRollService {
  public payRollModel = payRollModel;
  public payrollArchive = payRollArchiveModel;

  public async findAll(): Promise<IPayRoll[]> {
    const results = await this.payRollModel.find();
    return results;
  }

  public async findById(id: string): Promise<IPayRoll> {
    if (isEmpty(id)) throw new HttpException(400, "provide Id");

    const payRoll: IPayRoll = await this.payRollModel.findOne({ _id: id });
    if (!payRoll) throw new HttpException(404, "no record found");

    return payRoll;
  }

  //refactor
  public async create(data: CreatePayrollDto, query): Promise<any> {
    const slipConstructor: any = {}
    const officeKey = Object.keys(query)[0]
    const officeQuery = officeQueryGenerator(query)
    const salarySlips = await salarySlipModel.find(officeQuery,{_id:1, netPay:1})
    if(salarySlips.length < 1)
    {
      throw new HttpException(400, "No salary slips found. Please generate salary slips first.")
    }
    if(officeKey == 'projectId')
    {
      slipConstructor.projectId = officeQuery[officeKey]
    }
    if(officeKey == 'departmentId')
    {
      slipConstructor.departmentId = officeQuery[officeKey]
    }
    slipConstructor.amount = 0
    slipConstructor.salarySlips = salarySlips.map((slip) => {
      slipConstructor.amount += slip.netPay
      return slip._id
    })
    await this.payRollModel.create(slipConstructor)
    return 'done';
  }

  public async uploadPayment(payload): Promise<any> {

    if(payload.length < 1){
      throw new HttpException(400, "provide list of salary slips")
    }

    const archives = []

    for(let i = 0; i < payload.length; i++){
      const salarySlip = payload[i]

      //BANK 3D Upload service
      archives.push({
        employee: salarySlip.employeeId,
        salarySlip: salarySlip._id,
        paid: salarySlip.paid
      })
    }

    console.log(archives, "------------>");

    return await payRollArchiveModel.insertMany(archives)

  }


}

export default PayRollService;

