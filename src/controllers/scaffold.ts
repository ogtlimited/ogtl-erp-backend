/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { DTO } from '@dtos';
import { INTERFACE } from '@/interfaces';
import SERVICE from '@/services';

// import mongoose from 'mongoose'

class CONTROLLER {
  public INJECTIONSERVICE = new SERVICE();
  
  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ALL = await this.INJECTIONSERVICE.findAll();
      res.status(200).json({ data: ALL});
    } catch (error) {
      next(error);
    }
  };

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data = await this.INJECTIONSERVICE.findById(id);
      res.status(200).json({ data: data});
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newData: DTO = req.body;
      const createdData: INTERFACE = await this.INJECTIONSERVICE.create(newData); 
      res.status(201).json({ data: createdData});
    } catch (error) {
      
      next(error);
    }
  };
}

export default CONTROLLER;
