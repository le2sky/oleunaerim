import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DateAuditEntity } from './dateAudit.entity';
import { ImagesEntity } from './images.entity';
import { PostsEntity } from './posts.entity';

@Entity('mountains')
export class MountainsEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  url: string;

  @Column()
  lat: number;

  @Column()
  lon: number;

  @Column('int', { name: 'imageId', nullable: true })
  imageId: number | null;

  @OneToMany(() => PostsEntity, (post) => post.Mountain, { nullable: true })
  post: PostsEntity;

  @OneToOne(() => ImagesEntity, (image) => image.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'imageId' })
  mountainImage: ImagesEntity;
}
