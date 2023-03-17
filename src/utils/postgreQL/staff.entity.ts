/* eslint-disable prettier/prettier */
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { AttendanceInfo } from './attendance_info.entity';


@Entity({name: "Staff"})
export class Staff extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    Id: number;

    @Column()
    StaffUniqueId: string;

    @Column()
    PictureUrl: string;

    @Column()
    Email: string;

    @Column()
    FullName: string;

    @Column()
    Gender: string;

    @Column()
    Campaign: string;

    @Column()
    PhoneNumber: string;

    @Column()
    DateOfBirth: Date;

    @Column()
    MaritalStatus: string;

    @Column()
    StateOfOrigin: string;

    @Column()
    Role: string;

    @Column()
    StartDate: Date;

    @Column()
    IsActive: boolean;

    @Column('time without time zone')
    ShiftEndTime: Date;

    @Column('time without time zone')
    ShiftStartTime: Date;

    @OneToMany(() => AttendanceInfo, attendanceInfo => attendanceInfo.staff)
    attendanceInfo: AttendanceInfo[];


}
