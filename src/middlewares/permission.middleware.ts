/* eslint-disable prettier/prettier */
import config from 'config';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import employeeModel from '@models/employee/employee.model';
//0 - 000
//1 - 001
//2 - 010
//3 - 011
//4 - 100

// AND
// 0 & 0 = 0
// 0 & 1 = 0
// 1 & 1 = 1

// OR
// 0 | 0 = 0
// 0 | 1 = 1
// 1 | 1 = 1

// XOR
// 0 ^ 0 = 0
// 0 ^ 1 = 1
// 1 ^ 1 = 0

// console.log((2).toString(2)) // 10
// console.log((0b10).toString(10)) // 2
const READ = 1; // 001
const WRITE = 2; // 001
const UPDATE = 3; // 001
const DELETE = 4; // 001

export class userPermissions{
    permission: any;
    constructor(perm = 0){
        this.permission = perm
    }
    getAllPermissions(){
        return {
            Read: !!(this.permission & READ),
            Write: !!(this.permission & WRITE),
            Update: !!(this.permission & UPDATE),
            Delete: !!(this.permission & DELETE),
        }
    }
    addPermissions(perm){
      this.permission = this.permission | perm
    }
    removePermissions(perm){
      if(this.getAllPermissions()[perm]){
        this.permission = this.permission ^ perm
      }
    }
}


const permissionMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.header('Authorization').split('Bearer ')[1] || null;

    if (Authorization) {
      const secretKey: string = config.get('secretKey');
      const verificationResponse = (await jwt.verify(Authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse._id;
      const findUser = await employeeModel.findById(userId);
      console.log(findUser);
      const permission = new userPermissions(Number(findUser.permissionLevel)).getAllPermissions()
      if(req.method === 'get'){
        if(permission.Read === true){
          req.user = findUser;
          next();
        }else{
          next(new HttpException(401, 'You have insufficient authorization level'));
        }

      }else if(req.method === 'post'){
        if(permission.Write === true){
          req.user = findUser;
          next();
        }else{
          next(new HttpException(401, 'You have insufficient authorization level'));
        }
      }else if(req.method === 'put'){
        if(permission.Update === true){
          req.user = findUser;
          next();
        }else{
          next(new HttpException(401, 'You have insufficient authorization level'));
        }

      }else if(req.method === 'delete'){
        if(permission.Delete === true){
          req.user = findUser;
          next();
        }else{
          next(new HttpException(401, 'You have insufficient authorization level'));
        }

      }
      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default permissionMiddleware;

