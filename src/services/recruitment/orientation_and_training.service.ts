/* eslint-disable prettier/prettier */
import orientationModel from '@/models/recruitment/orientation_and_training.model';
import EmployeeModel from '@/models/employee/employee.model';
import departmentModel from '@/models/department/department.model';
import { sendEmail } from '@/utils/sendEmail';
import { IOrientation } from '@/interfaces/recruitment/orientation_and_training.interface';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { CreateOrientationDto,UpdateOrientationDto } from '@/dtos/recruitment/orientation_and_training.dto';
import { ObjectId } from 'mongodb';

class OrientationService {
  public orientation = orientationModel;
  public employee  = EmployeeModel;
  public department = departmentModel;


 
  public async findAllOrientations(): Promise<IOrientation[]>{
   

    return this.orientation.find().populate('department_id');

  }


  
  public async findOrientationById(orientationId: string): Promise<IOrientation>{
    
    if(isEmpty(orientationId)) throw new HttpException(400,`Orientation with Id:${orientationId}, does not exist`);
    
    const findOrientation:IOrientation = await this.orientation.findOne({_id:orientationId}).populate('department_id');
    if(!findOrientation) throw new HttpException(409,`Orientation with Id:${orientationId}, does not exist`);
    return findOrientation;
  }

  
  public async createOrientation(orientationData: CreateOrientationDto): Promise<IOrientation>{
    
    if (isEmpty(orientationData)) throw new HttpException(400, "Bad request");

    const dept =  await this.department.findById(orientationData.department_id);
    const message = `${dept.department} has been scheduled for ${orientationData.type} on ${orientationData.start_date} at ${orientationData.end_date}/n Please attend and be on time /n HR Team`;
    const subject = "Orientation/Customer Service Training"

     let employee_emails : string[];    

    if(dept.department === "HR"){
       const {emails} =  await this.fetchHREmail();
       employee_emails = emails;
    }

    if(dept.department === "Accounting"){
        const {emails} =  await this.fetchAccountEmail();
       employee_emails = emails;
    }

    if(dept.department === "IT"){
        const {emails} =  await this.fetchITEmail();
       employee_emails = emails;

    }

    if(dept.department === "OPERATIONS"){
        const {emails} =  await this.fetchOperationsEmail();
       employee_emails = emails;

    }

    if(dept.department === "FACILITY"){
        const {emails} =  await this.fetchFacilityEmail();
       employee_emails = emails;

    }
   
    sendEmail(subject,message,employee_emails);
    return await this.orientation.create(orientationData);

  }

 
  public async updateOrientation(orientationId: string,orientationData: UpdateOrientationDto):Promise<IOrientation>{
   
    if (isEmpty(orientationData)) throw new HttpException(400, "Bad request");
    if(orientationData._id){
     
      const findOrientation: IOrientation = await this.orientation.findOne({ _id: orientationData._id  });
      if(findOrientation && findOrientation._id != orientationId) throw new HttpException(409, `${orientationData._id } already exist`);
    }
   
    const updateOrientationById:IOrientation = await this.orientation.findByIdAndUpdate(orientationId,orientationData ,{new:true})
    if (!updateOrientationById) throw new HttpException(409, "Orientation could not be updated");
    
    return updateOrientationById;
  }

 
  public async deleteOrientation(orientationId: string):Promise<IOrientation>{
   
    const deleteOrientationById: IOrientation = await this.orientation.findByIdAndDelete(orientationId);
    if(!deleteOrientationById) throw new HttpException(409, `Orientation with Id:${orientationId}, does not exist`);
    return deleteOrientationById;
  }

  private async fetchITEmail ():Promise<{emails: any[]}>{
   
  const designatedEmails = await this.employee.find({designation: {$in:[new ObjectId('6195674bb261e472f07d7380'),new ObjectId('61956752b261e472f07d7417')]}},
      {
        company_email:1,
        _id:0
      })

      const newResult= designatedEmails.map((designatedEmails) => designatedEmails.company_email)
    
      return {
        emails: newResult
      }
}

private async fetchHREmail ():Promise<{emails: any[]}>{
   
    const designatedEmails = await this.employee.find({designation: {$in:[new ObjectId('61956753b261e472f07d7431'), new ObjectId('61956753b261e472f07d7433'), new ObjectId('618a47fb9c7acabb9420e184'), new ObjectId('6195674bb261e472f07d7387')]}},
        {
          company_email:1,
          _id:0
        })
  
        const newResult= designatedEmails.map((designatedEmails) => designatedEmails.company_email)
    
        return {
          emails: newResult
        }
  }

  private async fetchAccountEmail ():Promise<{emails: any[]}>{
   
    const designatedEmails = await this.employee.find({designation: {$in:[new ObjectId('61956750b261e472f07d73fb'), new ObjectId('6195674cb261e472f07d7397')]}},
        {
          company_email:1,
          _id:0
        })
  
        const newResult= designatedEmails.map((designatedEmails) => designatedEmails.company_email)
    
        return {
          emails: newResult
        }
  }

  private async fetchOperationsEmail ():Promise<{emails: any[]}>{
   
    const designatedEmails = await this.employee.find({designation: {$in:[new ObjectId('61956750b261e472f07d73f8'), new ObjectId('6195674ab261e472f07d7365'), new ObjectId('6195674bb261e472f07d737e')]}},
        {
          company_email:1,
          _id:0
        })
  
        const newResult= designatedEmails.map((designatedEmails) => designatedEmails.company_email)
    
        return {
          emails: newResult
        }
  }

  private async fetchFacilityEmail ():Promise<{emails: string[]}>{
   
    const designatedEmails = await this.employee.find({designation: {$in:[new ObjectId('61956662b261e472f07d733e'), new ObjectId('61956751b261e472f07d73fd')]}},
        {
          company_email:1,
          _id:0
        })
    
    const newResult= designatedEmails.map((designatedEmails) => designatedEmails.company_email)
    
      return {
        emails: newResult
      }
  }

  
}
export default OrientationService;
