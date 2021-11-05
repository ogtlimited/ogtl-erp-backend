/* eslint-disable prettier/prettier */

import notificationModel from '../../models/notification/notification.model';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
const { SocketLabsClient } = require('@socketlabs/email');
import {emailTemplate} from '../email';
const redis = require('redis');
const client = redis.createClient();

class NotificationHelper {
    public modelName: any;
    public notificationModel: any;
    public status: any;

    constructor(modelName, status) {
        this.modelName = modelName;
        this.status = status;
        this.notificationModel = notificationModel;
    }

    public async exec() 
    {
        const findNotification = await this.notificationModel.findOne({ document_name: this.modelName, send_alert_on: this.status, disabled: false })
        if(findNotification){
            const subject = findNotification.subject
            const message = findNotification.message
            const receiver = findNotification.receiver_role
            this.sendEmail(subject, message, receiver)
            this.queueMessage(receiver, message, this.modelName)
        }
    }

    public queueMessage(receiver: string[], message: string, model: string)
    {
        for(let i=0; i<receiver.length; i++){
            client.exists(receiver[i], function(err, reply) {
                let obj = {}
                obj["message"] = message
                obj["module"] = model
                obj["date"] = new Date()
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
        }
    }

    private async sendEmail(subject: string, message: string, receiver: string[]){
        const email = emailTemplate(subject, message, receiver)
        const sclient = await new SocketLabsClient(parseInt(process.env.SOCKETLABS_SERVER_ID), process.env.SOCKETLABS_INJECTION_API_KEY);
         
        await sclient.send(email).then(
            (response) => {
                console.log(response)
            },
            (err) => {
                //Handle error making API call
                console.log(err);
            }
        );
    }
}

export default NotificationHelper;
