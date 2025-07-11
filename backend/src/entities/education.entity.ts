import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Admin } from './admin.entity';
import { BaseSchema } from './base.entity';

@Entity('educations')
export class Education extends BaseSchema {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    institution: string;

    @Column()
    degree: string;

    @Column({ nullable: true })
    fieldOfStudy: string;

    @Column({ type: 'date', nullable: true })
    startDate: Date;

    @Column({ type: 'date', nullable: true })
    endDate: Date;

    @Column({ nullable: true })
    grade: string; // For GPA (e.g., 3.9/4.0 or 9.1/10)

    @Column({ type: 'float', nullable: true })
    percentage: number; // For schools or boards that use % scoring

    @Column({ nullable: true })
    honors: string; // e.g., Magna Cum Laude, Distinction

    @Column({ type: 'text', nullable: true })
    description: string;

    @ManyToOne(() => Admin, (admin) => admin.educations, { onDelete: 'CASCADE' })
    admin: Admin;
}
