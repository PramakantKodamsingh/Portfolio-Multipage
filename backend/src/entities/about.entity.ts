// src/entities/about.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseSchema } from './base.entity';
import { Admin } from './admin.entity';

@Entity('about')
export class About extends BaseSchema {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    phone: string;
  
    @Column()
    githubId: string;
    
    @Column({nullable: true})
    linkedinId: string;

    @Column({ nullable: true })
    resume: string;

    @Column({ nullable: true })
    profilePicture: string;

    @Column('text', { nullable: true })
    description: string;

    @Column({ nullable: true })
    designation: string;

    @OneToOne(() => Admin, (admin) => admin.about, { onDelete: 'CASCADE' })
    @JoinColumn()
    admin: Admin;
}
