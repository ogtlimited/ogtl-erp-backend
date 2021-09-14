/* eslint-disable prettier/prettier */

import TrainingAttendance from '@/models/training/training-attendance.model';
import { ITrainingAttendance } from '@/interfaces/training/training-attendance.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { TrainingAttendanceDto, PutTrainingAttendanceDto } from '@/dtos/training/training-attendance.dto';

class TrainingAttendanceService {
    public trainingAttendance: any;

    constructor() {
        this.trainingAttendance = TrainingAttendance;
    }

    public async findAll(): Promise<ITrainingAttendance[]> {
        const trainingAttendance: ITrainingAttendance[] = await this.trainingAttendance.find();
        return trainingAttendance;
    }

    public async find(id: string): Promise<ITrainingAttendance> {
        if (isEmpty(id)) throw new HttpException(400, "Missing Id Params");
        const findTrainingAttendance = this.findOne(id);
        if (!findTrainingAttendance) throw new HttpException(409, "Training attendance not found");
        return findTrainingAttendance;
    }

    public async create(Payload: TrainingAttendanceDto): Promise<ITrainingAttendance> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const newTrainingAttendance: ITrainingAttendance = await this.trainingAttendance.create(Payload);
        return newTrainingAttendance;
    }

    public async update(id: string, Payload: PutTrainingAttendanceDto): Promise<ITrainingAttendance> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const updateTrainingAttendance: ITrainingAttendance = await this.trainingAttendance.findByIdAndUpdate(id, { Payload }, {new: true});
        return updateTrainingAttendance;
    }

    public async delete(id: string): Promise<ITrainingAttendance> {
        const drop: ITrainingAttendance = await this.trainingAttendance.findByIdAndDelete(id);
        if (!drop) throw new HttpException(409, `${id} Training attendance does not exist`);
        return drop;
    }

    private async findOne(id: string): Promise<ITrainingAttendance> {
        const findTrainingAttendance: ITrainingAttendance = await this.trainingAttendance.findOne({ _id: id });
        return findTrainingAttendance;
    }
}

export default TrainingAttendanceService;