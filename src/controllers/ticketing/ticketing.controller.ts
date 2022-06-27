/* eslint-disable prettier/prettier */
 import { NextFunction, Request, Response } from 'express';
import TicketingService from '@services/ticketing/ticketing.service';
import { ITicketing } from '@interfaces/ticketing/ticketing.interface';
import { CreateTicketingDto, UpdateTicketingDto } from '@dtos/ticketing/ticketing.dto';

class TicketingController {
  public ticketingService = new TicketingService();
   //Method for returning all ticketings
  public getTicketings = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const findAllTickets: ITicketing[] = await this.ticketingService.findAllTicketings();
      res.status(200).json({data:findAllTickets, totalTicketings: findAllTickets.length, message:"All ticketings"})
    }catch (error) {
      next(error)
    }
  }
  //Method for returning a single ticketings
  public getTicketingsById = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const ticketingId:string = req.params.id;
      const findTicketings:ITicketing = await this.ticketingService.findTicketingById(ticketingId);
      res.status(200).json({data:findTicketings, message:"Ticketing found successfully"})
    }
    catch (error) {
      next(error)
    }
  }

 public getTicketingsByEmployeeId = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const employeeId:string = req.params.employeeId;
      const findTicketings:ITicketing[] = await this.ticketingService.findTicketingByEmployeeId(employeeId);
      res.status(200).json({data:findTicketings, message:"Ticketing found successfully"})
    }
    catch (error) {
      next(error)
    }
  }
public getTicketingsByDepartmentId = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const department:string = req.params.departmentId;
      const findTicketings:ITicketing[] = await this.ticketingService.findTicketingByDepartmentId(department);
      res.status(200).json({data:findTicketings, message:"Ticketing found successfully"})
    }
    catch (error) {
      next(error)
    }
  }

  //Method for creating ticketings
  public createTicketings = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const ticketsData:CreateTicketingDto = req.body;
      const createTicketingsData: ITicketing = await this.ticketingService.createTicketing(ticketsData);

      res.status(201).json({ data: createTicketingsData, message: 'Ticketing created.' });
    }
    catch (error) {
      next(error)
    }
  }

  //Method for updating ticketings
  public updateTicketings = async (req:Request, res:Response, next:NextFunction) =>{
    try {
      const ticketingId:string = req.params.id;
      const ticketsData:UpdateTicketingDto = req.body;
      const updateTicketingsData: ITicketing = await this.ticketingService.updateTicketing(ticketingId,ticketsData);
      res.status(200).json({ data: updateTicketingsData, message: 'Ticketing updated.' });
    }
    catch (error) {
      next(error)
    }
  }

  //Method for deleting ticketings
  public deleteTicketings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ticketingId:string = req.params.id;
      const deleteTicketings = await this.ticketingService.deleteTicketing(ticketingId);

      res.status(200).json({ data: deleteTicketings, message: 'Ticketing deleted' });
    } catch (error) {
      next(error);
    }
  };

}

export default TicketingController;
