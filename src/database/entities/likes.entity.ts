import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DateAuditEntity } from './dateAudit.entity';
import { UsersEntity } from './users.entity';

@Entity('likes')
export class LikesEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  targetType: 'POST' | 'FEED' | 'COMMENT';

  @Column()
  targetId: number;

  @ManyToOne(() => UsersEntity, (user) => user.likes)
  @JoinColumn({ name: 'userId' })
  user: UsersEntity;
}
