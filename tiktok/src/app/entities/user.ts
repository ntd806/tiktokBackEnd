import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn
} from 'typeorm';

export default class User {
    @PrimaryGeneratedColumn()
    public id: string;

    @Column()
    public name: string;

    @Column()
    public ip: string;

    @Column()
    @CreateDateColumn()
    public createdAt: Date;

    @Column()
    @UpdateDateColumn()
    public updatedAt: Date;
}