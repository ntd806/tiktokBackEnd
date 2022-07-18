import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'movies' })
export class Movies {
    @ObjectIdColumn()
    id: number;

    @Column({
        type: 'string'
    })
    description: string;

    @Column({
        type: 'string'
    })
    url: string;

    @Column({
        type: 'string'
    })
    name: string;

    @Column({
        type: 'string'
    })
    time: string;
}
