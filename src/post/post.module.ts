import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostMembers } from 'src/database/entities/postMembers.entity';
import { PostsEntity } from 'src/database/entities/posts.entity';
import { UserModule } from 'src/user/user.module';
import { PostController } from './controller/post.controller';
import { PostService } from './services/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostsEntity, PostMembers]), UserModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
