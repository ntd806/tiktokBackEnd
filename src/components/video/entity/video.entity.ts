import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'videos' })
export class Video {
    @ObjectIdColumn()
    id: string;

    @Column({
        type: 'string'
    })
    name: string;

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
    time: string;

    @Column({
        type: 'string'
    })
    tag: string;

    @Column({
        type: 'date'
    })
    createdAt: any;

    @Column({
        type: 'date'
    })
    updatedAt: any;
}
