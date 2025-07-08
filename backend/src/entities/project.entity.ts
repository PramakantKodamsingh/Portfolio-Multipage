import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Admin } from './admin.entity';
import { BaseSchema } from './base.entity';

@Entity('projects')
export class Project extends BaseSchema {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column({ nullable: true })
    github_link: string;

    @Column({ nullable: true })
    previewImage: string;

    @Column({ nullable: true })
    live_link: string;

    @Column('text', { array: true, nullable: true })
    tools: string[];

    @ManyToOne(() => Admin, (admin) => admin.projects)
    admin: Admin;
}
