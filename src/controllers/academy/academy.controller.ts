/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import AcademyService from "@services/academy/academy.service";


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
      const newData = req.body;
    //   const createdData = await this.newAcademyService.create(newData);
     console.log("From Google Form", newData)
    //   res.status(201).json({ data: createdData});
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

 
}

export default AcademyController;
