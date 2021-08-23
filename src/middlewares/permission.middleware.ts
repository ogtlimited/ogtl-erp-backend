/* eslint-disable prettier/prettier */
import config from 'config';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import userModel from '@models/users.model';
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
      this.permission = this.permission | perm
    }
}


const permissionMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || req.header('Authorization').split('Bearer ')[1] || null;

    if (Authorization) {
      const secretKey: string = config.get('secretKey');
      const verificationResponse = (await jwt.verify(Authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse._id;
      const findUser = await userModel.findById(userId);
      if(req.method === 'get'){
        const permission = new userPermissions(findUser.permissionLevel)

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

export default authMiddleware;

