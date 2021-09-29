/* eslint-disable prettier/prettier */
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { History } from '@/interfaces/employee-interface/history.interface';
import { CreateHistoryDto,UpdateHistoryDto } from '@/dtos/employee/history.dto';
import HistoryModel from '@models/employee/history.model';

class HistoryService{
    public Historys = HistoryModel;
    //Returns all history details
  public async findAllHistory(): Promise<History[]>{
    return this.Historys.find().populate("employee_id branch_id designation_id");
  }

   //find History by Id

  public async findHistoryById(HistoryId: string) : Promise<History[]>{
    if (isEmpty(HistoryId)) throw new HttpException(400, "No Id provided");
    return this.Historys.find({ employee_id: HistoryId }).populate("employee_id branch_id designation_id");

  }


    //create new History details

  public async createHistory(HistoryData:CreateHistoryDto) : Promise<History>{

    if (isEmpty(HistoryData)) throw new HttpException(400, "No data provided");
    const newHistory = await this.Historys.create(HistoryData);
    const newData = await this.Historys.findOne({ employee_id: newHistory.employee_id }).populate("branch_id designation_id");
    return newData

  }

    //Updates History Details

    public async updateHistory(HistoryId:string,HistoryData:UpdateHistoryDto):Promise<History>{
        if (isEmpty(HistoryData)) throw new HttpException(400, "No data provided");

        if(HistoryData.employee_id){
            const findHistory: History = await this.Historys.findOne({Id:HistoryData.employee_id});
            if(findHistory && findHistory._id != HistoryId) throw new HttpException(409, `Employee ${HistoryData.employee_id} History details dont exist`);
        }

        const updateHistoryData: History = await this.Historys.findByIdAndUpdate(HistoryId,HistoryData,{new:true})
        if(!updateHistoryData) throw new HttpException(409, "details could not be updated");
        return updateHistoryData;
    }


    //deletes History Details

    public async deleteHistory(HistoryId:string): Promise<History>{
        const deleteHistoryById: History = await this.Historys.findByIdAndDelete(HistoryId);
        if(!deleteHistoryById) throw new HttpException(409, "Details don't exist");
        return deleteHistoryById;


    }






}
export default HistoryService;
