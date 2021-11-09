/* eslint-disable prettier/prettier */

import notificationModel from '../../models/notification/notification.model';
import Email from '@/models/notification/email.model';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
const { SocketLabsClient } = require('@socketlabs/email');
import {emailTemplate} from '../email';
import server  from '../../server'
const socketio = require('socket.io');
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
      const io = socketio(server, {
        cors: {
          origin: '*',
        }
      });
        // const io = socketio(server);
        io.on('connection', socket => {
            socket.emit("messages", data)
        })
    }


    public queueMessage(receiver: string[], message: string, model: string, subject: string, sender: string)
    {
        for(let i=0; i<receiver.length; i++){
            let obj = {}
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
            this.emitEvent(JSON.stringify(obj))
            this.persistEmail(subject, message, receiver[i], model, sender)

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
