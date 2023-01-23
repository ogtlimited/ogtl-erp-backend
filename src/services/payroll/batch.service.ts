import batchModel  from '@models/payroll/batch.model';

class BatchServices {
    public batchModel = batchModel;
    public async findAllBatches(query:any): Promise<any> {
      const batches = await this.batchModel.find(query);
      return batches;
    }

    public async findBatchById(batchId: string): Promise<any> {
        const batch = await this.batchModel.findOne({_id:batchId});
        return batch;
      }

}

export default BatchServices;