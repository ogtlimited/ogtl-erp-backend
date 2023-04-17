/* eslint-disable prettier/prettier */
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { Staff } from './staff.entity';

@Entity({ name: "ShiftTime" })
export class ShiftTime extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    Id: number;

    @Column()
    StaffId: string;

    @Column()
    DayOfTheWeek: number;

    @Column()
    StartTime: string;

    @Column()
    EndTime: string;


    @ManyToOne(() => Staff, staff => staff.shifttime)
    @JoinColumn({ name: "StaffId" })
    staff: Staff;
}
