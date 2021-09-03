import CombineServices from '@/services/index.service';
import { NextFunction, Request, Response } from 'express';

class IndexController {
  public indexS = new CombineServices();
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
  public createEmployeeFormSelection = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createEmployeeFormSelection = await this.indexS.createEmployeeFormSelection();

      res.status(200).json({ createEmployeeFormSelection, message: 'combined data result' });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
