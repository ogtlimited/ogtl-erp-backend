/* eslint-disable prettier/prettier */
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Exit } from '@/interfaces/employee-interface/exit.interface';
import { CreateExitDto,UpdateExitDto } from '@/dtos/employee/exit.dto';
import ExitModel from '@models/employee/exit.model';
import EmployeeModel from '@models/employee/employee.model';
import { Employee } from '@interfaces/employee-interface/employee.interface';
import moment from 'moment';
const exitList = [
    {
      "employee_id": "goodness.peace@outsourceglobal.net",
      "resignation_letter_date": "11/10/2021",
      "relieving_date": "11/30/2021",
      "reason_for_resignation": "Relocating"
    },
    {
      "employee_id": "mamza.jarafu@outsourceglobal.net",
      "resignation_letter_date": "10/27/2021",
      "relieving_date": "11/19/2021",
      "reason_for_resignation": "Relocating"
    },
    {
      "employee_id": "dorcas.ojo@outsourceglobal.net",
      "resignation_letter_date": "11/15/2021",
      "relieving_date": "12/3/2021",
      "reason_for_resignation": "Personal"
    },
    {
      "employee_id": "aminatu.bashiru@outsourceglobal.net",
      "resignation_letter_date": "11/16/2021",
      "relieving_date": "12/3/2021",
      "reason_for_resignation": "Continuing education"
    },
    {
      "employee_id": "azibaodiniyar.tobins@outsourceglobal.net",
      "resignation_letter_date": "11/17/2021",
      "relieving_date": "12/1/2021",
      "reason_for_resignation": "Family emergency"
    },
    {
      "employee_id": "emmanuel.effiong@outsourceglobal.net",
      "resignation_letter_date": "11/15/2021",
      "relieving_date": "12/3/2021",
      "reason_for_resignation": "Relocating"
    },
    {
      "employee_id": "sandra.nwadiuto@outsourceglobal.net",
      "resignation_letter_date": "11/23/2021",
      "relieving_date": "12/10/2021",
      "reason_for_resignation": "Salary too low"
    },
    {
      "employee_id": "deborah.oguama@outsourceglobal.net",
      "resignation_letter_date": "11/19/2021",
      "relieving_date": "12/10/2021",
      "reason_for_resignation": "Work hours unmanageable, Continuing education"
    },
    {
      "employee_id": "winnie.stephens@outsourceglobal.net",
      "resignation_letter_date": "11/24/2021",
      "relieving_date": "12/14/2021",
      "reason_for_resignation": "Work hours unmanageable"
    },
    {
      "employee_id": "muhammed.suraj@outsourceglobal.net",
      "resignation_letter_date": "11/29/2021",
      "relieving_date": "12/16/2021",
      "reason_for_resignation": "Family emergency"
    },
    {
      "employee_id": "juliet.onah@outsourceglobal.net",
      "resignation_letter_date": "12/1/2021",
      "relieving_date": "12/21/2021",
      "reason_for_resignation": "Continuing education"
    },
    {
      "employee_id": "tochukwu.okafor@outsourceglobal.net",
      "resignation_letter_date": "12/2/2021",
      "relieving_date": "12/22/2021",
      "reason_for_resignation": "Continuing education"
    },
    {
      "employee_id": "hadiza.obaje@outsourceglobal.net",
      "resignation_letter_date": "12/7/2021",
      "relieving_date": "12/31/2021",
      "reason_for_resignation": "Work hours unmanageable, Moving to a new location, Continuing education"
    },
    {
      "employee_id": "dutse.saratu@outsourceglobal.net",
      "resignation_letter_date": "12/7/2021",
      "relieving_date": "12/31/2021",
      "reason_for_resignation": "Moving to a new location"
    },
    {
      "employee_id": "obarijima.ezekiel@outsourceglobal.net",
      "resignation_letter_date": "12/7/2021",
      "relieving_date": "12/23/2021",
      "reason_for_resignation": "personal reasons"
    },
    {
      "employee_id": "nwachukwu.sandra@outsourceglobal.net",
      "resignation_letter_date": "12/7/2021",
      "relieving_date": "12/24/2021",
      "reason_for_resignation": "personal reasons"
    },
    {
      "employee_id": "zeal.ogbonna@outsourceglobal.net",
      "resignation_letter_date": "12/8/2021",
      "relieving_date": "12/22/2021",
      "reason_for_resignation": "Continuing education"
    },
    {
      "employee_id": "abdulhakeem.zainab@outsourceglobal.net",
      "resignation_letter_date": "12/9/2021",
      "relieving_date": "12/24/2021",
      "reason_for_resignation": "Health Emergency"
    },
    {
      "employee_id": "blessing.morgan@outsourceglobal.net",
      "resignation_letter_date": "12/10/2021",
      "relieving_date": "12/31/2021",
      "reason_for_resignation": "Moving to a new location"
    },
    {
      "employee_id": "ndutimi.adadi@outsourceglobal.net",
      "resignation_letter_date": "12/21/2021",
      "relieving_date": "1/7/2022",
      "reason_for_resignation": "Found a new job"
    },
    {
      "employee_id": "victoria.uzuaje@outsourceglobal.net",
      "resignation_letter_date": "12/16/2021",
      "relieving_date": "1/5/2022",
      "reason_for_resignation": "Personal reasons"
    },
    {
      "employee_id": "anetor.unuane@outsourceglobal.net",
      "resignation_letter_date": "12/22/2021",
      "relieving_date": "1/5/2022",
      "reason_for_resignation": "Personal reasons"
    },
    {
      "employee_id": "muhammed.abdullahi@outsourceglobal.net",
      "resignation_letter_date": "12/28/2021",
      "relieving_date": "1/14/2022",
      "reason_for_resignation": "Relocating"
    },
    {
      "employee_id": "chigozie.nkata@outsourceglobal.net",
      "resignation_letter_date": "12/23/2021",
      "relieving_date": "1/14/2022",
      "reason_for_resignation": "Continuing education"
    },
    {
      "employee_id": "musa.bala@outsourceglobal.net",
      "resignation_letter_date": "12/31/2021",
      "relieving_date": "1/14/2022",
      "reason_for_resignation": "Continuing education"
    },
    {
      "employee_id": "mohammed.rabiu@outsourceglobal.net",
      "resignation_letter_date": "1/3/2022",
      "relieving_date": "1/20/2022",
      "reason_for_resignation": "Salary too low/work hours unmanageable"
    },
    {
      "employee_id": "samuel.archibong@outsourceglobal.net",
      "resignation_letter_date": "1/3/2022",
      "relieving_date": "1/21/2022",
      "reason_for_resignation": "Family Business"
    },
    {
      "employee_id": "wisdom.ekene@outsourceglobal.net",
      "resignation_letter_date": "1/5/2022",
      "relieving_date": "1/21/2022",
      "reason_for_resignation": "Continuing education"
    },
    {
      "employee_id": "rumiki.shammah@outsourceglobal.net",
      "resignation_letter_date": "1/6/2022",
      "relieving_date": "1/28/2022",
      "reason_for_resignation": "Distance from work and low transport allowance"
    },
    {
      "employee_id": "joy.awo@outsourceglobal.net",
      "resignation_letter_date": "1/11/2022",
      "relieving_date": "1/31/2022",
      "reason_for_resignation": "Found a new job"
    },
    {
      "employee_id": "obinna.edom@outsourceglobal.com",
      "resignation_letter_date": "1/12/2022",
      "relieving_date": "1/31/2022",
      "reason_for_resignation": "Relocating"
    },
    {
      "employee_id": "lois.ambakederemo@outsourceglobal.net",
      "resignation_letter_date": "1/20/2022",
      "relieving_date": "2/8/2022",
      "reason_for_resignation": "Found a new job"
    },
    {
      "employee_id": "racheal.ezra@outsourceglobal.net",
      "resignation_letter_date": "1/13/2022",
      "relieving_date": "1/28/2022",
      "reason_for_resignation": "Continuing education and marriage"
    },
    {
      "employee_id": "joy.ogalla@outsourceglobal.net",
      "resignation_letter_date": "1/12/2022",
      "relieving_date": "1/28/2022",
      "reason_for_resignation": "Continuing education and marriage"
    },
    {
      "employee_id": "stephanie.modupe@outsourceglobal.net",
      "resignation_letter_date": "1/25/2022",
      "relieving_date": "2/11/2022",
      "reason_for_resignation": "Relocating"
    },
    {
      "employee_id": "igboyi.felix@outsourceglobal.net",
      "resignation_letter_date": "1/14/2022",
      "relieving_date": "2/2/2022",
      "reason_for_resignation": "Work hours unmanageable/Illness"
    },
    {
      "employee_id": "akagworo.gloria@outsourceglobal.net",
      "resignation_letter_date": "1/18/2022",
      "relieving_date": "2/7/2022",
      "reason_for_resignation": "Found a new job"
    },
    {
      "employee_id": "ophe.ella@outsourceglobal.net",
      "resignation_letter_date": "2/4/2022",
      "relieving_date": "2/21/2022",
      "reason_for_resignation": "Salary too low"
    }
   ]
