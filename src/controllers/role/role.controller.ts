/* eslint-disable prettier/prettier */

import { NextFunction, Request, Response } from 'express';
import { RoleDto, UpdateRoleDto } from '@/dtos/role/role.dto';
import { IRole } from '@/interfaces/role/role.interface';
import RoleService from '@/services/role/role.service';

class RoleController {
    public roleService;

    constructor() {
        this.roleService = new RoleService();
    }

    public getRoles = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllroles: IRole[] = await this.roleService.findAll();
            res.status(200).json({ data: findAllroles, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public getRole = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const roleId: string = req.params.roleId;
            const findrole: IRole = await this.roleService.find(roleId);
            res.status(200).json({ data: findrole, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    };

    public createRole = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const Payload: RoleDto = req.body;
            const newrole: IRole = await this.roleService.create(Payload);
            res.status(201).json({ data: newrole, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    public updateRole = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const roleId: string = req.params.roleId;
            const Payload: UpdateRoleDto = req.body;
            const updaterole: IRole = await this.roleService.update(roleId, Payload);
            res.status(200).json({ data: updaterole, message: 'updated' });
        } catch (error) {
            next(error);
        }
    };

    public deleteRole = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.roleId;
            const droprole: IRole = await this.roleService.delete(id);
            res.status(200).json({ data: droprole, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };
}

export default RoleController;