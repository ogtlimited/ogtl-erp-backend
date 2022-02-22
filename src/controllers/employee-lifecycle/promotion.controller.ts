/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreatePromotionDto, UpdatePromotionDto } from '@dtos/employee-lifecycle/promotion.dto';
import { IPromotion } from '@/interfaces/employee-lifecycle/promotion.interface';
import PromotionService from '@/services/employee-lifecycle/promotion.service';
import {emailTemplate} from '@utils/email';
import {promotionMessage} from '@utils/message';
const { SocketLabsClient } = require('@socketlabs/email');
const { Socket } = require("@/utils/socket");
const redis = require('redis');
const client = redis.createClient();

class PromotionController {
  public promotionService = new PromotionService();
  public findAllPromotions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.promotionService.findAllPromotions();
      res.status(200).json({ data: data});
    } catch (error) {
      next(error);
    }
  };

  //Method for returning all promotion letters for an employee
  public findPromotionForAnEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data = await this.promotionService.findAllPromotionsForAnEmployee(id);
      if(data){
        res.status(200).json({ data: data});
      }

    } catch (error) {
      next(error);
    }
  };

  public findPromotionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data = await this.promotionService.findPromotionById(id);
      res.status(200).json({ data: data});
    } catch (error) {
      next(error);
    }
  };

  public createPromotion = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (<any>req).user
      const newData: CreatePromotionDto = req.body;
      const createdData: IPromotion = await this.promotionService.createPromotion(newData);
      this.sendEmail(promotionMessage.subject, promotionMessage.message, user.company_email)
      res.status(201).json({ data: createdData,message: "Promotion Succesful"});
    } catch (error) {

      next(error);
    }
  };

  public updatePromotion = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const PromotionId: string = req.params.id;
        const PromotionData: UpdatePromotionDto = req.body;
        const updatePromotionData: IPromotion = await this.promotionService.updatePromotion(PromotionId,PromotionData);
        res.status(200).json({data:updatePromotionData, message:"Promotion Updated"});
    }
    catch(error){
        next(error)
    }

 }

 public deletePromotion = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const PromotionId: string = req.params.id;
        const deletePromotionData: IPromotion = await this.promotionService.deletePromotion(PromotionId);
        res.status(200).json({data:deletePromotionData, message:"Promotion Deleted"});

    }
    catch(error){
        next(error)
    }

 }

 private async sendEmail(subject: string, message: string, receiver: string[]){
  const email = emailTemplate(subject, message, receiver)
  const mailgun = require('mailgun-js') ({apiKey:process.env.MAIL_GUN_KEY, domain:process.env.MAIL_GUN_DOMAIN});

  mailgun.messages().send(email, (error, body) => {
      if(error) console.log(error)
      else console.log(body);
  });
 }
}

export default PromotionController;
