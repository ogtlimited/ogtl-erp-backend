/* eslint-disable prettier/prettier */
import { CreatNotesDto } from '../../dtos/payroll/notes.dto';
import NotesController from '@/controllers/payroll/notes.controller';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class NotesRoute implements Routes {
    public path = '/api/notes';
    public router = Router();
    public notesController = new NotesController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.notesController.findAll);
        this.router.get(`${this.path}/:id`, this.notesController.findById);
        this.router.post(`${this.path}`, validationMiddleware(CreatNotesDto, 'body'), this.notesController.create);
        // this.router.patch(`${this.path}`, validationMiddleware(DTO, 'body'), this.notesController.createIncentive);
    }
  }
  export default NotesRoute;