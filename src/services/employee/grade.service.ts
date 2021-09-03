/* eslint-disable prettier/prettier */
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Grade } from '@/interfaces/employee-interface/grade.interface';
import { CreateGradeDto,UpdateGradeDto } from '@/dtos/employee/grade.dto';
import GradeModel from '@/models/employee/grade.model';


class GradeService {
  public Grades = GradeModel;

  /**
   * Returns all Grades
   */

  public async findAllGrades(): Promise<Grade[]> {
    const Grades: Grade[] = await this.Grades.find();
    return Grades;
  }

  /**
   * Returns Grades with the Id given
   */

  public async findGradeById(GradeId: string): Promise<Grade> {
    //Check if Id is empty
    if (isEmpty(GradeId)) throw new HttpException(400, 'No Id provided');

    //find Grade with Id given
    const findGrade: Grade = await this.Grades.findOne({ _id: GradeId });

    if (!findGrade) throw new HttpException(409, 'Grade with that Id doesnt exist');

    return findGrade;

   
    }


    /**
     *Creates a new Grade 
     */


     public async createGrade(GradeData: CreateGradeDto) : Promise<Grade>{
        
        //Check if data is empty
       if (isEmpty(GradeData)) throw new HttpException(400, "No data provided");

       const findGrade: Grade = await this.Grades.findOne({grade: GradeData.grade});
       if(findGrade) throw new HttpException(409, `Grade ${GradeData.grade} already exists`);

       const createGradeData: Grade = await this.Grades.create({GradeData});
       return createGradeData;
     }


      /**
     *Updates existing Grade 
     */

     public async updateGrade(GradeId:string,GradeData: UpdateGradeDto)  : Promise<Grade>{

        //Check if data is empty
        if (isEmpty(GradeData)) throw new HttpException(400, "No data provided");

        const updateGradeById: Grade = await this.Grades.findByIdAndUpdate(GradeId,{GradeData});
        if(!updateGradeById) throw new HttpException(409, "Grade doesn't exist");
         return updateGradeById;
   } 



     //deletes exisiting Grade
     public async deleteGrade(GradeId:string) : Promise<Grade>{
        const deleteGradeById : Grade = await this.Grades.findByIdAndDelete(GradeId);
        if(!deleteGradeById) throw new HttpException(409, "Grade doesn't exist");
        return deleteGradeById;
    }






}
export default GradeService;