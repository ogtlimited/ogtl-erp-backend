/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreatNotesDto } from '@dtos/payroll/notes.dto';
import NotesService from '@/services/payroll/notes.service';


class NotesController {
  public notesService = new NotesService();
  
  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notess = await this.notesService.findAll();
      res.status(200).json({ data: notess});
    } catch (error) {
      next(error);
    }
  };

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data = await this.notesService.findById(id);
      res.status(200).json({ data: data});
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newData: CreatNotesDto = req.body;
      const createdData = await this.notesService.create(newData); 
      res.status(201).json({ data: createdData});
    } catch (error) {
      next(error);
    }
  };
}

export default NotesController;
