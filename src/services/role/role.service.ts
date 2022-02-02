/* eslint-disable prettier/prettier */

import RoleModel from '@/models/role/role.model';
import { IRole } from '@/interfaces/role/role.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { RoleDto, UpdateRoleDto } from '@/dtos/role/role.dto';

class RoleService {
    public role: any;

    constructor() {
        this.role = RoleModel;
    }

    public async findAll(): Promise<IRole[]> {
        const roles: IRole[] = await this.role.find();
        return roles;
    }

    public async find(roleId: string): Promise<IRole> {
        if (isEmpty(roleId)) throw new HttpException(400, "Missing Id Params");
        const findrole = this.findOne(roleId);
        if (!findrole) throw new HttpException(409, "role not found");
        return findrole;
    }

    public async create(Payload: RoleDto): Promise<IRole> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const newrole: IRole = await this.role.create(Payload);
        return newrole;
    }

    public async update(roleId: string, Payload: UpdateRoleDto): Promise<IRole> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        console.log(Payload)
        const findrole = this.findOne(roleId);
        if (!findrole) throw new HttpException(409, "Project not found");
        const updaterole: IRole = await this.role.findByIdAndUpdate(roleId,  Payload , {new: true});
        return updaterole;
    }

    public async delete(roleId: string): Promise<IRole> {
        const drop: IRole = await this.role.findByIdAndDelete(roleId);
        if (!drop) throw new HttpException(409, `${roleId} Loan does not exist`);
        return drop;
    }

    private async findOne(id: string): Promise<IRole> {
        const findrole: IRole = await this.role.findOne({ _id: id });
        return findrole;
    }
}

export default RoleService;