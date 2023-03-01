/* eslint-disable prettier/prettier */
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { AttendanceInfo } from './attendance_info.entity';


@Entity()
export class Staff extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  // @IsNotEmpty()
  ogid: string;

  @Column()
  // @IsNotEmpty()
  image: string;

  @Column()
  // @IsNotEmpty()
  default_shift: string;
  
  @Column()
  // @IsNotEmpty()
  company_email: string;
  
  @Column()
  // @IsNotEmpty()
  department: string;
  
  @Column()
  // @IsNotEmpty()
  designation: string;
  
  @Column()
  // @IsNotEmpty()
  reports_to: string;
  
  @Column()
  // @IsNotEmpty()
  first_name: string;
  
  @Column()
  // @IsNotEmpty()
  last_name: string;
  
  @Column()
  // @IsNotEmpty()
  middle_name: string;
  
  @Column()
  // @IsNotEmpty()
  gender: string;
  
  @Column()
  // @IsNotEmpty()
  projectId: string;
  
  @Column()
  // @IsNotEmpty()
  PhoneNumber: string;

  @Column()
  // @IsNotEmpty()
  DateOfBirth: string;

  @Column()
  // @IsNotEmpty()
  MaritalStatus: string;

  @Column()
  // @IsNotEmpty()
  StateOfOrigin: string;

  @Column()
  // @IsNotEmpty()
  Role: string;


  @ManyToOne(() => OfficerEntity, (officer) => officer.commandAccessIds)
  @JoinColumn()
  officerId: OfficerEntity;


}
