import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreatePersonalDetailsDto, UpdatePersonalDetailsDto } from '@/dtos/employee/personal-details.dto';
import PersonalDetailsController from '@/controllers/employee/personal-details.controller';


class PersonalDetailsRoute implements Routes {
    public path = '/PersonalDetails';
    public router = Router();
    public PersonalDetailsController = new PersonalDetailsController();
  
    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.PersonalDetailsController.getPersonalDetails);
        this.router.get(`${this.path}/:id`, this.PersonalDetailsController.getPersonalDetailsById);
        this.router.post(`${this.path}`, validationMiddleware(CreatePersonalDetailsDto, 'body'), this.PersonalDetailsController.CreatePersonalDetails);
        this.router.put(`${this.path}/:id`, validationMiddleware(UpdatePersonalDetailsDto, 'body', true), this.PersonalDetailsController.updatePersonalDetails);
        this.router.delete(`${this.path}/:id`, this.PersonalDetailsController.deletePersonalDetails);
      }
    }

    export default PersonalDetailsRoute;