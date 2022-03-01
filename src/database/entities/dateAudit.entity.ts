import {
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  DeleteDateColumn,
} from 'typeorm';

export abstract class DateAuditEntity extends BaseEntity {
  @CreateDateColumn({ name: 'createdAt' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt: string;
}
