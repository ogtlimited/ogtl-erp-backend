
/* eslint-disable prettier/prettier */
import { Document, model, Schema } from 'mongoose';
import { IRoleAndPermission } from '@interfaces/role-permission/permission.interface';

const rolePermissionSchema: Schema = new Schema(
  {
    role:{
      type:String,
      required:true
    },
    create:{
      type: Boolean,
    },
    read:{
      type: Boolean,
    },
    update:{
      type: Boolean,
    },
    delete:{
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
)

const rolePermissionModel = model<IRoleAndPermission & Document>('RolePermission',rolePermissionSchema);
export default rolePermissionModel;
