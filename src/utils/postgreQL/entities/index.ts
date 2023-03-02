import config from 'config';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { dbConfig } from './db.interface';

const { host, user, password, database }: dbConfig = config.get('dbConfig');
const dataSource = new DataSource({
    type: 'postgres',
    port: 5432,
    host: 'localhost',
    username: 'postgres',
    password: "root",
    database: 'ogtl_attendance',
    logging: ['error'],
    entities: [join(__dirname, './**/*.entity{.ts,.js}')],
    // migrations: [join(__dirname, '../**/*.migration{.ts,.js}')],
    // subscribers: [join(__dirname, '../**/*.subscriber{.ts,.js}')],

});

export default dataSource