/* eslint-disable prettier/prettier */

import { NextFunction, Request, Response } from 'express';

import { IIdRequest } from '@/interfaces/procurement/idrequest.interface';

import { CreateIdRequestDto, UpdateIdRequestDto } from '@/dtos/procurement/idrequest.dto';

import IdRequestService from '@/services/procurement/idrequest.service';

class IdRequestController {
  public idRequestService = new IdRequestService();

  public getIdRequests = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllIdRequestsData: IIdRequest[] = await this.idRequestService.findAllIdRequest();

      res.status(200).json({ data: findAllIdRequestsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getIdRequestById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const IdRequestId: string = req.params.id;
      const findOneIdRequestData: IIdRequest = await this.idRequestService.findIdRequestById(IdRequestId);

      res.status(200).json({ data: findOneIdRequestData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createIdRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const IdRequestData: CreateIdRequestDto = req.body;
      const createIdRequestData: IIdRequest = await this.idRequestService.createIdRequest(IdRequestData);

      res.status(201).json({ data: createIdRequestData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateIdRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const IdRequestId: string = req.params.id;
      const IdRequestData: UpdateIdRequestDto = req.body;
      const updateIdRequestData: IIdRequest = await this.idRequestService.updateIdRequest(IdRequestId, IdRequestData);

      res.status(200).json({ data: updateIdRequestData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteIdRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const IdRequestId: string = req.params.id;
      const deleteIdRequestData: IIdRequest = await this.idRequestService.deleteIdRequest(IdRequestId);

      res.status(200).json({ data: deleteIdRequestData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default IdRequestController;
