import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import WarningLetterController from '@controllers/pip/warningLetter.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateWarningLetterDto } from '@dtos/pip/warning_letter.dto';

class WarningLetterRoute implements Routes{
  public path = "/warningLetter";
  public router = Router();
  public warningLetterController = new WarningLetterController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(){
    this.router.get(`${this.path}`,this.warningLetterController.getWarningLetters);
    this.router.get(`${this.path}/:id`,this.warningLetterController.getWarningLetterById);
    this.router.post(`${this.path}`,validationMiddleware(CreateWarningLetterDto,'body'),this.warningLetterController.createWarningLetter);
    this.router.delete(`${this.path}/:id`,this.warningLetterController.deleteWarningLetter);

  }
}
export default WarningLetterRoute;
