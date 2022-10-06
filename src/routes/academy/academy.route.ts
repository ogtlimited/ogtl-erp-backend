/* eslint-disable prettier/prettier */
import AcademyController from "@controllers/academy/academy.controller";
import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';

class AcademyRoute implements Routes {
    public path = '/api/academy';
    public router = Router();
    public AcademyController = new AcademyController();

    constructor() {
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, [authMiddleware], this.AcademyController.findAllAcademyApplicants);
        this.router.get(`${this.path}/gender`, [authMiddleware], this.AcademyController.findByGender);
        this.router.get(`${this.path}/qualification`, [authMiddleware], this.AcademyController.findByQualification);
        this.router.get(`${this.path}/stack`, [authMiddleware], this.AcademyController.findByStack);
        this.router.get(`${this.path}/mode`, [authMiddleware], this.AcademyController.findByModeOfEngagement);
        this.router.get(`${this.path}/interested_program`, [authMiddleware], this.AcademyController.findByInterestedProgram);
        this.router.get(`${this.path}/:id`, [authMiddleware], this.AcademyController.findAcademyApplicantById);
        this.router.patch(`${this.path}/update/:id`, [authMiddleware], this.AcademyController.updateAcademyApplicant);
        this.router.post(`${this.path}`,[authMiddleware], this.AcademyController.create);
        this.router.post(`${this.path}/google_form`, this.AcademyController.createFromGoogleForm);
        this.router.delete(`${this.path}/delete/:id`, authMiddleware,this.AcademyController.deleteAcademyApplicant);
    }
  }
  export default AcademyRoute;
