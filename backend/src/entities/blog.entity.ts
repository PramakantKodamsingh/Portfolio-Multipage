// src/entities/blog.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Admin } from './admin.entity';
import { BaseSchema } from './base.entity';

@Entity('blogs')
export class Blog extends BaseSchema {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('text')
    content: string;

    @Column({ nullable: true })
    cover_image: string;

    @Column({ nullable: true })
    blog_type: string;

    @ManyToOne(() => Admin, (admin) => admin.blogs)
    admin: Admin;
}
