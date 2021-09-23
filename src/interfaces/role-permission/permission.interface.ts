/* eslint-disable prettier/prettier */
export interface IRoleAndPermission {
  _id: string;
  role: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}
