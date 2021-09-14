import { IScoreCard } from "@/interfaces/pip-interface/score-cards.interface";
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import scoreCardModel from "@/models/pip/score-cards.model";
import { CreateScoreCardDto, UpdateScoreCardDto } from "@/dtos/pip/score-cards.dto";

class scoreCardService{
   public scoreCard = scoreCardModel;

   //Method for getting all score cards
   public async findAllScoreCards(): Promise<IScoreCard[]>{
       return this.scoreCard.find().populate('employee_id');
   }

   //finds one score card
   public async findScoreCardById(ScoreCardId:string): Promise<IScoreCard>{
       //checks if 
       if(isEmpty(ScoreCardId)) throw new HttpException(400,`No Id provided`);
       //finds scorecard with Id given
       const findScoreCard:IScoreCard = await this.scoreCard.findOne({_id:ScoreCardId}).populate('employee_id');
       if(!findScoreCard) throw new HttpException(409,`Score Card with ID:${ScoreCardId} does not exist.`);

       //return score card
       return findScoreCard;

   }

   //Creates score card

    public async createScoreCard(scoreCardData:CreateScoreCardDto) : Promise<IScoreCard>{
       //Check if data is empty
       if (isEmpty(scoreCardData)) throw new HttpException(400, "No data provided");

       const createscoreCardData: IScoreCard = await this.scoreCard.create(scoreCardData);
       return createscoreCardData;

    }

    public async updateScoreCard(scoreCardId:string,scoreCardData:UpdateScoreCardDto) : Promise<IScoreCard>{
         //Check if data is empty
        if (isEmpty(scoreCardData)) throw new HttpException(400, "No data provided");
        const updateScoreCardById: IScoreCard = await this.scoreCard.findByIdAndUpdate(scoreCardId,{scoreCardData});
        if(!updateScoreCardById) throw new HttpException(409,"Score Card does not exist");
        return updateScoreCardById;
    }


    public async deleteScoreCard(ScoreCardId:string): Promise<IScoreCard>{
        //checks if 
        const deleteScoreCardById: IScoreCard = await this.scoreCard.findByIdAndDelete(ScoreCardId);
        if(!deleteScoreCardById) throw new HttpException(409,"Score Card does not exist");
         return deleteScoreCardById;
    }



}

export default scoreCardService;
