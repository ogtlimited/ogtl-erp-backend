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
      const formattedRequest = await this.academyService.formattedData(req.body)
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


  public findByReportCount= async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findRecordsByReportCount = await this.academyService.findByReportCount(req.query);
      res.status(200).json({ data: findRecordsByReportCount});
    } catch (error) {
      next(error);
    }
  };

 
}

export default AcademyController;
