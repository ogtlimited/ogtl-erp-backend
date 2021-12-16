/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateRoleAssignmentDto, UpdateRoleAssignmentDto } from '@/dtos/role/role-assignment.dto';
import { roleAssignment } from '@/interfaces/role/role-assignment.interface';
import RoleService from '@/services/role/role-assignment.service';


class RoleAssignmentController {
  public RoleService = new RoleService();

  //Returns all Roles
  public getRoleAssignment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllRolesData: roleAssignment[] = await this.RoleService.findAllRoleAssignment();

      res.status(200).json({ data: findAllRolesData, numRoles: findAllRolesData.length, message: 'All Roles Assignment' });
    } catch (error) {
      next(error);
    }
  };

  //creates Role
  public CreateRoleAssignment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const RoleData: CreateRoleAssignmentDto = req.body;
      const createRoleData: roleAssignment = await this.RoleService.createRoleAssignment(RoleData);
      res.status(201).json({ data: createRoleData, message: 'Role Assignment successfully created' });
    } catch (error) {
      next(error);
    }
  };

  //gets one Role with Id given
  public getRoleAssignmentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const RoleId: string = req.params.id;
      const findOneRoleData: roleAssignment = await this.RoleService.findRoleAssignmentById(RoleId);
      res.status(200).json({ data: findOneRoleData, message: 'All Roles Assignment' });
    } catch (error) {
      next(error);
    }
  };

  //update Role
  public updateRoleAssignment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const RoleId: string = req.params.id;
      const RoleData: UpdateRoleAssignmentDto = req.body;
      const updateRoleData: roleAssignment = await this.RoleService.updateRoleAssignment(RoleId, RoleData);
      res.status(200).json({ data: updateRoleData, message: 'Role Assignment Updated' });
    } catch (error) {
      next(error);
    }
  };
  //deletes Role
  public deleteRoleAssignment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const RoleId: string = req.params.id;
      const deleteRoleData: roleAssignment = await this.RoleService.deleteRoleAssignment(RoleId);
      res.status(200).json({ data: deleteRoleData, message: 'Role Assignment Deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default RoleAssignmentController;