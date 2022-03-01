import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
  Index,
  OneToOne,
} from 'typeorm';
import { MountainsEntity } from './mountains.entity';
import { DateAuditEntity } from './dateAudit.entity';
import { ImagesEntity } from './images.entity';
import { PostMembers } from './postMembers.entity';
import { UsersEntity } from './users.entity';

@Index('ownerId', ['ownerId'], {})
@Entity('posts')
export class PostsEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 100 })
  place: string;

  @Column({ type: 'integer', default: 0 })
  maleNumber: number;

  @Column({ type: 'integer', default: 0 })
  femaleNumber: number;

  @Column({ type: 'integer', default: 0 })
  cost: number;

  @Column({ type: 'text' })
  costDescription: string;

  @Column({ default: 0 })
  viewCount: number;

  @Column({ default: 0 })
  commentCount: number;

  @Column({ default: 0 })
  likeCount: number;

  @Column({ type: 'date' })
  departureAt: string;

  @Column({ type: 'varchar', default: 'visible' })
  visible: 'visible' | 'unvisible';

  @Column('int', { name: 'lastCommentUserId', nullable: true })
  lastCommentUserId: number | null;

  @Column('text', { name: 'lastCommentUserBody', nullable: true })
  lastCommentUserBody: string | null;

  @Column('int', { name: 'ownerId', nullable: true })
  ownerId: number | null;

  @Column('int', { name: 'mountainId', nullable: true })
  mountainId: number | null;

  @Column('int', { name: 'imageId', nullable: true })
  imageId: number | null;

  @OneToMany(() => PostMembers, (postMembers) => postMembers.Post, {
    cascade: ['insert'],
  })
  PostMembers: PostMembers[];

  @ManyToOne(() => UsersEntity, (users) => users.PostMembers, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'ownerId', referencedColumnName: 'id' }])
  Owner: UsersEntity;

  @ManyToOne(() => MountainsEntity, (mountain) => mountain.post, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'mountainId' })
  Mountain: MountainsEntity;

  @OneToOne(() => ImagesEntity, (image) => image.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'imageId' })
  background: ImagesEntity;
}
