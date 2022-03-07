import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MountainsEntity } from 'src/database/entities/mountains.entity';
import { PostMembers } from 'src/database/entities/postMembers.entity';
import { PostsEntity } from 'src/database/entities/posts.entity';
import { UserModule } from 'src/user/user.module';
import { PostController } from './controller/post.controller';
import { PostService } from './services/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostsEntity, PostMembers, MountainsEntity]), UserModule, CqrsModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
