import config from 'config';
import { dirname } from 'path';
import { join } from 'path';
import { dbConfig } from './db.interface';
import { ConnectionOptions } from 'typeorm';
const path = require('path')
require("dotenv").config({ path: dirname(module.paths[1]) + "/.env" });


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