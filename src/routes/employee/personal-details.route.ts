/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreatePersonalDetailsDto, UpdatePersonalDetailsDto } from '@/dtos/employee/personal-details.dto';
import PersonalDetailsController from '@/controllers/employee/personal-details.controller';
import authMiddleware from '@/middlewares/auth.middleware';


class PersonalDetailsRoute implements Routes {
    public path = '/PersonalDetails';
    public router = Router();
    public PersonalDetailsController = new PersonalDetailsController();

    constructor() {
      this.initializeRoutes();
    }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.PersonalDetailsController.getPersonalDetails);
    this.router.get(`${this.path}/:id`, authMiddleware, this.PersonalDetailsController.getPersonalDetailsById);
    this.router.post(
      `${this.path}`,
      [validationMiddleware(CreatePersonalDetailsDto, 'body'), authMiddleware],
      this.PersonalDetailsController.CreatePersonalDetails,
    );
    this.router.post(
      `${this.path}/bulk-upload`,
      [authMiddleware],
      this.PersonalDetailsController.CreateBulkPersonalDetails,
    );
    this.router.put(
      `${this.path}/:id`,
      [validationMiddleware(UpdatePersonalDetailsDto, 'body', true), authMiddleware],
      this.PersonalDetailsController.updatePersonalDetails,
    );
    this.router.delete(`${this.path}/:id`, authMiddleware, this.PersonalDetailsController.deletePersonalDetails);
  }
    }

    export default PersonalDetailsRoute;
