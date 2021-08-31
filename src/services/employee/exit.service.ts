/* eslint-disable prettier/prettier */
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Exit } from '@/interfaces/employee-interface/exit.interface';
import { CreateExitDto,UpdateExitDto } from '@/dtos/employee/exit.dto';
import ExitModel from '@models/employee/exit.model';


class ExitService{

    public Exits = ExitModel;

    //Returns all Exit details
    public async findAllExit(): Promise<Exit[]>{
        const Exits: Exit[] = await this.Exits.find();
        return Exits
    }

     //find Exit by Id

     public async findExitById(ExitId: string) : Promise<Exit>{
        if (isEmpty(ExitId)) throw new HttpException(400, "No Id provided");
       //find Exit Details with Id given

       const findExit: Exit = await this.Exits.findOne({_id:ExitId});

       if(!findExit) throw new HttpException(409, "Details with that Id dont exist");

       return findExit

    }


    //create new Exit details

    public async createExit(ExitData:CreateExitDto) : Promise<Exit>{
    
        if (isEmpty(ExitData)) throw new HttpException(400, "No data provided");

        //check if employee already provided Exit details
        const findExit: Exit = await this.Exits.findOne({id: ExitData.employee_id});

        if(findExit) throw new HttpException(409, `Employee ${ExitData.employee_id} already provided details`);

        const createExitData = await this.Exits.create(ExitData);

        return createExitData;
    }

    //Updates Exit Details

    public async updateExit(ExitId:string,ExitData:UpdateExitDto):Promise<Exit>{
        if (isEmpty(ExitData)) throw new HttpException(400, "No data provided");

        if(ExitData.employee_id){
            const findExit: Exit = await this.Exits.findOne({Id:ExitData.employee_id});
            if(findExit && findExit._id != ExitId) throw new HttpException(409, `Employee ${ExitData.employee_id} Exit details dont exist`);
        }

        const updateExitData: Exit = await this.Exits.findByIdAndUpdate(ExitId,{ExitData})
        if(!updateExitData) throw new HttpException(409, "details could not be updated");
        return updateExitData;
    }

    
    //deletes Exit Details

    public async deleteExit(ExitId:string): Promise<Exit>{
        const deleteExitById: Exit = await this.Exits.findByIdAndDelete(ExitId);
        if(!deleteExitById) throw new HttpException(409, "Details don't exist");
        return deleteExitById; 
      

    }


}

export default ExitService;