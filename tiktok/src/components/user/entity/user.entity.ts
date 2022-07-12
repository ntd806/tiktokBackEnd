import { Column, ObjectIdColumn, Entity } from 'typeorm';

@Entity({ name: 'user' })
export class User {
    @ObjectIdColumn()
    _id: number;

    @Column()
    fullname: string;

    @Column()
    sex: string;

    @Column()
    birthdate: Date;

    @Column()
    ip: string;

    @Column()
    mac: string;

    @Column({ unique: true })
    phone: string;

    @Column()
    like: object;
}
