import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';


import {CreateEmergencyContactDto, UpdateEmergencyContactDto} from '@dtos/employee/emergency-contact.dto';
import EmergencyContactController from '@/controllers/employee/emergency-contact.controllers';


class EmergencyContactRoute implements Routes {
    public path = '/EmergencyContact';
    public router = Router();
    public EmergencyContactController = new EmergencyContactController();
  
    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.EmergencyContactController.getEmergencyContacts);
        this.router.get(`${this.path}/:id`, this.EmergencyContactController.getEmergencyContactById);
        this.router.post(`${this.path}`, validationMiddleware(CreateEmergencyContactDto, 'body'), this.EmergencyContactController.CreateEmergencyContacts);
        this.router.put(`${this.path}/:id`, validationMiddleware(UpdateEmergencyContactDto, 'body', true), this.EmergencyContactController.updateEmergencyContacts);
        this.router.delete(`${this.path}/:id`, this.EmergencyContactController.deleteEmergencyContacts);
      }
    }

    export default EmergencyContactRoute;