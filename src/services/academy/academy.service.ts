/* eslint-disable prettier/prettier */
import academyModel from '@models/academy/academy.model';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';


class AcademyService {
  public academyModel = academyModel;

  public async findAllAcademyApplicants(query:any): Promise<any> {
    const academyRecords = await academyModel.find(query)
    .populate({ path: 'rep_sieving_call', model: 'Employee' });
    return academyRecords;
  }

    //Method for finding a single Academy applicant
  public async findacademyApplicantById(academyApplicantId: string): Promise<any> {
    if (isEmpty(academyApplicantId
        )) throw new HttpException(400, `Academy applicant with Id:${academyApplicantId}, does not exist`);
    const findacademyApplicant: any = await this.academyModel
    .findOne({ _id: academyApplicantId })
    .populate({ path: 'rep_sieving_call', model: 'Employee' });
    if (!findacademyApplicant) throw new HttpException(409, `academy applicant with Id:${academyApplicantId}, does not exist`);
    return findacademyApplicant;
  }

  public async create(info): Promise<any> {
    const academyRecords = [];
    // console.log("Service Data",info)
    for(let idx = 0; idx < info.length; idx++){
      const singleObject = info[0]
      const record = info[idx]
      const academyInfo  = await academyModel.findOne({user_name: record.user_name})
      if(academyInfo === null){
        academyRecords.push(record)
      }
    }
    
    await academyModel.insertMany(academyRecords)
    return `${academyRecords.length} record(s) uploaded successfully`
  }

  public async createFromForm(info): Promise<any> {
      const academyInfo  = await academyModel.findOne({user_name: info.user_name})
      // console.log("AcademyInfo",academyInfo)
      if(!academyInfo){
        return await academyModel.create(info)
      }

       return `Record already exist`  
  }

  public async updateAcademyApplicant( academyApplicantId: string, academyApplicationUpdateData: any): Promise<any> {
    //check if no Academy Applicant data is empty
    if (isEmpty(academyApplicationUpdateData)) throw new HttpException(400, 'Bad request');
    const academyApplication: any = await this.academyModel.findOne({_id: academyApplicantId});
    if (!academyApplication) throw new HttpException(404, `${academyApplicationUpdateData._id} does not exist`);
    const updateAcademyApplicantById:any = await this.academyModel.findByIdAndUpdate(academyApplicantId,academyApplicationUpdateData,{new:true})
    if (!updateAcademyApplicantById) throw new HttpException(409, "Academy Applicant Data could not be updated");
    return updateAcademyApplicantById;
  }

  public async deleteAcademyApplicant(academyApplicantId: string):Promise<any>{
    const deleteAcademyApplicantById: any = await this.academyModel.findByIdAndDelete(academyApplicantId);
    if(!deleteAcademyApplicantById) throw new HttpException(409, `Academy Applicant with Id:${deleteAcademyApplicantById}, does not exist`);
    return deleteAcademyApplicantById;
  }
   
}

export default AcademyService;

