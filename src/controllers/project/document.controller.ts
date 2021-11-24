/* eslint-disable prettier/prettier */

import { NextFunction, Request, Response } from 'express';
import { CreateDocumentDto, UpdateDocumentDto } from '@/dtos/project/document.dto';
import { IDocument } from '@/interfaces/project-interface/document.interface';
import DocumentService from '@/services/project/document.service';
import {opts} from '@/utils/rbac-opts';

const RBAC = require('easy-rbac');
const rbac = new RBAC(opts);
class DocumentController {
    public documentService;

    constructor() {
        this.documentService = new DocumentService();
    }

    public getdocuments = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAlldocuments: IDocument[] = this.documentService.findAll();
            res.status(200).json({ data: findAlldocuments, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public getCampaigndocuments = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const documentId: any = {project_id: req.params.documentId};
            const findAlldocuments: IDocument[] = await this.documentService.findAll(documentId);
            res.status(200).json({ data: findAlldocuments, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public getdocument = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const documentId: string = req.params.documentId;
            const finddocument: IDocument = await this.documentService.find(documentId);
            res.status(200).json({ data: finddocument, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    };

    public createdocument = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const Payload: CreateDocumentDto = req.body;
            const newdocument: IDocument = await this.documentService.create(Payload, req);
            res.status(200).json({ data: newdocument, message: 'created' });
        } catch (error) {
            next(error);
        }
           
    };

    public updatedocument = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const documentId: string = req.params.documentId;
            const finddocument: IDocument = await this.documentService.find(documentId);
            const Payload: UpdateDocumentDto = req.body;
            const updatedocument: IDocument = await this.documentService.update(documentId, Payload);
            res.status(200).json({ data: updatedocument});
          } catch (error) {  
            console.log(error);
            next(error);
          }
        
            
    };

    public deletedocument = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.documentId;
            const dropdocument: IDocument = await this.documentService.delete(id);
            res.status(200).json({ data: dropdocument, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };
}

export default DocumentController;