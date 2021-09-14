/* eslint-disable prettier/prettier */

import TrainingEvent from '@/models/training/training-event.model';
import { ITrainingEvent } from '@/interfaces/training/training-event.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { TrainingEventDto, PutTrainingEventDto } from '@/dtos/training/training-event.dto';

class TrainingEventService {
    public trainingEvent: any;

    constructor() {
        this.trainingEvent = TrainingEvent;
    }

    public async findAll(): Promise<ITrainingEvent[]> {
        const trainingEvent: ITrainingEvent[] = await this.trainingEvent.find();
        return trainingEvent;
    }

    public async find(id: string): Promise<ITrainingEvent> {
        if (isEmpty(id)) throw new HttpException(400, "Missing Id Params");
        const findTrainingEvent = this.findOne(id);
        if (!findTrainingEvent) throw new HttpException(409, "Training event not found");
        return findTrainingEvent;
    }

    public async create(Payload: TrainingEventDto): Promise<ITrainingEvent> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const newTrainingEvent: ITrainingEvent = await this.trainingEvent.create(Payload);
        return newTrainingEvent;
    }

    public async update(id: string, Payload: PutTrainingEventDto): Promise<ITrainingEvent> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const updateTrainingEvent: ITrainingEvent = await this.trainingEvent.findByIdAndUpdate(id, { Payload }, {new: true});
        return updateTrainingEvent;
    }

    public async delete(id: string): Promise<ITrainingEvent> {
        const drop: ITrainingEvent = await this.trainingEvent.findByIdAndDelete(id);
        if (!drop) throw new HttpException(409, `${id} Training event does not exist`);
        return drop;
    }

    private async findOne(id: string): Promise<ITrainingEvent> {
        const findTrainingEvent: ITrainingEvent = await this.trainingEvent.findOne({ _id: id });
        return findTrainingEvent;
    }
}

export default TrainingEventService;