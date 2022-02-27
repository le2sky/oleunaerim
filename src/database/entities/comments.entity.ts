import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DateAuditEntity } from './dateAudit.entity';
import { UsersEntity } from './users.entity';

@Entity('comments')
export class CommentsEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @Column()
  targetId: number;

  @Column()
  targetType: string;

  @Column({
    default: 0,
  })
  likeCount: number;

  @ManyToOne(() => UsersEntity, (user) => user.comments)
  @JoinColumn({ name: 'userId' })
  user: UsersEntity;
}
