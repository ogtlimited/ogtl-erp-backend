import config from 'config';
import { join } from 'path';
import { dbConfig } from './db.interface';
import { Staff } from './staff.entity';
import { AttendanceInfo } from './attendance_info.entity';  
import { ConnectionOptions } from 'typeorm';


export const dbConnection: ConnectionOptions = {
    type: 'postgres',
    port: 5432,
    host: process.env.POSTGRES_HOST,
    username: 'postgres',
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    logging: ['error'],
    entities: [join(__dirname, '/../**/*.entity{.ts,.js}')]
};