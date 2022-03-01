import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DateAuditEntity } from './dateAudit.entity';

@Entity('images')
export class ImagesEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  targetType: string;

  @Column({ nullable: true })
  targetId: number;

  @Column({ nullable: true })
  key: string;
}
