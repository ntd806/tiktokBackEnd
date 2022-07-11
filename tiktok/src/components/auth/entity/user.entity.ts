import {
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ObjectIdColumn,
    Entity
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
    @ObjectIdColumn()
    _id: number;

    @Column()
    public fullname: string;

    @Column()
    public birthdate: Date;

    @Column()
    public ip: object;

    @Column()
    public mac: object;

    @Column()
    public phone: string;

    @Column()
    public email: string;

    @Column()
    public password: string;

    @Column()
    public like: object;

    @Column()
    @CreateDateColumn()
    public createdAt: Date;

    @Column()
    @UpdateDateColumn()
    public updatedAt: Date;
}
