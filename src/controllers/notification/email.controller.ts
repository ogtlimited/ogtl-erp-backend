/* eslint-disable prettier/prettier */

import { NextFunction, Request, Response } from 'express';
import { IEmail } from '@/interfaces/notification/email.interface';
import emailService from '@/services/notification/email.service';
import { EmailDto } from '@/dtos/notification/email.dto';

class EmailController {
    public emailService;

    constructor() {
        this.emailService = new emailService();
    }

    public getEmails = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const emailId: string = req.params.emailId;
            const findAllEmails: IEmail[] = await this.emailService.findAll(emailId);
            res.status(200).json({ data: findAllEmails, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public emailRead = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const emailId: string = req.params.emailId;
            const Payload: EmailDto = req.body;
            const updatedEmail: IEmail = await this.emailService.update(emailId, Payload);
            res.status(200).json({ data: updatedEmail, message: 'updated' });
        } catch (error) {
            next(error);
        }
    };
}

export default EmailController;
