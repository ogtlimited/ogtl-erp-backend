/* eslint-disable prettier/prettier */
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateScoreCardDto, UpdateScoreCardDto } from '@/dtos/pip/score-cards.dto';
import scoreCardController from '@/controllers/pip/score-cards.controller';
import authMiddleware from '@/middlewares/auth.middleware';

class scoreCardRoute implements Routes{
    public path = "/scoreCard";
    public router = Router();
    public scoreCardController = new scoreCardController();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.get(`${this.path}`,authMiddleware, this.scoreCardController.getScoreCards);
        this.router.get(`${this.path}/:id`, authMiddleware,this.scoreCardController.getScoreCardById);
        this.router.post(`${this.path}`, authMiddleware,validationMiddleware(CreateScoreCardDto, 'body'), this.scoreCardController.createScoreCard);
        this.router.put(`${this.path}/:id`,authMiddleware, validationMiddleware(UpdateScoreCardDto, 'body', true), this.scoreCardController.updateScoreCard);
        this.router.delete(`${this.path}/:id`,authMiddleware, this.scoreCardController.deleteScoreCard);
    }
}

export default scoreCardRoute;