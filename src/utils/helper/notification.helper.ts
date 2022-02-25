/* eslint-disable prettier/prettier */
import  Email  from '@models/notification/email.model';

import notificationModel from '../../models/notification/notification.model';
import {emailTemplate} from '../email';
const { Socket } = require("@/utils/socket");
const redis = require('redis');
const client = redis.createClient();

class NotificationHelper {
    public modelName: any;
    public notificationModel: any;
    public status: any;
    public email: any

    constructor(modelName, status) {
        this.modelName = modelName;
        this.status = status;
        this.notificationModel = notificationModel;
        this.email = Email;
    }

    public async exec()
    {
        const findNotification = await this.notificationModel.findOne({ document_name: this.modelName, send_alert_on: this.status, disabled: false })
        if(findNotification){
            const subject = findNotification.subject
            const message = findNotification.message
            const receiver = findNotification.receiver_role
            const sender = findNotification.sender
            this.sendEmail(subject, message, receiver)
            this.queueMessage(receiver, message, this.modelName, subject,sender)
        }
    }

    public emitEvent(data)
    {
        Socket.emit("messages", [data])
    }


    public queueMessage(receiver: string[], message: string, model: string, subject: string, sender: string)
    {
        const obj = {}
        for(let i=0; i<receiver.length; i++){
            obj["message"] = message
            obj["module"] = model
            obj["date"] = new Date()
            client.exists(receiver[i], function(err, reply) {

                if (reply === 1) {
                    client.lpush(receiver[i], JSON.stringify(obj), (err, reply) => {
                        console.log(reply)

                    })
                } else {
                    client.lpush(receiver[i], [JSON.stringify(obj)], (err, reply) => {
                        console.log(reply)
                    })
                }
            });
            this.persistEmail(subject, message, receiver[i], model, sender)

        }
        this.emitEvent(JSON.stringify(obj))
    }

    private async sendEmail(subject: string, message: string, receiver: string[]){
        const email = emailTemplate(subject, message, receiver)
        
        const mailgun = require('mailgun-js') ({apiKey:process.env.MAIL_GUN_KEY, domain:process.env.MAIL_GUN_DOMAIN});

        mailgun.messages().send(email, (error, body) => {
            if(error) console.log(error)
            else console.log(body);
        });

    }

    private async persistEmail(subject: string, message: string, receiver: string, module: string, sender: string){
        const Payload = {
            message: message,
            subject: subject,
            email_id: receiver,
            model_name: module,
            sender: sender
        }
        this.email.create(Payload);
    }
}

export default NotificationHelper;
