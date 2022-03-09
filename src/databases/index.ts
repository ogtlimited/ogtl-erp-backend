import config from 'config';
import { dbConfig } from '@interfaces/db.interface';
import { models } from 'mongoose';

const { host, port, database }: dbConfig = config.get('dbConfig');

export const dbConnection = {
  url: `mongodb://${host}:${port}/${database}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
