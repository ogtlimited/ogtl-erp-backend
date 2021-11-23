/* eslint-disable prettier/prettier */
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { EmployeeType } from '@/interfaces/employee-interface/employee-type.interface';
import { CreateEmployeeTypeDto,UpdateEmployeeTypeDto } from '@/dtos/employee/employee-type.dto';
import EmployeeTypeModel from '@models/employee/employee-type.model';


class EmployeeTypeService{
    public EmployeeTypes = EmployeeTypeModel;

    /**
     * returns all employee types
     */

    public async findAllEmployeeTypes() : Promise<EmployeeType[]>{
        const EmployeeTypes : EmployeeType[] = await this.EmployeeTypes.find();
        return EmployeeTypes;
    }


    /**
     * Returns EmployeeTypes with Id given
     */
    public async findEmployeeTypeById(EmployeeTypeId:string) : Promise<EmployeeType>{

        //Check if Id is empty
        if (isEmpty(EmployeeTypeId)) throw new HttpException(400, "No Id provided");

        //find EmployeeType with Id given
        const findEmployeeType:EmployeeType = await this.EmployeeTypes.findOne({ _id:EmployeeTypeId });

        if(!findEmployeeType) throw new HttpException(409, "EmployeeType with that Id doesnt exist");

        return findEmployeeType;


        }

    /**
     *Creates a new EmployeeType
     */


     public async createEmployeeType(EmployeeTypeData: CreateEmployeeTypeDto) : Promise<EmployeeType>{

        //Check if data is empty
       if (isEmpty(EmployeeTypeData)) throw new HttpException(400, "No data provided");

       const findEmployeeType: EmployeeType = await this.EmployeeTypes.findOne({EmployeeType: EmployeeTypeData.type});
       if(findEmployeeType) throw new HttpException(409, `EmployeeType ${EmployeeTypeData.type} already exists`);

       const createEmployeeTypeData: EmployeeType = await this.EmployeeTypes.create(EmployeeTypeData);
       return createEmployeeTypeData;
     }

     /**
     *Updates existing EmployeeType
     */

     public async updateEmployeeType(EmployeeTypeId:string,EmployeeTypeData: UpdateEmployeeTypeDto)  : Promise<EmployeeType>{

        //Check if data is empty
        if (isEmpty(EmployeeTypeData)) throw new HttpException(400, "No data provided");

        const updateEmployeeTypeById: EmployeeType = await this.EmployeeTypes.findByIdAndUpdate(EmployeeTypeId,{EmployeeTypeData});
        if(!updateEmployeeTypeById) throw new HttpException(409, "EmployeeType doesn't exist");
         return updateEmployeeTypeById;
   }


     //deletes exsiting EmployeeType
     public async deleteEmployeeType(EmployeeTypeId:string) : Promise<EmployeeType>{
        const deleteEmployeeTypeById : EmployeeType = await this.EmployeeTypes.findByIdAndDelete(EmployeeTypeId);
        if(!deleteEmployeeTypeById) throw new HttpException(409, "EmployeeType doesn't exist");
        return deleteEmployeeTypeById;
    }




}

export default EmployeeTypeService;