class ExitService{

    public Exits = ExitModel;
    public employeeModel = EmployeeModel;
    constructor(){

           
            console.log(exitList.length)
    
        // for (let index = 0; index < exitList.length; index++) {
        //     try {
        //         this.createExit(exitList[index])
                
        //     } catch (error) {
        //         console.log(error)
        //     }
            
        // }

    }
    //Returns all Exit details
    public async findAllExit(): Promise<Exit[]>{
        const Exits: Exit[] = await this.Exits.find().populate('employee_id');
        return Exits
    }

     //find Exit by Id

     public async findExitById(ExitId: string) : Promise<Exit>{
        if (isEmpty(ExitId)) throw new HttpException(400, "No Id provided");
       //find Exit Details with Id given

       const findExit: Exit = await this.Exits.findOne({_id:ExitId}).populate('employee_id');

       if(!findExit) throw new HttpException(409, "Details with that Id dont exist");

       return findExit

    }


    //create new Exit details

    public async createExit(ExitData) : Promise<Exit>{
        if (isEmpty(ExitData)) throw new HttpException(400, "No data provided");

        //check if employee already provided Exit details
        // const findExit: Exit = await this.Exits.findOne({id: ExitData.employee_id});
        const findEmployeeById: Employee = await this.employeeModel.findOne({ company_email:ExitData.employee_id}).populate("employee_id");
         if (!findEmployeeById) {
             //throw new HttpException(404, 'Employee does not exist!')
             console.log(`employee does not exist ${ExitData.employee_id}`)
         };

            const date1 = moment(new Date(ExitData.relieving_date))
            const date2 = moment(new Date(ExitData.resignation_letter_date));
            const result = date1.diff(date2,"days");
            // console.log(result);

        // if(findExit) throw new HttpException(409, `Employee ${ExitData.employee_id} already Resigned`);
        const days = findEmployeeById.isAdmin ? 28 : 14
        console.log(days, findEmployeeById.isAdmin, findEmployeeById.company_email,result ) 
        if(result>=days){
            console.log('greater')
            
                const createExitData = await this.Exits.create({
                    ...ExitData,
                    employee_id: findEmployeeById._id
                });
                if(createExitData) {
                    await this.employeeModel.findOneAndUpdate(
                        {_id: findEmployeeById._id },
                        {$set : {status:'left'}},
                        {new : true}
                    );
                }
                return createExitData;

        }


          throw new HttpException(409, `Notice days must be greater than ${days} days`);




    }

    //Updates Exit Details

    public async updateExit(ExitId:string,ExitData:UpdateExitDto):Promise<Exit>{
        if (isEmpty(ExitData)) throw new HttpException(400, "No data provided");

        if(ExitData.employee_id){
            const findExit: Exit = await this.Exits.findOne({Id:ExitData.employee_id});
            if(findExit && findExit._id != ExitId) throw new HttpException(409, `Employee ${ExitData.employee_id} Exit details dont exist`);
        }

        const updateExitData: Exit = await this.Exits.findByIdAndUpdate(ExitId,ExitData,{new:true})
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
