import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn, Index } from 'typeorm';
import { DateAuditEntity } from './dateAudit.entity';
import { PostsEntity } from './posts.entity';
import { UsersEntity } from './users.entity';

@Index('UserId', ['UserId'], {})
@Entity('postMembers')
export class PostMembers extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { primary: true, name: 'postId' })
  PostId: number;

  @Column('int', { primary: true, name: 'userId' })
  UserId: number;

  @ManyToOne(() => PostsEntity, (posts) => posts.PostMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'postId', referencedColumnName: 'id' }])
  Post: PostsEntity;

  @ManyToOne(() => UsersEntity, (users) => users.PostMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  User: UsersEntity;
}
