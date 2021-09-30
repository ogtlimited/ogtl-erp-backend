/* eslint-disable prettier/prettier */
export interface INotification {
    document_name: string;
    subject: string;
    send_alert_on: string;
    sender: string;
    receiver_role: string;
    disabled: boolean;
    message: string;
}