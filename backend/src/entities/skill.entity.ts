// src/entities/skill.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Admin } from './admin.entity';
import { BaseSchema } from './base.entity';

@Entity('skills')
export class Skill extends BaseSchema {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    level: string; // e.g., Beginner, Intermediate, Advanced

    @Column({ nullable: true })
    category: string; // e.g., Frontend, Backend, DevOps

    @Column({ nullable: true })
    icon: string; // icon URL or class name if using icons

    @ManyToOne(() => Admin, (admin) => admin.skills, { nullable: true })
    admin: Admin;
}
