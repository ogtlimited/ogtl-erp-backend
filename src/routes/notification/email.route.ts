/* eslint-disable prettier/prettier */
import { Router } from 'express';
import  authMiddleware  from '@middlewares/auth.middleware';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { EmailDto } from '@dtos/notification/email.dto';
import EmailController from '@/controllers/notification/email.controller';


class EmailRoute implements Routes {
  public path = '/api/email';
  public router = Router();
  public email = new EmailController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:emailId`, this.email.getEmails);
    this.router.put(`${this.path}/:emailId`,  [validationMiddleware(EmailDto, 'body'),authMiddleware], this.email.emailRead);
  }
}

export default EmailRoute;
