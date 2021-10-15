/* eslint-disable prettier/prettier */
import { CreateJournalDto } from '@/dtos/journal/journal.dto';
import { IJournal } from '@/interfaces/journal/journal.interface';
import JournalService from '@/services/journal/journal.service';
import { NextFunction, Request, Response } from 'express';


class JournalController {
  public JournalService = new JournalService();

  //Returns all Journals
  public getJournals = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllJournalsData: IJournal[] = await this.JournalService.findAllJournal();

      res.status(200).json({ data: findAllJournalsData, numJournals: findAllJournalsData.length, message: 'All Journals' });
    } catch (error) {
      next(error);
    }
  };

  //creates Journal
  public CreateJournal = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const JournalData: CreateJournalDto = req.body;
      const createJournalData: IJournal = await this.JournalService.createJournal(JournalData);
      res.status(201).json({ data: createJournalData, message: 'Journal succesfully created' });
    } catch (error) {
      next(error);
    }
  };

  //gets one Journal with Id given
  public getJournalById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const JournalId: string = req.params.id;
      const findOneJournalData: IJournal = await this.JournalService.findJournalById(JournalId);
      res.status(200).json({ data: findOneJournalData, message: 'All Journals' });
    } catch (error) {
      next(error);
    }
  };

  //update Journal
  public updateJournal = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const JournalId: string = req.params.id;
      const JournalData = req.body;
      const updateJournalData: IJournal = await this.JournalService.updateJournal(JournalId, JournalData);
      res.status(200).json({ data: updateJournalData, message: 'Journal Updated' });
    } catch (error) {
      next(error);
    }
  };
  //deletes Journal
  public deleteJournal = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const JournalId: string = req.params.id;
      const deleteJournalData: IJournal = await this.JournalService.deleteJournal(JournalId);
      res.status(200).json({ data: deleteJournalData, message: 'Journal Deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default JournalController;
