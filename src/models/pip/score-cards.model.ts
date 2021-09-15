/* eslint-disable prettier/prettier */
import { Document, model, Schema } from 'mongoose';
import { IScoreCard } from '@/interfaces/pip-interface/score-cards.interface';


const scoreCardSchema: Schema = new Schema({
    employee_id:{
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    performance_score:{
        type: String,
        required : true
    },

    company_values_score:{
        type: String,
        required : true
    }


},
{
    timestamps: true,
  },

)

const scoreCardModel = model<IScoreCard & Document>('scoreCard',scoreCardSchema);
export default scoreCardModel;