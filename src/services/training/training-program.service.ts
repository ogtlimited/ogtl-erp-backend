/* eslint-disable prettier/prettier */

import TrainingProgram from '@/models/training/training-program.model';
import { ITrainingProgram } from '@/interfaces/training/training-program.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { TrainingProgramDto, PutTrainingProgramDto } from '@/dtos/training/training-program.dto';

class TrainingProgramService {
    public trainingProgram: any;

    constructor() {
        this.trainingProgram = TrainingProgram;
    }

    public async findAll(): Promise<ITrainingProgram[]> {
        const tp: ITrainingProgram[] = await this.trainingProgram.find();
        return tp;
    }

    public async find(id: string): Promise<ITrainingProgram> {
        if (isEmpty(id)) throw new HttpException(400, "Missing Id Params");
        const findTrainingProgram = this.findOne(id);
        if (!findTrainingProgram) throw new HttpException(409, "Training program not found");
        return findTrainingProgram;
    }

    public async create(Payload: TrainingProgramDto): Promise<ITrainingProgram> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const newTrainingProgram: ITrainingProgram = await this.trainingProgram.create(Payload);
        return newTrainingProgram;
    }

    public async update(id: string, Payload: PutTrainingProgramDto): Promise<ITrainingProgram> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const updateTrainingProgram: ITrainingProgram = await this.trainingProgram.findByIdAndUpdate(id, { Payload }, {new: true});
        return updateTrainingProgram;
    }

    public async delete(id: string): Promise<ITrainingProgram> {
        const drop: ITrainingProgram = await this.trainingProgram.findByIdAndDelete(id);
        if (!drop) throw new HttpException(409, `${id} Training Program does not exist`);
        return drop;
    }

    private async findOne(id: string): Promise<ITrainingProgram> {
        const findTrainingProgram: ITrainingProgram = await this.trainingProgram.findOne({ _id: id });
        return findTrainingProgram;
    }
}

export default TrainingProgramService;