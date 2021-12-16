/* eslint-disable prettier/prettier */
import { Router } from 'express';

import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { RoleDto, UpdateRoleDto } from '@dtos/role/role.dto';
import RoleController from '@/controllers/role/role.controller';


class RoleRoute implements Routes {
  public path = '/api/role';
  public router = Router();
  public role = new RoleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.role.getRoles);
    this.router.get(`${this.path}/:roleId`, this.role.getRole);
    this.router.post(`${this.path}`, this.role.createRole);
    this.router.put(`${this.path}/:roleId`,  this.role.updateRole);
    this.router.delete(`${this.path}/:roleId`, this.role.deleteRole);
  }
}

export default RoleRoute;
