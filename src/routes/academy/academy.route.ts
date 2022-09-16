/* eslint-disable prettier/prettier */
import AcademyController from "@controllers/academy/academy.controller";
import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';

class AcademyRoute implements Routes {
    public path = '/api/academy';
    public router = Router();
    public newAcademyController = new AcademyController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, [authMiddleware], this.newAcademyController.findAll);
        // this.router.get(`${this.path}/:username`,[authMiddleware], this.newAcademyController.findById);
        this.router.post(`${this.path}`,[authMiddleware], this.newAcademyController.create);
    }
  }
  export default AcademyRoute;
