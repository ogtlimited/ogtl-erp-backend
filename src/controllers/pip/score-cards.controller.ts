/* eslint-disable prettier/prettier */
import scoreCardService from "@/services/pip/score-cards.service";
import { NextFunction, Request, Response } from 'express';
import { IScoreCard } from "@/interfaces/pip-interface/score-cards.interface";
import { CreateScoreCardDto, UpdateScoreCardDto } from "@/dtos/pip/score-cards.dto";

class scoreCardController {
    public scoreCardService = new scoreCardService();

    //method for returning scores card
    public  getScoreCards = async (req:Request, res:Response, next:NextFunction) =>{
        try {
            const findAllScoreCard: IScoreCard[] = await this.scoreCardService.findAllScoreCards();
            res.status(200).json({data:findAllScoreCard, totalScoreCard: findAllScoreCard.length, message:"All score cards"})
          }catch (error) {
            next(error)
          }

    }


    //method to return one score card

    public getScoreCardById = async (req:Request, res:Response, next:NextFunction) =>{
       try{
            const scoreCardId:string = req.body.id;
            const findScoreCard:IScoreCard = await this.scoreCardService.findScoreCardById(scoreCardId);
            res.status(200).json({data:findScoreCard, message:"Score card found successfully"})
       }
       catch(error){
           next(error)
       }

    }

    public createScoreCard = async (req:Request, res:Response, next:NextFunction) =>{
        try{
            const ScoreCardData:CreateScoreCardDto = req.body;
            const createScoreCardData: IScoreCard = await this.scoreCardService.createScoreCard(ScoreCardData);
            res.status(201).json({ data: createScoreCardData, message: 'score card created.' });
        }
        catch(error){
            next(error)
        }
 
     }


     public updateScoreCard = async (req:Request, res:Response, next:NextFunction) =>{
        try{
            const ScoreCardId: string = req.params.id;
            const ScoreCardData: UpdateScoreCardDto = req.body;
            const updateScoreCardData: IScoreCard = await this.scoreCardService.updateScoreCard(ScoreCardId,ScoreCardData);
            res.status(200).json({data:updateScoreCardData, message:"ScoreCard Updated"});
        }
        catch(error){
            next(error)
        }
 
     }

     public deleteScoreCard = async (req:Request, res:Response, next:NextFunction) =>{
        try{
            const ScoreCardId: string = req.params.id;
            const deleteScoreCardData: IScoreCard = await this.scoreCardService.deleteScoreCard(ScoreCardId);
            res.status(200).json({data:deleteScoreCardData, message:"ScoreCard Deleted"});
 
        }
        catch(error){
            next(error)
        }
 
     }
}

export default scoreCardController;