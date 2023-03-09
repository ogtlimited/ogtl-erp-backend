import config from 'config';
import { join } from 'path';
import { dbConfig } from './db.interface';
import { Staff } from './staff.entity';
import { AttendanceInfo } from './attendance_info.entity';  
import { ConnectionOptions } from 'typeorm';


export const dbConnection: ConnectionOptions = {
    type: 'postgres',
    port: 5432,
    host: 'localhost',
    username: 'postgres',
    password: "root",
    database: 'ogtl_attendance',
    logging: ['error'],
    entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
    // migrations: [join(__dirname, '../**/*.migration{.ts,.js}')],
    // subscribers: [join(__dirname, '../**/*.subscriber{.ts,.js}')],

};

// export default dataSource