/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import AcademyService from "@services/academy/academy.service";
import { send } from 'process';


class AcademyController {
    
  public academyService = new AcademyService();
  public findAllAcademyApplicants = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllRecords = await this.academyService.findAllAcademyApplicants(req.query);
      res.status(200).json({ data: findAllRecords});
    } catch (error) {
      next(error);
    }
  };

  //Method for returning a single academy applicant
  public findAcademyApplicantById = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const academyApplicantId:string = req.params.id;
      const findAcademyApplicant:any = await this.academyService.findacademyApplicantById(academyApplicantId);
      res.status(200).json({data:findAcademyApplicant, message:"Academy applicant found successfully"})
    }
    catch (error) {
      next(error)
    }
  }
 
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newData = req.body;
      const createdData = await this.academyService.create(newData);
      res.status(201).json({ data: createdData});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public createFromGoogleForm = async (req: Request, res: Response, next: NextFunction) => {
    try {

      
    // req.body['Please upload your CV.'] =  req.body['Please upload your CV.']
    // .split("<plain>")[1].split("</plain>")[0]
    // req.body['Certifications in relation to the selected program above (if any)'] = req.body['Certifications in relation to the selected program above (if any)']
    // .split("<BR/>")
    // req.body['Favored Programming Language(s)'] = req.body['Favored Programming Language(s)'].split("<BR/>")
   
    
      const newData = req.body;
      newData['Email'] = newData['user_name']
      newData['Created At'] = newData['application_date']
      newData['Please select your gender'] = newData['gender']
      newData['First Name'] = newData['first_name']
      newData['Middle Name'] =  newData['middle_name']
      newData['Last Name'] = newData['last_name']
      newData['Mobile Number'] = newData['mobile_number']
      newData['Alternate Phone Number'] = newData['alt_mobile_number']
      newData['Highest Qualification Attained'] = newData['highest_qualification_attained']
      newData["If 'Other' was selected above, please state which."] = newData['other_option']
      newData['Interested program'] = newData['interested_program']
      newData['What mode of engagement would you prefer '] = newData['mode_of_engagement']
      newData['How many hours in a week can you commit to this program '] = newData['weekly_hours']
      newData['What is your Stack?'] = newData['stack']
      newData['Favored Programming Language(s)'] = newData['fav_programming_lang']
      newData['Years of experience in the selected program above '] = newData['years_of_experience']
      newData['Certifications in relation to the selected program above (if any)'] = newData['certifications']
      newData['Please upload your CV.'] = newData['cv']
      newData['Consent'] = newData['consent']

      const formattedRequest= {
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

      const createdData = await this.academyService.createFromForm(formattedRequest);
      res.status(200).json({ data: createdData});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };


  public updateAcademyApplicant = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const academyApplicationId:string = req.params.id;
      const academyApplicationData:any = req.body;
      const updateAcademyApplicationData: any = await this.academyService.updateAcademyApplicant(academyApplicationId,academyApplicationData);
      res.status(200).json({ data: updateAcademyApplicationData, message: 'Academy Application updated.' });
    }
    catch (error) {
      next(error)
    }
  }

  public deleteAcademyApplicant = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const academyApplicantId:string = req.params.id;
      const deleteAcademyApplicant = await this.academyService.deleteAcademyApplicant(academyApplicantId);

      res.status(200).json({ data: deleteAcademyApplicant, message: 'Academy Applicant deleted' });
    } catch (error) {
      next(error);
    }
  };
 
}

export default AcademyController;
