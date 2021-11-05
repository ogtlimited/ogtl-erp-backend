/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

import { CreateEmergencyContactDto, UpdateEmergencyContactDto } from '@dtos/employee/emergency-contact.dto';
import EmergencyContactController from '@/controllers/employee/emergency-contact.controllers';
import authMiddleware from '@/middlewares/auth.middleware';

class EmergencyContactRoute implements Routes {
  public path = '/EmergencyContact';
  public router = Router();
  public EmergencyContactController = new EmergencyContactController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.EmergencyContactController.getEmergencyContacts);
    this.router.get(`${this.path}/:id`, authMiddleware, this.EmergencyContactController.getEmergencyContactById);
    this.router.post(
      `${this.path}`,
      [validationMiddleware(CreateEmergencyContactDto, 'body'), authMiddleware],
      this.EmergencyContactController.CreateEmergencyContacts,
    );
    this.router.post(
      `${this.path}/bulk-upload`,
      [authMiddleware],
      this.EmergencyContactController.CreateBulkEmergencyContacts,
    );
    this.router.put(
      `${this.path}/:id`,
      [validationMiddleware(UpdateEmergencyContactDto, 'body', true), authMiddleware],
      this.EmergencyContactController.updateEmergencyContacts,
    );
    this.router.delete(`${this.path}/:id`, authMiddleware, this.EmergencyContactController.deleteEmergencyContacts);
  }
}

export default EmergencyContactRoute;
