/* eslint-disable prettier/prettier */
import { Router } from 'express';

import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateDocumentDto, UpdateDocumentDto } from '@dtos/project/document.dto';
import DocumentController from '@/controllers/project/document.controller';


class documentRoute implements Routes {
  public path = '/api/document';
  public router = Router();
  public document = new DocumentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.document.getdocuments);
    this.router.get(`${this.path}/:documentId`, this.document.getdocument);
    this.router.get(`${this.path}/campaign/:documentId`, this.document.getCampaigndocuments);
    this.router.post(`${this.path}`, validationMiddleware(CreateDocumentDto, 'body'), this.document.createdocument);
    this.router.patch(`${this.path}/:documentId`, validationMiddleware(UpdateDocumentDto, 'body'), this.document.updatedocument);
    this.router.delete(`${this.path}/:documentId`, this.document.deletedocument);
  }
}

export default documentRoute;
