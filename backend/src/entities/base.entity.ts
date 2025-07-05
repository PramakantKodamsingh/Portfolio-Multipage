import {
    CreateDateColumn,
    UpdateDateColumn,
    Column,
} from 'typeorm';

export abstract class BaseSchema {

    @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @Column({ default: true })
    is_active: boolean;

    @Column({ default: false })
    is_delete: boolean;
}
