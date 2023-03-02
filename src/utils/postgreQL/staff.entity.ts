/* eslint-disable prettier/prettier */
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AttendanceInfo } from './attendance_info.entity';


@Entity()
export class Staff extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    Id: number;

    @Column()
    // @IsNotEmpty()
    StaffUniqueId: string;

    @Column()
    // @IsNotEmpty()
    PictureUrl: string;

    @Column()
    // @IsNotEmpty()
    Email: string;

    @Column()
    // @IsNotEmpty()
    FullName: string;

    @Column()
    // @IsNotEmpty()
    Gender: string;

    @Column()
    // @IsNotEmpty()
    Campaign: string;

    @Column()
    // @IsNotEmpty()
    PhoneNumber: string;

    @Column()
    // @IsNotEmpty()
    DateOfBirth: Date;

    @Column()
    // @IsNotEmpty()
    MaritalStatus: string;

    @Column()
    // @IsNotEmpty()
    StateOfOrigin: string;

    @Column()
    // @IsNotEmpty()
    Role: string;

    @Column()
    // @IsNotEmpty()
    StartDate: Date;

    @Column()
    // @IsNotEmpty()
    IsActive: boolean;

    @Column()
    // @IsNotEmpty()
    ShiftEndTime: Date;

    @Column()
    // @IsNotEmpty()
    ShiftStartTime: Date;

    @ManyToOne(() => AttendanceInfo, (attendance_info) => attendance_info.StaffId)
    employee: AttendanceInfo;


}
