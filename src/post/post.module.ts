import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsEntity } from 'src/database/entities/posts.entity';
import { UserModule } from 'src/user/user.module';
import { PostController } from './controller/post.controller';
import { PostService } from './services/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostsEntity]), UserModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
