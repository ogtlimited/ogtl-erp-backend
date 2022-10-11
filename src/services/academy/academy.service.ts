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

  public async findByReportCount(query:any): Promise<any> {
    const overAllReportCount = await academyModel.aggregate([
        {
          '$match': {}
        }, {
          '$facet': {
            'stacks': [
              {
                '$group': {
                  '_id': '$stack', 
                  'total': {
                    '$count': {}
                  }
                }
              }
            ], 
            'processing_stage': [
              {
                '$group': {
                  '_id': '$process_stage', 
                  'total': {
                    '$count': {}
                  }
                }
              }
            ], 
            'engagement_mode': [
              {
                '$group': {
                  '_id': '$mode_of_engagement', 
                  'total': {
                    '$count': {}
                  }
                }
              }
            ], 
            'gender': [
              {
                '$group': {
                  '_id': '$gender', 
                  'total': {
                    '$count': {}
                  }
                }
              }
            ], 
            'qualification': [
              {
                '$group': {
                  '_id': '$qualification', 
                  'total': {
                    '$count': {}
                  }
                }
              }
            ], 
            'interested_program': [
              {
                '$group': {
                  '_id': '$interested_program', 
                  'total': {
                    '$count': {}
                  }
                }
              }
            ], 
            'interview_status': [
              {
                '$group': {
                  '_id': '$interview_status', 
                  'total': {
                    '$count': {}
                  }
                }
              }
            ]
          }
        }
      ])

    return overAllReportCount;
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

  public async formattedData(newData:any):Promise<any>{

    newData["Please upload your CV."] = newData["Please upload your CV."]
    .split("<plain>")[1].split("</plain>")[0]

    newData['Favored Programming Language(s)'] = newData['Favored Programming Language(s)']
    .split("<BR/>")

    newData['Certifications in relation to the selected program above (if any)'] = newData['Certifications in relation to the selected program above (if any)']
    .split("<BR/>")
    
    const formattedData= {
      application_date: newData['Created At'],
      gender: newData['Please select your gender'],
      first_name: newData['First Name'],
      middle_name: newData['Middle Name'],
      last_name: newData['Last Name'],
      mobile_number: newData['Mobile Number'],
      alt_mobile_number: newData['Alternate Phone Number'],
      highest_qualification_attained: newData['Highest Qualification Attained'],
      other_option: newData["If 'Other' was selected above, please state which."],
      interested_program: newData['Interested program'],
      mode_of_engagement: newData['What mode of engagement would you prefer '],
      weekly_hours: newData['How many hours in a week can you commit to this program '],
      stack: newData['What is your Stack?'],
      fav_programming_lang: newData['Favored Programming Language(s)'],
      years_of_experience: newData['Years of experience in the selected program above '],
      certifications: newData['Certifications in relation to the selected program above (if any)'],
      cv: newData['Please upload your CV.'],
      consent: newData['Consent'],
      user_name: newData['Email'],
  }
    return formattedData;
  }
   
}

export default AcademyService;

