/* eslint-disable prettier/prettier */

import { NextFunction, Request, Response } from 'express';
import { TrainingProgramDto, PutTrainingProgramDto } from '@/dtos/training/training-program.dto';
import { ITrainingProgram } from '@/interfaces/training/training-program.interface';
import TrainingProgramService from '@/services/training/training-program.service';
import {opts} from '@/utils/rbac-opts';

const RBAC = require('easy-rbac');
const rbac = new RBAC(opts);


class TrainingProgramController {
    public trainingProgramService;

    constructor() {
        this.trainingProgramService = new TrainingProgramService();
    }

    public getTainingPrograms = async (req: Request, res: Response, next: NextFunction) => {
        let user = (<any>req).user
        rbac.can(user.role, 'post:add')
        .then(result => {
            if (result) {
                const findAllTrainingProgram: ITrainingProgram[] = this.trainingProgramService.findAll();
                res.status(200).json({ data: findAllTrainingProgram, message: 'findAll' });
            } else {
                res.status(422).json({ message: 'not permitted' });
            }
        })
        .catch(err => {
            next(err);
        })
    };

    public getTainingProgram = async (req: Request, res: Response, next: NextFunction) => {
        let user = (<any>req).user
        const trainingProgramId: string = req.params.trainingProgramId;
        const findTrainingProgram: ITrainingProgram = await this.trainingProgramService.find(trainingProgramId);
        rbac.can('hr_user', 'post:read')
        .then(result => {
            if (result) {
                res.status(200).json({ data: findTrainingProgram, message: 'findAll' });
            } else {
                res.status(200).json({ data: "Not permitted", message: 'findAll' });
            }
        })
        .catch(err => {
            next(err);
        })

    };

    public createTrainingProgram = async (req: Request, res: Response, next: NextFunction) => {
        let user = (<any>req).user
        rbac.can('hr_user', 'user:create')
        .then(result => {
            if (result) {
                const Payload: TrainingProgramDto = req.body;
                const newTrainingProgram: ITrainingProgram = this.trainingProgramService.create(Payload);
                return newTrainingProgram;
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

    public updateTrainingProgram = async (req: Request, res: Response, next: NextFunction) => {
        let user = (<any>req).user
        rbac.can('hr_manager', 'user:*')
        .then(result => {
            if (result) {
                const trainingProgramId: string = req.params.trainingProgramId;
                const Payload: PutTrainingProgramDto = req.body;
                const updateTrainingProgram: ITrainingProgram = this.trainingProgramService.update(trainingProgramId, Payload);
                return updateTrainingProgram;
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

    public deleteTrainingProgram = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.trainingProgramId;
            const dropTrainingProgram: ITrainingProgram = await this.trainingProgramService.delete(id);
            res.status(200).json({ data: dropTrainingProgram, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };
}

export default TrainingProgramController;
