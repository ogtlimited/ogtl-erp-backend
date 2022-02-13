/* eslint-disable prettier/prettier */

import emailModel from '@/models/notification/email.model';
import { IEmail } from '@/interfaces/notification/email.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { EmailDto } from '@/dtos/notification/email.dto';

class EmailService {
    public emailModel: any;

    constructor() {
        this.emailModel = emailModel;
    }

    public async findAll(emailId: string): Promise<IEmail[]> {
        const emails: IEmail[] = await this.emailModel.find({email_id: emailId});
        return emails;
    }

    public async update(emailId: string, Payload: EmailDto): Promise<IEmail> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const findEmail = this.findOne(emailId);
        if (!findEmail) throw new HttpException(409, "notification not found");
        const updatedEmail: IEmail = await this.emailModel.findByIdAndUpdate(emailId, {$set: { is_read: Payload.is_read } }, {new: true});
        return updatedEmail;
    }

    public async findOne(email_id: string): Promise<IEmail> {
        const findEmail: IEmail = await this.emailModel.findOne({ _id: email_id });
        return findEmail;
    }
    public async findOneAndDelete(email_id: string): Promise<IEmail> {
        const findEmail: IEmail = await this.emailModel.findByIdAndDelete({ _id: email_id });
        return findEmail;
    }
}

export default EmailService;
