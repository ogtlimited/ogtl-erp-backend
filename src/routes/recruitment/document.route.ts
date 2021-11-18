/* eslint-disable prettier/prettier */
import { Router } from 'express';

import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateDocumentDto, UpdateDocumentDto } from '@dtos/recruitment/document.dto';
import DocumentController from '@/controllers/recruitment/document.controller';


class JobDocumentRoute implements Routes {
  public path = '/api/job-document';
  public router = Router();
  public document = new DocumentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.document.getdocuments);
    this.router.get(`${this.path}/:documentId`, this.document.getdocument);
    this.router.get(`${this.path}/application/:documentId`, this.document.getJobdocuments);
    this.router.post(`${this.path}`, validationMiddleware(CreateDocumentDto, 'body'), this.document.createdocument);
    this.router.patch(`${this.path}/:documentId`, validationMiddleware(UpdateDocumentDto, 'body'), this.document.updatedocument);
    this.router.delete(`${this.path}/:documentId`, this.document.deletedocument);
  }
}

export default JobDocumentRoute;
