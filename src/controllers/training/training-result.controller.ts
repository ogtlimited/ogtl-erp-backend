/* eslint-disable prettier/prettier */

import { NextFunction, Request, Response } from 'express';
import { TrainingResultDto, PutTrainingResultDto } from '@/dtos/training/training-result.dto';
import { ITrainingResult} from '@/interfaces/training/training-result.interface';
import TrainingResultService from '@/services/training/training-result.service';
import {opts} from '@/utils/rbac-opts';

const RBAC = require('easy-rbac');
const rbac = new RBAC(opts);


class TrainingResultController {
    public trainingResultService;

    constructor() {
        this.trainingResultService = new TrainingResultService();
    }

    public getTainingResults = async (req: Request, res: Response, next: NextFunction) => {
        let user = (<any>req).user
        rbac.can(user.role, 'post:add')
        .then(result => {
            if (result) {
                const findAllTrainingResult: ITrainingResult[] = this.trainingResultService.findAll();
                res.status(200).json({ data: findAllTrainingResult, message: 'findAll' });
            } else {
                res.status(422).json({ message: 'not permitted' });
            }
        })
        .catch(err => {
            next(err);
        })
    };

    public getTainingResult = async (req: Request, res: Response, next: NextFunction) => {
        let user = (<any>req).user
        const trainingResultId: string = req.params.trainingResultId;
        const findTrainingResult: ITrainingResult = await this.trainingResultService.find(trainingResultId);
        rbac.can('hr_user', 'post:read')
        .then(result => {
            if (result) {
                res.status(200).json({ data: findTrainingResult, message: 'findAll' });
            } else {
                res.status(200).json({ data: "Not permitted", message: 'findAll' });
            }
        })
        .catch(err => {
            next(err);
        })

    };

    public createTrainingResult= async (req: Request, res: Response, next: NextFunction) => {
        let user = (<any>req).user
        rbac.can('hr_user', 'user:create')
        .then(result => {
            if (result) {
                const Payload: TrainingResultDto = req.body;
                const newTrainingResult: ITrainingResult = this.trainingResultService.create(Payload);
                return newTrainingResult;
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

    public updateTrainingResult= async (req: Request, res: Response, next: NextFunction) => {
        let user = (<any>req).user
        const trainingResultId: string = req.params.trainingResultId;
        rbac.can('hr_manager', 'user:*')
        .then(result => {
            if (result) {
                const Payload: PutTrainingResultDto = req.body;
                const updateTrainingResult: ITrainingResult = this.trainingResultService.update(trainingResultId, Payload);
                return updateTrainingResult;
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

    public deleteTrainingResult = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.trainingEventId;
            const dropTrainingResult: ITrainingResult = await this.trainingResultService.delete(id);
            res.status(200).json({ data: dropTrainingResult, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };
}

export default TrainingResultController;
