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
    this.router.get(`${this.path}/single/:emailId`, this.email.getSingleEmail);
    this.router.put(`${this.path}/:id`, validationMiddleware(EmailDto, 'body'), this.email.emailRead);
    this.router.delete(`${this.path}/:id`, this.email.deleteEmail);
  }
}

export default EmailRoute;