import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateContactDetailsDto, UpdateContactDetailsDto } from '@/dtos/employee/contact-details.dto';
import ContactDetailsController from '@/controllers/employee/contact-details.controller';
import authMiddleware from '@/middlewares/auth.middleware';


class ContactDetailsRoute implements Routes {
    public path = '/ContactDetails';
    public router = Router();
    public ContactDetailsController = new ContactDetailsController();
  
    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`,authMiddleware, this.ContactDetailsController.getContactDetails);
        this.router.get(`${this.path}/:id`,authMiddleware, this.ContactDetailsController.getContactDetailsById);
        this.router.post(`${this.path}`,authMiddleware, validationMiddleware(CreateContactDetailsDto, 'body'), this.ContactDetailsController.CreateContactDetails);
        this.router.put(`${this.path}/:id`,authMiddleware, validationMiddleware(UpdateContactDetailsDto, 'body', true), this.ContactDetailsController.updateContactDetails);
        this.router.delete(`${this.path}/:id`,authMiddleware, this.ContactDetailsController.deleteContactDetails);
      }
    }

    export default ContactDetailsRoute;