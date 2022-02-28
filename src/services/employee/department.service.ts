/* eslint-disable prettier/prettier */
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import  {IDepartment}  from '@/interfaces/employee-interface/department.interface';
import { CreateDepartmentDto,UpdateDepartmentDto } from '@/dtos/employee/department.dto';
import  departmentModel  from '@models/department/department.model';
import { slugify } from '@/utils/slugify';



class DepartmentService{
    public Departments = departmentModel;

/**
 * Returns all Departments
 */

public async findAllDepartments(): Promise<IDepartment[]>{
    const Departments : IDepartment[] = await this.Departments.find();
    return Departments;
    }

/**
 * Returns Departments with the Id given
 */

public async findDepartmentById(DepartmentId:string) : Promise<IDepartment>{
   
    //Check if Id is empty
    if (isEmpty(DepartmentId)) throw new HttpException(400, "No Id provided");

    //find Department with Id given
    const findDepartment:IDepartment = await this.Departments.findOne({ _id:DepartmentId });

    if(!findDepartment) throw new HttpException(409, "Department with that Id doesnt exist");

    return findDepartment;

   
    }

    /**
     *Creates a new Department 
     */


     public async createDepartment(DepartmentData: CreateDepartmentDto) : Promise<IDepartment>{
        
        //Check if data is empty
       if (isEmpty(DepartmentData)) throw new HttpException(400, "No data provided");

       const findDepartment: IDepartment = await this.Departments.findOne({Department: DepartmentData.department});
       if(findDepartment) throw new HttpException(409, `Department ${DepartmentData.department} already exists`);

       const data = {
         ...DepartmentData,
         slug: slugify(DepartmentData.department)
       }
       const createDepartmentData: IDepartment = await this.Departments.create(data);
       return createDepartmentData;
     }


    /**
     *Updates existing Department 
     */

     public async updateDepartment(DepartmentId:string,DepartmentData: UpdateDepartmentDto)  : Promise<IDepartment>{
      console.log(DepartmentData)
        //Check if data is empty
        if (isEmpty(DepartmentData)) throw new HttpException(400, "No data provided");
        console.log(DepartmentData)
        const updateDepartmentById: IDepartment = await this.Departments.findByIdAndUpdate({
            _id: DepartmentId
          },
          {
            $set: {department: DepartmentData.department}
          },
          { new: true });
        if(!updateDepartmentById) throw new HttpException(409, "Department doesn't exist");
         return updateDepartmentById;
   } 


     //deletes existing Department
     public async deleteDepartment(DepartmentId:string) : Promise<IDepartment>{
        const deleteDepartmentById : IDepartment = await this.Departments.findByIdAndDelete(DepartmentId);
        if(!deleteDepartmentById) throw new HttpException(409, "Department doesn't exist");
        return deleteDepartmentById;
    }





}

export default DepartmentService;
