/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
// import {  } from '@/dtos/procurement/procurement.dto';
import { CreateProcurementDto } from '@/dtos/procurement/procurement.dto';
import { IProcurement } from '@/interfaces/procurement/procurement.interface';
import ProcurementService from '@/services/procurement/procurement.service';

class ProcurementController {
  public procurementService = new ProcurementService();
  
  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const procurementEntries = await this.procurementService.findAll(req.query);
      res.status(200).json({ data: procurementEntries});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;
      const data = await this.procurementService.findById(id);
      res.status(200).json({ data: data});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newData: CreateProcurementDto = req.body;
      const createdData: IProcurement = await this.procurementService.create(req, newData); 
      res.status(201).json({ data: createdData});
    } catch (error) {  
      console.log(error);
      next(error);
    }
  };

  public approve = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const approvedprocurement = await this.procurementService.approve(req.query, req.params.id); 
      res.status(200).json({ data: approvedprocurement});
    } catch (error) {  
      console.log(error);
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const approvedprocurement = await this.procurementService.update(req.params.id, req.body); 
      res.status(200).json({ data: approvedprocurement});
    } catch (error) {  
      console.log(error);
      next(error);
    }
  };

}

export default ProcurementController;
