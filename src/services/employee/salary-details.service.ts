/* eslint-disable prettier/prettier */
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { SalaryDetail } from '@/interfaces/employee-interface/salary-details.interface';
import { CreateSalaryDetailsDto, UpdateSalaryDetailsDto } from '@/dtos/employee/salary-details.dto';
import SalaryDetailsModel from '@models/employee/salary-details.model';

class SalaryDetailsService{
    public SalaryDetails = SalaryDetailsModel;

    /**
         *Returns all Salary Details
        */

    public async findAllSalaryDetails(): Promise<SalaryDetail[]> {

      return this.SalaryDetails.find();

    }

    /**
     *Returns the Salary details with the Id given
     */


    public async findSalaryDetailsById(SalaryDetailsId:string) : Promise<SalaryDetail>{
      //Check if Id is empty
      if (isEmpty(SalaryDetailsId)) throw new HttpException(400, "No Id provided");
      return this.SalaryDetails.findOne({ employee_id: SalaryDetailsId });
    }



       /**
      * Creates new Salary details
      */
    public async createSalaryDetails(SalaryDetailData:CreateSalaryDetailsDto) : Promise<SalaryDetail>{

        if (isEmpty(SalaryDetailData)) throw new HttpException(400, "No data provided");

        //check if employee already provided Salary details
        const findSalaryDetails: SalaryDetail = await this.SalaryDetails.findOne({employee_id: SalaryDetailData.employee_id});

        if(findSalaryDetails){
          const updateSalaryDetailsData: SalaryDetail = await this.SalaryDetails.findByIdAndUpdate(SalaryDetailData._id,SalaryDetailData, {new:true})
          if(!updateSalaryDetailsData) throw new HttpException(409, "details could not be updated");
          return updateSalaryDetailsData;
        }
        else{
          return await this.SalaryDetails.create(SalaryDetailData);
        }


    }



    /**
     * Updates SalaryDetails
     */

     public async updateSalaryDetails(SalaryDetailsId:string,SalaryDetailData:UpdateSalaryDetailsDto):Promise<SalaryDetail>{
        if (isEmpty(SalaryDetailData)) throw new HttpException(400, "No data provided");

        if(SalaryDetailData.employee_id){
            const findSalaryDetails: SalaryDetail = await this.SalaryDetails.findOne({Id:SalaryDetailData.employee_id});
            if(findSalaryDetails && findSalaryDetails._id != SalaryDetailsId) throw new HttpException(409, `Employee ${SalaryDetailData.employee_id} Salary details dont exist`);
        }

        const updateSalaryDetailsData: SalaryDetail = await this.SalaryDetails.findByIdAndUpdate(SalaryDetailsId,{SalaryDetailData})
        if(!updateSalaryDetailsData) throw new HttpException(409, "details could not be updated");
        return updateSalaryDetailsData;
    }



    public async deleteSalaryDetails(SalaryDetailsId:string) : Promise<SalaryDetail>{

          const deleteSalaryDetailsById: SalaryDetail = await this.SalaryDetails.findByIdAndDelete(SalaryDetailsId);
          if(!deleteSalaryDetailsById) throw new HttpException(409, "Details don't exist");
          return deleteSalaryDetailsById;



    }

}
export default SalaryDetailsService;
