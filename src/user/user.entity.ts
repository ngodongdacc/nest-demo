import { PrimaryColumn, Column, BaseEntity } from 'typeorm';

export class User extends BaseEntity {
    @PrimaryColumn()
    id: number

    @Column()
    name: string

    @Column()
    username: string
    
    @Column()
    password: string
}