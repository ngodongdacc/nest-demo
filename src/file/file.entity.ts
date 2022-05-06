import { PrimaryGeneratedColumn, BaseEntity, Column, Entity } from 'typeorm';

@Entity()
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  name: string;

  @Column()
  LastModified: string;

  @Column()
  ETag: string;
  
  // @Column()
  // ChecksumAlgorithm: object;
  
  @Column()
  StorageClass: string;

  @Column()
  Size: number;
}