/* eslint-disable prettier/prettier */
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { PutAccountBalanceDto } from '@dtos/account/account.dto';
import AccountService from '../account/account.service';
import JournalService from '../journal/journal.service';
import billsModel from '@models/vendor/bills.model';
import { IBills } from '@interfaces/vendor-interface/bills-interface';
import { CreateBillsDto } from '@dtos/vendor/bills.dto';

class BillService {
  public bills = billsModel;
  public Journal = new JournalService();
  public Account = new AccountService();

  /**
   *Returns all Bills
   */
  public async findAllBills(): Promise<IBills[]> {
    return this.bills.find();
  }

  /**
   *Returns the Bills with the Id given
   */
  public async findBillById(billId:string) : Promise<IBills>
  {
    //Check if Id is empty
    if (isEmpty(billId)) throw new HttpException(400, "No Id provided");

    //find Bills with Id given
    const findBill:IBills = await this.bills.findOne({ _id:billId  });

    if(!findBill) throw new HttpException(409, "Bills with that Id doesnt exist");

    return findBill;
  }

  /**
   *Creates a new Bills
   */


  public async createBill(billData: CreateBillsDto) : Promise<IBills>{

    //Check if data is empty
    if (isEmpty(billData)) throw new HttpException(400, "No data provided");

    const findBill: IBills = await this.bills.findOne({ref: billData.ref});
    if(findBill) throw new HttpException(409, `Bill with this ${billData.ref} already exists`);
    const payable = await this.Account.findByName("accounts-payable")
    const accountUpdate: PutAccountBalanceDto = {
      balance: payable.balance + billData.total_amount,
    }
    console.log(accountUpdate)
    await this.Account.updateBalance(payable._id, accountUpdate)
    const jData = {
      account: payable._id,
      ref: billData.ref,
      debit: billData.total_amount,
      credit: 0,
      description: '',
      date: new Date().toISOString()

    }
    console.log(jData)
    await this.Journal.createJournal(jData)
    return await this.bills.create(billData);
  }

  /**
   *Updates existing Bills
   */

  public async updateBillPayment(BillId:string,billData)  : Promise<IBills>{

    //Check if data is empty
    if (isEmpty(billData)) throw new HttpException(400, "No data provided");
    const Bill = await this.findBillById(BillId)
    const updateData = {
      paid: billData.paid,
      balance: Bill.total_amount - billData.paid
    }
    const updateBillById: IBills = await this.bills.findByIdAndUpdate(BillId,{
      $set: {updateData}
    });
    const payable = await this.Account.findByName("accounts-payable")
    const accountUpdate: PutAccountBalanceDto = {
      balance: payable.balance - billData.total_amount,

    }
    console.log(accountUpdate)
    await this.Account.updateBalance(payable._id, accountUpdate)
    const jData = {
      account: payable._id,
      ref: billData.ref,
      debit: billData.total_amount - billData.paid,
      credit: billData.paid,
      description: '',
      date: new Date().toISOString()

    }
    console.log(jData)
    await this.Journal.createJournal(jData)
    if(!updateBillById) throw new HttpException(409, "Bills doesn't exist");
    return updateBillById;
  }
  public async updateBill(BillId:string,billData)  : Promise<IBills>{

    //Check if data is empty
    if (isEmpty(billData)) throw new HttpException(400, "No data provided");

    const updateBillById: IBills = await this.bills.findByIdAndUpdate(BillId,{billData});
    if(!updateBillById) throw new HttpException(409, "Bills doesn't exist");
    return updateBillById;
  }

  public async deleteBill(BillId:string) : Promise<IBills>{
    const deleteBillById :IBills = await this.bills.findByIdAndDelete(BillId);
    if(!deleteBillById) throw new HttpException(409, "Bills doesn't exist");
    return deleteBillById;
  }

}

export default BillService;
