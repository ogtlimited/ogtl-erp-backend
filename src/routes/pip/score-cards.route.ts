import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateScoreCardDto, UpdateScoreCardDto } from '@/dtos/pip/score-cards.dto';
import scoreCardController from '@/controllers/pip/score-cards.controller';

class scoreCardRoute implements Routes{
    public path = "/scoreCard";
    public router = Router();
    public scoreCardController = new scoreCardController();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.get(`${this.path}`, this.scoreCardController.getScoreCards);
        this.router.get(`${this.path}/:id`, this.scoreCardController.getScoreCardById);
        this.router.post(`${this.path}`, validationMiddleware(CreateScoreCardDto, 'body'), this.scoreCardController.createScoreCard);
        this.router.put(`${this.path}/:id`, validationMiddleware(UpdateScoreCardDto, 'body', true), this.scoreCardController.updateScoreCard);
        this.router.delete(`${this.path}/:id`, this.scoreCardController.deleteScoreCard);
    }
}

export default scoreCardRoute;