import { IsBoolean, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, isValidationOptions } from 'class-validator';
import {
  Unique,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { CommentsEntity } from './comments.entity';
import { DateAuditEntity } from './dateAudit.entity';
import { FeedsEntity } from './feeds.entity';
import { ImagesEntity } from './images.entity';
import { LikesEntity } from './likes.entity';
import { PostMembers } from './postMembers.entity';
import { PostsEntity } from './posts.entity';

@Entity('users')
export class UsersEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @Column({ type: 'varchar', length: 100 })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar', length: 20 })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Column({ type: 'varchar', length: 100 })
  gender: 'male' | 'female';

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 100 })
  phone: string;

  @IsNotEmpty()
  @IsBoolean()
  @Column({ type: 'boolean' })
  privacy: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Column({ type: 'boolean' })
  term: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Column({ type: 'boolean' })
  marketing: boolean;

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 300, unique: true })
  firebaseId: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  nickName: string;

  @Column({ type: 'integer', default: 0 })
  loginFailCount: number;

  @OneToOne((type) => ImagesEntity, (image) => image.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'imageId' })
  profile: ImagesEntity;

  @OneToMany(() => CommentsEntity, (comment) => comment.user)
  comments: CommentsEntity[];

  @OneToMany(() => LikesEntity, (like) => like.user)
  likes: LikesEntity[];

  @OneToMany(() => FeedsEntity, (feed) => feed.user)
  feeds: FeedsEntity[];

  @OneToMany(() => PostMembers, (postMembers) => postMembers.User)
  PostMembers: PostMembers[];

  @OneToMany(() => PostsEntity, (posts) => posts.Owner)
  OwnedPosts: PostsEntity[];
}
