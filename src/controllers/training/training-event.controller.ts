/* eslint-disable prettier/prettier */

import { NextFunction, Request, Response } from 'express';
import { TrainingEventDto, PutTrainingEventDto } from '@/dtos/training/training-event.dto';
import { ITrainingEvent } from '@/interfaces/training/training-event.interface';
import TrainingEventService from '@/services/training/training-event.service';
import {opts} from '@/utils/rbac-opts';

const RBAC = require('easy-rbac');
const rbac = new RBAC(opts);


class TrainingEventController {
    public trainingEventService;

    constructor() {
        this.trainingEventService = new TrainingEventService();
    }

    public getTainingEvents = async (req: Request, res: Response, next: NextFunction) => {
        let user = (<any>req).user
        rbac.can(user.role, 'post:add')
        .then(result => {
            if (result) {
                const findAllTrainingEvent: ITrainingEvent[] = this.trainingEventService.findAll();
                res.status(200).json({ data: findAllTrainingEvent, message: 'findAll' });
            } else {
                res.status(422).json({ message: 'not permitted' });
            }
        })
        .catch(err => {
            next(err);
        })
    };

    public getTainingEvent = async (req: Request, res: Response, next: NextFunction) => {
        let user = (<any>req).user
        const trainingEventId: string = req.params.trainingEventId;
        const findTrainingEvent: ITrainingEvent = await this.trainingEventService.find(trainingEventId);
        rbac.can('hr_user', 'post:read')
        .then(result => {
            if (result) {
                res.status(200).json({ data: findTrainingEvent, message: 'findAll' });
            } else {
                res.status(200).json({ data: "Not permitted", message: 'findAll' });
            }
        })
        .catch(err => {
            next(err);
        })

    };

    public createTrainingEvent= async (req: Request, res: Response, next: NextFunction) => {
        let user = (<any>req).user
        rbac.can('hr_user', 'user:create')
        .then(result => {
            if (result) {
                const Payload: TrainingEventDto = req.body;
                const newTrainingEvent: ITrainingEvent = this.trainingEventService.create(Payload);
                return newTrainingEvent;
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

    public updateTrainingEvent= async (req: Request, res: Response, next: NextFunction) => {
        let user = (<any>req).user
        const trainingEventId: string = req.params.trainingEventId;
        rbac.can('hr_manager', 'user:*')
        .then(result => {
            if (result) {
                const Payload: PutTrainingEventDto = req.body;
                const updateTrainingEvent: ITrainingEvent = this.trainingEventService.update(trainingEventId, Payload);
                return updateTrainingEvent;
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

    public deleteTrainingEvent = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.trainingEventId;
            const dropTrainingEvent: ITrainingEvent = await this.trainingEventService.delete(id);
            res.status(200).json({ data: dropTrainingEvent, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };
}

export default TrainingEventController;
