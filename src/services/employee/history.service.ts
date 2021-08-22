import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { History } from '@/interfaces/employee-interface/history.interface';
import { CreateHistoryDto } from '@/dtos/employee/history.dto';
import HistoryModel from '@models/employee/history.model';

class HistoryService{
    public Historys = HistoryModel;
    //Returns all history details
    public async findAllHistory(): Promise<History[]>{
        const Historys: History[] = await this.Historys.find();
        return Historys
    }

   //find History by Id

   public async findHistoryById(HistoryId: string) : Promise<History>{
        if (isEmpty(HistoryId)) throw new HttpException(400, "No Id provided");
        //find History Details with Id given

        const findHistory: History = await this.Historys.findOne({_id:HistoryId});

        if(!findHistory) throw new HttpException(409, "Details with that Id dont exist");

        return findHistory

    }    


    //create new History details

    public async createHistory(HistoryData:CreateHistoryDto) : Promise<History>{
    
        if (isEmpty(HistoryData)) throw new HttpException(400, "No data provided");

        //check if employee already provided History details
        const findHistory: History = await this.Historys.findOne({id: HistoryData.employee_id});

        if(findHistory) throw new HttpException(409, `Employee ${HistoryData.employee_id} already provided details`);

        const createHistoryData = await this.Historys.create({HistoryData});

        return createHistoryData;
    }

    //Updates History Details

    public async updateHistory(HistoryId:string,HistoryData:CreateHistoryDto):Promise<History>{
        if (isEmpty(HistoryData)) throw new HttpException(400, "No data provided");

        if(HistoryData.employee_id){
            const findHistory: History = await this.Historys.findOne({Id:HistoryData.employee_id});
            if(findHistory && findHistory._id != HistoryId) throw new HttpException(409, `Employee ${HistoryData.employee_id} History details dont exist`);
        }

        const updateHistoryData: History = await this.Historys.findByIdAndUpdate(HistoryId,{HistoryData})
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