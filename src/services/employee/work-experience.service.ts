/* eslint-disable prettier/prettier */
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { WorkExperience } from '@/interfaces/employee-interface/work-experience.interface';
import { CreateWorkExperienceDto,UpdateWorkExperienceDto } from '@/dtos/employee/work-experience.dto';
import WorkExperienceModel from '@models/employee/work-experience.model';

class WorkExperienceService{
   public WorkExperiences = WorkExperienceModel;

  //Returns all WorkExperience details
  public async findAllWorkExperience(): Promise<WorkExperience[]>{
    return this.WorkExperiences.find();
  }

  //find WorkExperience by Id

  public async findWorkExperienceById(WorkExperienceId: string) : Promise<WorkExperience[]>{
    if (isEmpty(WorkExperienceId)) throw new HttpException(400, "No Id provided");
    return this.WorkExperiences.find({ employee_id: WorkExperienceId });
  }


    //create new WorkExperience details

    public async createWorkExperience(WorkExperienceData:CreateWorkExperienceDto) : Promise<WorkExperience>{

        if (isEmpty(WorkExperienceData)) throw new HttpException(400, "No data provided");

        //check if employee already provided WorkExperience details
        const findWorkExperience: WorkExperience = await this.WorkExperiences.findOne({id: WorkExperienceData.employee_id});

        if(findWorkExperience) throw new HttpException(409, `Employee ${WorkExperienceData.employee_id} already provided details`);

        const createWorkExperienceData = await this.WorkExperiences.create(WorkExperienceData);

        return createWorkExperienceData;
    }


    //Updates WorkExperience Details

    public async updateWorkExperience(WorkExperienceId:string,WorkExperienceData:UpdateWorkExperienceDto):Promise<WorkExperience>{
        if (isEmpty(WorkExperienceData)) throw new HttpException(400, "No data provided");

        if(WorkExperienceData.employee_id){
            const findWorkExperience: WorkExperience = await this.WorkExperiences.findOne({Id:WorkExperienceData.employee_id});
            if(findWorkExperience && findWorkExperience._id != WorkExperienceId) throw new HttpException(409, `Employee ${WorkExperienceData.employee_id} WorkExperience details dont exist`);
        }

        const updateWorkExperienceData: WorkExperience = await this.WorkExperiences.findByIdAndUpdate(WorkExperienceId,{WorkExperienceData})
        if(!updateWorkExperienceData) throw new HttpException(409, "details could not be updated");
        return updateWorkExperienceData;
    }


    //deletes WorkExperience Details

    public async deleteWorkExperience(WorkExperienceId:string): Promise<WorkExperience>{
        const deleteWorkExperienceById: WorkExperience = await this.WorkExperiences.findByIdAndDelete(WorkExperienceId);
        if(!deleteWorkExperienceById) throw new HttpException(409, "Details don't exist");
        return deleteWorkExperienceById;


    }


}

export default WorkExperienceService;
