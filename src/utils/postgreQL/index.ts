import config from 'config';
import { join } from 'path';
import { dbConfig } from './db.interface';
import { ConnectionOptions } from 'typeorm';


export const dbConnection: ConnectionOptions = {
    type: 'postgres',
    port: 5432,
    host: 'postgrest-test.cyf3kadl3aci.eu-west-2.rds.amazonaws.com',
    username: 'postgres',
    password: "qiyAj3wUj3NtWgaeON6M",
    database: 'ogtl_attendance',
    logging: ['error'],
    entities: [join(__dirname, '/../**/*.entity{.ts,.js}')]
};