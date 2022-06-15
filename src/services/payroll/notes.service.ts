/* eslint-disable prettier/prettier */
import { CreatNotesDto } from '@dtos/payroll/notes.dto';
import { HttpException } from '@exceptions/HttpException';
import NotesModel  from '@models/payroll/notes.model';
import { isEmpty } from '@utils/util';
// import omit from 'lodash/omit'

class NotesService {
  public notesModel = NotesModel;

  public async findAll() {
    const results = await this.notesModel.find().populate('employeeId');
    return results;
  }

  public async findById(id: string){
    if (isEmpty(id)) throw new HttpException(400, "provide Id");
    const notes = await this.notesModel.findOne({ _id: id });
    if (!notes) throw new HttpException(404, "no record found");
    return notes;
  }

  public async create(data: CreatNotesDto){
    if (isEmpty(data)) throw new HttpException(400, "Bad request");
    const createdata = await this.notesModel.create(data);
    return createdata;
  }

}

export default NotesService;
