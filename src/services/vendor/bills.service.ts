/* eslint-disable prettier/prettier */
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { PutAccountBalanceDto } from '@dtos/account/account.dto';
import AccountService from '../account/account.service';
import JournalService from '../journal/journal.service';
import billsModel from '@models/vendor/bills.model';
import { IBills } from '@interfaces/vendor-interface/bills-interface';
import { CreateBillsDto, UpdateBillsStatus } from '@dtos/vendor/bills.dto';
import moment from 'moment';

class BillService {
  public bills = billsModel;
  public Journal = new JournalService();
  public Account = new AccountService();

  /**
   *Returns all Bills
   */
  public async findAllBills(): Promise<IBills[]> {
    return this.bills.find().populate('vendor productItems');
  }

  /**
   *Returns the Bills with the Id given
   */
  public async findBillById(billId:string) : Promise<IBills>
  {
    //Check if Id is empty
    if (isEmpty(billId)) throw new HttpException(400, "No Id provided");

    //find Bills with Id given
    const findBill:IBills = await this.bills.findOne({ _id:billId  }).populate('vendor productItems');

    if(!findBill) throw new HttpException(409, "Bills with that Id doesnt exist");

    return findBill;
  }

  /**
   *Creates a new Bills
   */


  public async createBill(billData: CreateBillsDto) : Promise<IBills>{
    //Check if data is empty
    if (isEmpty(billData)) throw new HttpException(400, "No data provided");
    const date1 = moment(billData.bill_date).format("L");
    const date2 = moment(billData.due_date).format("L");
    if (date1 > date2) {
      throw new HttpException(409, "Bill date must not be after Due date");
    }
    const newRef = BillService.generateRefID()
    const findBill: IBills = await this.bills.findOne({ref:newRef});
    if(findBill) throw new HttpException(409, `Bill with this ${newRef} already exists`);
    const payable = await this.Account.findByName("account-payable")
    const account = await this.Account.find(billData.account);
  console.log("paaaaaaaaaayyyyyy",account)
    const updatePayable: PutAccountBalanceDto = {
      balance: payable.balance + billData.total_amount,
    }
    const accountUpdate: PutAccountBalanceDto = {
      balance: account.balance + billData.total_amount,
    }
    console.log("update poayaaaa",updatePayable)
    console.log(accountUpdate)
    await this.Account.updateBalance(payable._id, updatePayable)
    await  this.Account.updateBalance(account._id, accountUpdate)
    const jData = {
      account: payable._id,
      ref: newRef,
      debit: billData.total_amount,
      credit: 0,
      description: '',
      date: new Date().toISOString()

    }
    console.log(jData)
    await this.Journal.createJournal(jData)
    return await this.bills.create({...billData,ref:newRef});
  }

  /**
   *Updates existing Bills
   */

  public async updateBillPayment(BillId:string,billData)  : Promise<IBills>{

    //Check if data is empty
    if (isEmpty(billData)) throw new HttpException(400, "No data provided");
    const date1 = moment(billData.bill_date).format("L");
    const date2 = moment(billData.due_date).format("L");
    if (date1 > date2) {
      throw new HttpException(409, "Bill date must not be after Due date");
    }
    const Bill = await this.findBillById(BillId)
    const updateData = {
      paid: Bill.paid + billData.total_amount,
      balance: Bill.total_amount - billData.total_amount - Bill.paid
    }
    const updateBillById: IBills = await this.bills.findByIdAndUpdate(BillId,{
      $set: updateData
    },{new:true}).exec();
    if(!updateBillById) throw new HttpException(400, "Error updating bill");

    const payable = await this.Account.findByName("account-payable")
    const accountUpdate: PutAccountBalanceDto = {
      balance: payable.balance - billData.total_amount,

    }
    console.log(accountUpdate)
    await this.Account.updateBalance(payable._id, accountUpdate)
    const jData = {
      account: payable._id,
      ref: billData.ref,
      debit: 0,
      credit: billData.total_amount,
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

    const updateBillById: IBills = await this.bills.findByIdAndUpdate(BillId,billData, {new:true});
    if(!updateBillById) throw new HttpException(409, "Bills doesn't exist");
    return updateBillById;
  }

  public async updateBillStatus(BillId:string,billData:UpdateBillsStatus)  : Promise<IBills>{

    const findBill: IBills = await this.bills.findOne({_id:billData._id});
    if(findBill) throw new HttpException(409, `Bill with this ${billData._id} already exists`);

    const updateBillById: IBills = await this.bills.findByIdAndUpdate(BillId,{$set: {status:"Published"}}, { new: true });
    if(!updateBillById) throw new HttpException(409, "Bills status could not be updated");
    return updateBillById;
  }

  public async deleteBill(BillId:string) : Promise<IBills>{
    const deleteBillById :IBills = await this.bills.findByIdAndDelete(BillId);
    if(!deleteBillById) throw new HttpException(409, "Bills doesn't exist");
    return deleteBillById;
  }
  private static generateRefID(){
    return "REF"+ Math.floor(1000 + Math.random() * 9000)
  }
}

export default BillService;
