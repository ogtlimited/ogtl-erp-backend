/* eslint-disable prettier/prettier */
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany,OneToOne, ManyToOne, JoinColumn, createConnection } from 'typeorm';
import { ShiftTime } from './shift_time.entity';
import { Staff } from './staff.entity';


@Entity({ name: "AttendanceInfo" })
export class AttendanceInfo extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    Id: string;

    @Column()
    Date: Date;

    @Column('time without time zone')
    ClockIn: Date;

    @Column('time without time zone')
    ClockOut: Date;

    @Column()
    Status: number;

    @ManyToOne(() => Staff, staff => staff.attendanceInfo)
    @JoinColumn({name: "StaffId"})
    staff: Staff;
   
    @OneToOne(() => ShiftTime)
    @JoinColumn({name: "StaffId"})
    shifttime: ShiftTime;


}
