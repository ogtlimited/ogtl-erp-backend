/* eslint-disable prettier/prettier */
import CoachingFormModel from '@/models/coaching/coaching.model';
import { HttpException } from '@exceptions/HttpException';
import { CoachingFormInterface } from './../../interfaces/coaching/coaching.interface';

import { isEmpty } from '@utils/util';
import { CoachingFormDTO, CoachingFormUpdateDTO, CoachingFormUserResponseUpdateDTO } from '@/dtos/coaching/coaching.dto';

class CoachingFormService {
    public Coaching = CoachingFormModel;

    /**
     *Returns all CoachingForm
     */
    public async findAllCoaching(supervisor): Promise<CoachingFormInterface[]> {
        const Coaching: CoachingFormInterface[] = await this.Coaching.find({supervisor: supervisor}).populate('employee_id', 'first_name last_name middle_name ogid');
        return Coaching;
    }

    /**
     *Returns the CoachingForm with the Id given
     */
    public async findCoachingFormById(CoachingFormId:string) : Promise<CoachingFormInterface>
    {
       //Check if Id is empty
       if (isEmpty(CoachingFormId)) throw new HttpException(400, "No Id provided");

       //find CoachingForm with Id given
       const findCoachingForm:CoachingFormInterface = await this.Coaching.findOne({ _id:CoachingFormId  }).populate('supervisor');

       if(!findCoachingForm) throw new HttpException(409, "CoachingForm with that Id doesnt exist");

       return findCoachingForm;

    }

    public async findEmployeeCoachingForm(employeeId:string) : Promise<CoachingFormInterface[]>
    {
       //Check if Id is empty
       if (isEmpty(employeeId)) throw new HttpException(400, "No Id provided");

       //find CoachingForm with Id given
       const findCoachingForm:CoachingFormInterface[] = await this.Coaching.find({ employee_id: employeeId, status: 'submitted'  }).populate({path:'employee_id supervisor',populate:{path:'designation'}})

       if(!findCoachingForm) throw new HttpException(409, "CoachingForm with that Id doesnt exist");

       return findCoachingForm;

    }

    /**
     *Creates a new CoachingForm
     */


     public async createCoachingForm(CoachingFormData: CoachingFormDTO) : Promise<CoachingFormInterface>{
        //Check if data is empty
       if (isEmpty(CoachingFormData)) throw new HttpException(400, "No data provided");
       const createCoachingFormData: CoachingFormInterface = await this.Coaching.create(CoachingFormData);
       return createCoachingFormData;
     }

     /**
     *Updates existing CoachingForm
     */

     public async updateCoachingForm(CoachingFormId:string,CoachingFormData: CoachingFormUpdateDTO)  : Promise<CoachingFormInterface>{

        //Check if data is empty
        if (isEmpty(CoachingFormData)) throw new HttpException(400, "No data provided");

        const updateCoachingFormById: CoachingFormInterface = await this.Coaching.findByIdAndUpdate(CoachingFormId,CoachingFormData, {new:true});
        if(!updateCoachingFormById) throw new HttpException(409, "CoachingForm doesn't exist");
         return updateCoachingFormById;
    }
     public async updateCoachingFormUserResponse(CoachingFormId:string,CoachingFormData: CoachingFormUserResponseUpdateDTO)  : Promise<CoachingFormInterface>{

        //Check if data is empty
        if (isEmpty(CoachingFormData)) throw new HttpException(400, "No data provided");

        const updateCoachingFormById: CoachingFormInterface = await this.Coaching.
        findByIdAndUpdate(CoachingFormId,{ $set: { user_response: CoachingFormData.user_response, reason: CoachingFormData.reason } });
        if(!updateCoachingFormById) throw new HttpException(409, "CoachingForm doesn't exist");
         return updateCoachingFormById;
    }

     public async deleteCoachingForm(CoachingFormId:string) : Promise<CoachingFormInterface>{
         const deleteCoachingFormById : CoachingFormInterface = await this.Coaching.findByIdAndDelete(CoachingFormId);
         if(!deleteCoachingFormById) throw new HttpException(409, "CoachingForm doesn't exist");
         return deleteCoachingFormById;
     }

}

export default CoachingFormService;
