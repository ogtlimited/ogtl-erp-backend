/* eslint-disable prettier/prettier */
import WarningLetterService from '@services/pip/warning_letter.service';
import { NextFunction, Request, Response } from 'express';
import { IWarningLetter } from '@interfaces/pip-interface/warning_letter.interface';
import { CreateWarningLetterDto } from '@dtos/pip/warning_letter.dto';

class WarningLetterController {
  public warningLetterService = new WarningLetterService();

  //Method for return all warning letters
  public getWarningLetters = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const findAllWarningLetters: IWarningLetter[] = await this.warningLetterService.findAllWarningLetters();
      res.status(200).json({data:findAllWarningLetters, totalWarningLetters: findAllWarningLetters.length, message:"All warning letters"})
    }catch (error) {
      next(error)
    }
  }
//Method for getting all warning letters for an individual employee
  public getAllWarningLettersForEmployee = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const employeeId:string = req.params.id;
      const findAllWarningLetters: IWarningLetter[] = await this.warningLetterService.findAllWarningLettersForAnEmployee(employeeId);
      if(findAllWarningLetters){
        res.status(200).json({data:findAllWarningLetters, totalWarningLetters: findAllWarningLetters.length, message:"All warning letters"})
      }

    }catch (error) {
      next(error)
    }
  }

  //Method for getting one warning letter
  public getWarningLetterById = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const warningLetterId:string = req.params.id;
      const findWarningLetter:IWarningLetter = await this.warningLetterService.findWarningLetterById(warningLetterId);
      res.status(200).json({data:findWarningLetter, message:"Warning letter found successfully"})
    }
    catch (error) {
      next(error)
    }
  }

  //Method for creating warning letter
  public createWarningLetter = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const warningLetterData:CreateWarningLetterDto = req.body;
      const createWarningLetterData: IWarningLetter = await this.warningLetterService.createWarningLetter(warningLetterData);
      res.status(201).json({ data: createWarningLetterData, message: 'Warning letter created.' });
    }
    catch (error) {
      next(error)
    }
  }

  //Method for deleting warning letter
  public deleteWarningLetter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const warningLetterId:string = req.params.id;
      const deleteWarningLetter = await this.warningLetterService.deleteWarningLetter(warningLetterId);

      res.status(200).json({ data: deleteWarningLetter, message: 'Warning letter deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default WarningLetterController;
