/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import AcademyService from "@services/academy/academy.service";
import { send } from 'process';


class AcademyController {
    
  public newAcademyService = new AcademyService();
  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllRecords = await this.newAcademyService.findAll(req.query);
      res.status(200).json({ data: findAllRecords});
    } catch (error) {
      next(error);
    }
  };

//   public findById = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const username: string = req.params.username;
//       const data = await this.newAcademyService.findById(username);
//       res.status(200).json({ data: data});
//     } catch (error) {
//       next(error);
//     }
//   };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newData = req.body;
      const createdData = await this.newAcademyService.create(newData);
      res.status(201).json({ data: createdData});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public createFromGoogleForm = async (req: Request, res: Response, next: NextFunction) => {
    try {

       if (req.body['Please upload your CV.']){
            req.body['Please upload your CV.'] =  req.body['Please upload your CV.']
           .slice(req.body['Please upload your CV.'].indexOf("https")
           ,req.body['Please upload your CV.'].indexOf("'>File"))
       }
       if (req.body['Certifications in relation to the selected program above (if any)']){
       req.body['Certifications in relation to the selected program above (if any)'] = req.body['Certifications in relation to the selected program above (if any)'].split("<BR/>")
       }
       if (req.body['Favored Programming Language(s)']){
       req.body['Favored Programming Language(s)'] = req.body['Favored Programming Language(s)'].split("<BR/>")
       }
      
      const newData = req.body;
      const formattedRequest= {
        application_date: newData['Created At'],
        gender: newData['Please select your gender'],
        user_name: newData['email'],
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
        email: newData['Email'],
  }

      const createdData = await this.newAcademyService.create(newData);
      res.status(201).json({ data: createdData});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
 
}

export default AcademyController;
