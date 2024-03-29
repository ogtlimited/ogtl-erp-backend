/* eslint-disable prettier/prettier */
import config from 'config';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import employeeModel from '@models/employee/employee.model';


const repSieversPermissionMiddleware = () => {
  return  async (req: RequestWithUser, res: Response, next: NextFunction) =>{
      try {
        const Authorization = req.header('Authorization').split('Bearer ')[1] || null;
        if (Authorization) {
          const secretKey: string = config.get('secretKey');
          const verificationResponse = (await jwt.verify(Authorization, secretKey)) as DataStoredInToken;
          const userId = verificationResponse._id;
          const findUser = await (await employeeModel.findById(userId).populate('department designation')).toObject();
          if(findUser.isRepSiever){
            next();
          }else{
              next(new HttpException(403, 'this route is only accesible to Rep Sievers'))
            }
            
          }else {
          next(new HttpException(404, 'Authentication token missing'));
        }
      } catch (error) {
        next(new HttpException(403, 'Wrong authentication token'));
      }

  }
};

export default repSieversPermissionMiddleware;

