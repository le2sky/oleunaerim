import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DateAuditEntity } from './dateAudit.entity';
import { UsersEntity } from './users.entity';

@Entity('feeds')
export class FeedsEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @Column({
    default: 0,
  })
  commentCount: number;

  @Column({
    default: 0,
  })
  likeCount: number;

  @ManyToOne(() => UsersEntity, (user) => user.feeds)
  @JoinColumn({ name: 'userId' })
  user: UsersEntity;
}
