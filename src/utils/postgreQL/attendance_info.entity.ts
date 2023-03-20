/* eslint-disable prettier/prettier */
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany,OneToOne, ManyToOne, JoinColumn, createConnection } from 'typeorm';
import { Staff } from './staff.entity';


@Entity({ name: "AttendanceInfo" })
export class AttendanceInfo extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    Id: number;

    @Column()
    Date: Date;

    @Column('time without time zone')
    ClockIn: Date;

    @Column('time without time zone')
    ClockOut: Date;

    @ManyToOne(() => Staff, staff => staff.attendanceInfo)
    @JoinColumn({name: "StaffId"})
    staff: Staff;


}
