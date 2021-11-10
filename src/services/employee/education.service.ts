/* eslint-disable prettier/prettier */
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Education } from '@/interfaces/employee-interface/education.interface';
import { CreateEducationDto,UpdateEducationDto } from '@/dtos/employee/education.dto';
import EducationModel from '@models/employee/education.model';

class EducationService{
    public Educations = EducationModel;


  //Returns all education details
  public async findAllEducation(): Promise<Education[]>{
    return this.Educations.find();
  }



  //find education by Id

  public async findEducationById(EducationId: string) : Promise<Education[]>{
    if (isEmpty(EducationId)) throw new HttpException(400, "No Id provided");
    return this.Educations.find({ employee_id: EducationId });

  }
        //create new education details

    public async createEducation(EducationData:CreateEducationDto) : Promise<Education>{

        if (isEmpty(EducationData)) throw new HttpException(400, "No data provided");

        //check if employee already provided education details
        const findEducation: Education = await this.Educations.findOne({employee_id: EducationData.employee_id});

        if(findEducation) throw new HttpException(409, `Employee ${EducationData.employee_id} already provided details`);

        const createEducationData = await this.Educations.create(EducationData);

        return createEducationData;
    }


    //Updates Education Details

    public async updateEducation(EducationId:string,EducationData:UpdateEducationDto):Promise<Education>{
        if (isEmpty(EducationData)) throw new HttpException(400, "No data provided");

        if(EducationData.employee_id){
            const findEducation: Education = await this.Educations.findOne({Id:EducationData.employee_id});
            if(findEducation && findEducation._id != EducationId) throw new HttpException(409, `Employee ${EducationData.employee_id} Education details dont exist`);
        }

        const updateEducationData: Education = await this.Educations.findByIdAndUpdate(EducationId,{EducationData})
        if(!updateEducationData) throw new HttpException(409, "details could not be updated");
        return updateEducationData;
    }


    //deletes Education Details

    public async deleteEducation(EducationId:string): Promise<Education>{
        const deleteEducationById: Education = await this.Educations.findByIdAndDelete(EducationId);
        if(!deleteEducationById) throw new HttpException(409, "Details don't exist");
        return deleteEducationById;


    }



}

export default EducationService;


