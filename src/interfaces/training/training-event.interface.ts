export interface ITrainingEvent {
    event_name:string;
    event_type:string;
    training_program_id: string;
    level: string;
    event_status: string;
    company_id: string;
    trainer_name: string;
    trainer_email: string;
    description: string;
    has_certificate: boolean;
    course: string;
    start_time: Date;
    end_time: Date;
    introduction: string;
}