/* eslint-disable prettier/prettier */

import { NextFunction, Request, Response } from 'express';
import orientationModel from '@/models/recruitment/orientation_and_training.model';
import { IOrientation } from '@/interfaces/recruitment/orientation_and_training.interface';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { CreateOrientationDto,UpdateOrientationDto } from '@/dtos/recruitment/orientation_and_training.dto';
import { sendEmail } from '@/utils/sendEmail';
import OrientationService from '@/services/recruitment/orientation_and_training.service';
import { OfferMessage } from '@/utils/message';



class OrientationController {
  public orientationService = new OrientationService();
 
  //Method for returning all job offers
  public getOrientations = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const findAllOrientations: IOrientation[] = await this.orientationService.findAllOrientations();
      res.status(200).json({data:findAllOrientations, totalOrientations: findAllOrientations.length, message:"All Orientation"})
    }catch (error) {
      next(error)
    }
  }

 

  //Method for returning a single job offer
  public getOrientationById = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const orientationId:string = req.params.id;
      const findJobOffer:IOrientation = await this.orientationService.findOrientationById(orientationId);
      res.status(200).json({data:findJobOffer, message:" Orientation found successfully"})
    }
    catch (error) {
      next(error)
    }
  }

  //Method for creating job offer
  public createOrientation = async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const OrientationData: CreateOrientationDto = req.body;
        const createOrientationData: IOrientation = await this.orientationService.createOrientation(OrientationData);
        res.status(201).json({ data: createOrientationData, message: 'Orientation/Training succesfully created' });
      } catch (error) {
        next(error);
      }
  }

  //Method for updating job offer
  public updateOrientation = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const orientationId:string = req.params.id;
      const orientationData:UpdateOrientationDto = req.body;
      const updateOrientationData: IOrientation = await this.orientationService.updateOrientation(orientationId,orientationData);
      res.status(200).json({ data: updateOrientationData, message: 'Orientation/Training updated.' });
    }
    catch (error) {
      next(error)
    }
  }

  //Method for deleting job offer
  public deleteOrientation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orientationId:string = req.params.id;
      const deleteOrientation = await this.orientationService.deleteOrientation(orientationId);

      res.status(200).json({ data: deleteOrientation, message: 'Orientation/Training  deleted' });
    } catch (error) {
      next(error);
    }
  };

}

export default OrientationController;
