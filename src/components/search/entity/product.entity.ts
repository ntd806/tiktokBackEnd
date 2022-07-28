import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
    @ObjectIdColumn()
    id: number;

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
    preview: string;

    @Column({
        type: 'string'
    })
    tag: string;

    @Column({
        type: 'number'
    })
    time: number;
}
