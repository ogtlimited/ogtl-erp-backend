/* eslint-disable prettier/prettier */

import { NextFunction, Request, Response } from 'express';
import { TrainingAttendanceDto, PutTrainingAttendanceDto } from '@/dtos/training/training-attendance.dto';
import { ITrainingAttendance } from '@/interfaces/training/training-attendance.interface';
import TrainingAttendanceService from '@/services/training/training-attendance.service';
import {opts} from '@/utils/rbac-opts';

const RBAC = require('easy-rbac');
const rbac = new RBAC(opts);


class TrainingAttendanceController {
    public trainingAttendanceService;

    constructor() {
        this.trainingAttendanceService = new TrainingAttendanceService();
    }

    public getTainingAttendances = async (req: Request, res: Response, next: NextFunction) => {
        let user = (<any>req).user
        rbac.can(user.role, 'post:add')
        .then(result => {
            if (result) {
                const findAllTrainingAttendance: ITrainingAttendance[] = this.trainingAttendanceService.findAll();
                res.status(200).json({ data: findAllTrainingAttendance, message: 'findAll' });
            } else {
                res.status(422).json({ message: 'not permitted' });
            }
        })
        .catch(err => {
            next(err);
        })
    };

    public getTainingAttendance = async (req: Request, res: Response, next: NextFunction) => {
        let user = (<any>req).user
        const trainingAttendanceId: string = req.params.trainingAttendanceId;
        const findTrainingAttendance: ITrainingAttendance = await this.trainingAttendanceService.find(trainingAttendanceId);
        rbac.can('hr_user', 'post:read')
        .then(result => {
            if (result) {
                res.status(200).json({ data: findTrainingAttendance, message: 'findAll' });
            } else {
                res.status(200).json({ data: "Not permitted", message: 'findAll' });
            }
        })
        .catch(err => {
            next(err);
        })

    };

    public createTrainingAttendance= async (req: Request, res: Response, next: NextFunction) => {
        let user = (<any>req).user
        rbac.can('hr_user', 'user:create')
        .then(result => {
            if (result) {
                const Payload: TrainingAttendanceDto = req.body;
                const newTrainingAttendance: ITrainingAttendance = this.trainingAttendanceService.create(Payload);
                return newTrainingAttendance;
            } else {
                res.status(200).json({ data: "Not permitted", message: 'findAll' });
            }
        })
        .then(data => {
            res.status(201).json({ data: data, message: 'created' })
        })
        .catch(err => {
            next(err);
        })
    };

    public updateTrainingAttendance= async (req: Request, res: Response, next: NextFunction) => {
        let user = (<any>req).user
        const trainingAttendanceId: string = req.params.trainingProgramId;
        const findTrainingAttendance: ITrainingAttendance = await this.trainingAttendanceService.find(trainingAttendanceId);

        rbac.can('hr_manager', 'user:*')
        .then(result => {
            if (result) {
                const trainingAttendanceId: string = req.params.trainingAttendanceId;
                const Payload: PutTrainingAttendanceDto = req.body;
                const updateTrainingAtendance: ITrainingAttendance = this.trainingAttendanceService.update(trainingAttendanceId, Payload);
                return updateTrainingAtendance;
            } else {
                res.status(200).json({ data: "Not permitted", message: 'findAll' });
            }
        })
        .then(data => {
            res.status(200).json({ data: data, message: 'updated' });
        })
        .catch(err => {
            next(err);
        })
    };

    public deleteTrainingAttendance = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.trainingAttendanceId;
            const dropTrainingAttendance: ITrainingAttendance = await this.trainingAttendanceService.delete(id);
            res.status(200).json({ data: dropTrainingAttendance, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };
}

export default TrainingAttendanceController;
