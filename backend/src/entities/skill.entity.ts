// src/entities/skill.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Admin } from './admin.entity';
import { BaseSchema } from './base.entity';

@Entity('skills')
export class Skill extends BaseSchema {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    level: string; // e.g., Beginner, Intermediate, Advanced

    @Column({ nullable: true })
    category: string; // e.g., Frontend, Backend, DevOps

    @Column('float', { nullable: true })
    percentage: number; // e.g., 90 (%)

    @ManyToOne(() => Admin, (admin) => admin.skills, { nullable: true })
    admin: Admin;
}
