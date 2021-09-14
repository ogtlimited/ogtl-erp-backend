/* eslint-disable prettier/prettier */

import TrainingResult from '@/models/training/training-result.model';
import { ITrainingResult } from '@/interfaces/training/training-result.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { TrainingResultDto, PutTrainingResultDto } from '@/dtos/training/training-result.dto';

class TrainingResultService {
    public trainingResult: any;

    constructor() {
        this.trainingResult = TrainingResult;
    }

    public async findAll(): Promise<ITrainingResult[]> {
        const trainingResult: ITrainingResult[] = await this.trainingResult.find();
        return trainingResult;
    }

    public async find(id: string): Promise<ITrainingResult> {
        if (isEmpty(id)) throw new HttpException(400, "Missing Id Params");
        const findTrainingResult = this.findOne(id);
        if (!findTrainingResult) throw new HttpException(409, "Training result not found");
        return findTrainingResult;
    }

    public async create(Payload: TrainingResultDto): Promise<ITrainingResult> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const newTrainingResult: ITrainingResult = await this.trainingResult.create(Payload);
        return newTrainingResult;
    }

    public async update(id: string, Payload: PutTrainingResultDto): Promise<ITrainingResult> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const updateTrainingResult: ITrainingResult = await this.trainingResult.findByIdAndUpdate(id, { Payload }, {new: true});
        return updateTrainingResult;
    }

    public async delete(id: string): Promise<ITrainingResult> {
        const drop: ITrainingResult = await this.trainingResult.findByIdAndDelete(id);
        if (!drop) throw new HttpException(409, `${id} Training result does not exist`);
        return drop;
    }

    private async findOne(id: string): Promise<ITrainingResult> {
        const findTrainingResult: ITrainingResult = await this.trainingResult.findOne({ _id: id });
        return findTrainingResult;
    }
}

export default TrainingResultService;