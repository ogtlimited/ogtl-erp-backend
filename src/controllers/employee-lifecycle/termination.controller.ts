/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateTerminationDto, UpdateTerminationDto } from '@dtos/employee-lifecycle/termination.dto';
import { ITermination } from '@/interfaces/employee-lifecycle/termination.interface';
import TerminationService from '@/services/employee-lifecycle/termination.service';
import {emailTemplate} from '@utils/email';
import {terminationMessage} from '@utils/message';
const { SocketLabsClient } = require('@socketlabs/email');
const { Socket } = require("@/utils/socket");
const redis = require('redis');
const client = redis.createClient();

class TerminationController {
  public TerminationService = new TerminationService();
  public findAllTerminations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.TerminationService.findAllTerminations();
      res.status(200).json({ data: data});
    } catch (error) {
      next(error);
    }
  };

  public findAllTerminationsByMonth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.TerminationService.findAllTerminationsByMonth();
      res.status(200).json({ data: data});
    } catch (error) {
      next(error);
    }
  };

  public findTerminationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data = await this.TerminationService.findTerminationById(id);
      res.status(200).json({ data: data});
    } catch (error) {
      next(error);
    }
  };

  public createTermination = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (<any>req).user
      const newData: CreateTerminationDto = req.body;
      const createdData: ITermination = await this.TerminationService.createTermination(newData); 
      this.sendEmail(terminationMessage.subject, terminationMessage.message, user.company_email)
      res.status(201).json({ data: createdData ,message: "Termination Succesful"});
    } catch (error) {
      next(error);
    }
  };

  public updateTermination = async (req:Request, res:Response, next:NextFunction) =>{
    try{
      const TerminationId: string = req.params.id;
      const TerminationData: UpdateTerminationDto = req.body;
      const updateTerminationData: ITermination = await this.TerminationService.updateTermination(TerminationId,TerminationData);
      res.status(200).json({data:updateTerminationData, message:"Termination Updated"});
    }
    catch(error){
        next(error)
    }

 }

 public deleteTermination = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const TerminationId: string = req.params.id;
        const deleteTerminationData: ITermination = await this.TerminationService.deleteTermination(TerminationId);
        res.status(200).json({data:deleteTerminationData, message:"Termination Deleted"});

    }
    catch(error){
        next(error)
    }

 }

 private async sendEmail(subject: string, message: string, receiver: string[]){
  const email = emailTemplate(subject, message, receiver)
  const sclient = await new SocketLabsClient(parseInt(process.env.SOCKETLABS_SERVER_ID), process.env.SOCKETLABS_INJECTION_API_KEY);

  await sclient.send(email).then(
      (response) => {
          console.log(response)
      },
      (err) => {
          //Handle error making API call
          console.log(err);
      }
  );
 }
}

export default TerminationController;
