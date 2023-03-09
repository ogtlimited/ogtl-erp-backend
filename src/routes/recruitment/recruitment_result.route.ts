/* eslint-disable prettier/prettier */

import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import RecruitmentResultController from '@/controllers/recruitment/recruitment_result.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateRecruitmentResultDto, UpdateRecruitmentResultDto } from '@/dtos/recruitment/recruitment_result.dto';
import authMiddleware from '@middlewares/auth.middleware';

class RecruitmentResultRoute implements Routes{
  public path = "/api/recruitment-result";
  public router = Router();
  public recruitmentResultController = new RecruitmentResultController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(){
    this.router.get(`${this.path}`,authMiddleware,this.recruitmentResultController.getRecruitmentResults);
    this.router.get(`${this.path}-passed`,this.recruitmentResultController.getPassedRecruitmentResults);
    this.router.get(`${this.path}/:id`,authMiddleware,this.recruitmentResultController.getRecruitmentResultById);
    this.router.post(`${this.path}`,[validationMiddleware(CreateRecruitmentResultDto,'body'),authMiddleware],this.recruitmentResultController.createRecruitmentResult);
    this.router.post(`${this.path}/bulk-upload`,authMiddleware,this.recruitmentResultController.uploadBulkRecruitmentResults);
    this.router.patch(`${this.path}/:id`, [validationMiddleware(UpdateRecruitmentResultDto, 'body'),authMiddleware], this.recruitmentResultController.updateRecruitmentResult);
    this.router.delete(`${this.path}/:id`,authMiddleware,this.recruitmentResultController.deleteRecruitmentResult);

  }
}

export default RecruitmentResultRoute;
