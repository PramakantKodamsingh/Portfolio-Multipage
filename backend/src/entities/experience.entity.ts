// src/entities/experience.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Admin } from './admin.entity';
import { BaseSchema } from './base.entity';

@Entity('experiences')
export class Experience extends BaseSchema {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    company: string;

    @Column()
    position: string;

    @Column()
    start_date: Date;

    @Column({ nullable: true })
    end_date: Date;

    @Column('text', { nullable: true })
    description: string;

    @ManyToOne(() => Admin, (admin) => admin.experiences)
    admin: Admin;
}
