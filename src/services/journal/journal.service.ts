/* eslint-disable prettier/prettier */

import journalModel from '@/models/journals/journals.model';
import { CreateJournalDto } from './../../dtos/journal/journal.dto';
import { IJournal } from './../../interfaces/journal/journal.interface';
import { HttpException } from '@exceptions/HttpException';

import { isEmpty } from '@utils/util';




class JournalService {
    public JournalService = journalModel;

    /**
     *Returns all IJournal
     */
    public async findAllJournal(): Promise<IJournal[]> {
        const Journal: IJournal[] = await this.JournalService.find().populate("account");
        return Journal;
    }

    /**
     *Returns the IJournal with the Id given
     */
    public async findJournalById(JournalId:string) : Promise<IJournal>
    {
       //Check if Id is empty
       if (isEmpty(JournalId)) throw new HttpException(400, "No Id provided");

       //find IJournal with Id given
       const Journal:IJournal = await this.JournalService.findOne({ _id:JournalId  }).populate("account");;

       if(!Journal) throw new HttpException(409, "IJournal with that Id doesnt exist");

       return Journal;
    }

    /**
     *Creates a new IJournal
     */


     public async createJournal(JournalData: CreateJournalDto) : Promise<IJournal>{

        //Check if data is empty
       if (isEmpty(JournalData)) throw new HttpException(400, "No data provided");

       const Journal: IJournal = await this.JournalService.findOne({IJournal: JournalData.ref});
       if(Journal) throw new HttpException(409, `Journal with this ref ${JournalData.ref} already exists`);

       const newJournal: IJournal = await this.JournalService.create(JournalData);
       return newJournal;
     }

     /**
     *Updates existing IJournal 
     */

     public async updateJournal(JournalId:string,JournalData)  : Promise<IJournal>{

        //Check if data is empty
        if (isEmpty(JournalData)) throw new HttpException(400, "No data provided");

        const Journal: IJournal = await this.JournalService.findByIdAndUpdate(JournalId,{JournalData});
        if(!Journal) throw new HttpException(409, "IJournal doesn't exist");
         return Journal;
   }

     public async deleteJournal(JournalId:string) : Promise<IJournal>{
         const Journal : IJournal = await this.JournalService.findByIdAndDelete(JournalId);
         if(!Journal) throw new HttpException(409, "Journal doesn't exist");
         return Journal;
     }

}

export default JournalService;
