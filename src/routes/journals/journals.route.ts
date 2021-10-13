/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

import authMiddleware from '@middlewares/auth.middleware';
import { CreateJournalDto } from './../../dtos/journal/journal.dto';


import JournalController from '@/controllers/journals/journal.controller';


class JournalRoute implements Routes {
    public path = '/Journal';
    public router = Router();
    public JournalController = new JournalController();
  
    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`,authMiddleware, this.JournalController.getJournals);
        this.router.get(`${this.path}/:id`,authMiddleware, this.JournalController.getJournalById);
        this.router.post(`${this.path}` , authMiddleware, validationMiddleware(CreateJournalDto, 'body'), this.JournalController.CreateJournal);
        //this.router.put(`${this.path}/:id`,authMiddleware, validationMiddleware(UpdateJournalDto, 'body', true), this.JournalController.updateJournal);
        this.router.delete(`${this.path}/:id`,authMiddleware, this.JournalController.deleteJournal);
      }
    }

    export default JournalRoute;