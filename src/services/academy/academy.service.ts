/* eslint-disable prettier/prettier */
import academyModel from '@models/academy/academy.model';

class AcademyService {
  public academyModel = academyModel;

  public async findAll(query): Promise<any> {
    const academyRecords = await academyModel.find(query);
    return academyRecords;
  }

  public async create(info): Promise<any> {
    const academyRecords = [];
    for(let idx = 0; idx < info.length; idx++){
      const record = info[idx]

      const academyInfo  = await academyModel.findOne({user_name: record.user_name})

      if(academyInfo === null){
        academyRecords.push(record)
      }
   
    }
    await academyModel.insertMany(academyRecords)
    return `${academyRecords.length} record(s) uploaded successfully`
  }
}

export default AcademyService;

