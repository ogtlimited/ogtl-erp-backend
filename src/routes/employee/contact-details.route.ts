import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateContactDetailsDto, UpdateContactDetailsDto } from '@/dtos/employee/contact-details.dto';
import ContactDetailsController from '@/controllers/employee/contact-details.controller';


class ContactDetailsRoute implements Routes {
    public path = '/ContactDetails';
    public router = Router();
    public ContactDetailsController = new ContactDetailsController();
  
    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.ContactDetailsController.getContactDetails);
        this.router.get(`${this.path}/:id`, this.ContactDetailsController.getContactDetailsById);
        this.router.post(`${this.path}`, validationMiddleware(CreateContactDetailsDto, 'body'), this.ContactDetailsController.CreateContactDetails);
        this.router.put(`${this.path}/:id`, validationMiddleware(UpdateContactDetailsDto, 'body', true), this.ContactDetailsController.updateContactDetails);
        this.router.delete(`${this.path}/:id`, this.ContactDetailsController.deleteContactDetails);
      }
    }

    export default ContactDetailsRoute;