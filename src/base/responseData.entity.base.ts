import { Column, BaseEntity, Entity } from 'typeorm';

@Entity()
export class ResponseData extends BaseEntity {
    @Column()
    keyPrev: string

    @Column()
    data: object
    
    @Column()
    limit: number
    
    @Column()
    next: boolean
}