// src/entities/admin.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { BaseSchema } from './base.entity';
import { Blog } from './blog.entity';
import { Project } from './project.entity';
import { Experience } from './experience.entity';
import { Skill } from './skill.entity';
import { IsString, Matches } from 'class-validator';
import { About } from './about.entity';


@Entity('admins')
export class Admin extends BaseSchema {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ unique: true, length: 63 })
    @IsString()
    @Matches(/^[a-zA-Z0-9-]{1,63}$/)
    subdomain: string;
    
    @OneToMany(() => About, (about) => about.admin)
    about: About[];
    
    @OneToOne(() => Blog, (blog) => blog.admin)
    blogs: Blog[];

    @OneToMany(() => Project, (project) => project.admin)
    projects: Project[];

    @OneToMany(() => Experience, (exp) => exp.admin)
    experiences: Experience[];

    @OneToMany(() => Skill, (skill) => skill.admin)
    skills: Skill[];

}
