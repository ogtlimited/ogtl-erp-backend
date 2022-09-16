/* eslint-disable prettier/prettier */
import academyModel from '@models/academy/academy.model';

class AcademyService {
  public academyModel = academyModel;

  public async findAll(query): Promise<any> {
    const academyRecords = await academyModel.find(query);
    return academyRecords;
  }

//   public async findById(username: string): Promise<any>{
//     const academyRecord= await this.academyModel.findOne({ username: username });
//     if (!academyRecord) throw new HttpException(404, 'no record found');
//     return academyRecord;
//   }

  public async create(info): Promise<any> {
    // const {data} = info
    const academyRecords = [];
    const nonExistingRecords = []
    for(let idx = 0; idx < info.length; idx++){
      const record = info[idx]

    //   const academyInfo  = await academyModel.find({"record.username":{$exists:true}})
      const academyInfo  = await academyModel.findOne({username: record.username})

    //   console.log("academy info status",academyInfo)
      if(academyInfo === null){
        academyRecords.push(record)
      }
    //   if(!academyInfo){
    //     academyRecords.push(record)
    //     continue
    //   }
    }
    // console.log(nonExistingRecords);
    await academyModel.insertMany(academyRecords)
    return `${academyRecords.length} record(s) uploaded successfully`
  }
}

export default AcademyService;
