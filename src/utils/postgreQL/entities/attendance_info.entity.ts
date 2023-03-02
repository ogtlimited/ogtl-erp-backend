/* eslint-disable prettier/prettier */
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, createConnection } from 'typeorm';
import { Staff } from './staff.entity';


@Entity()
export class AttendanceInfo extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    Id: number;

    @Column()
    // @IsNotEmpty()
    StaffId: string;

    @Column()
    // @IsNotEmpty()
    Date: Date;

    @Column()
    // @IsNotEmpty()
    ClockIn: Date;

    @Column()
    // @IsNotEmpty()
    ClockOut: Date;

    @OneToMany(() => Staff, staff => staff.employee)
    staff: Staff[];


}
