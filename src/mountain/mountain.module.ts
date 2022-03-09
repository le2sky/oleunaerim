import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MountainsEntity } from 'src/database/entities/mountains.entity';
import { PostsEntity } from 'src/database/entities/posts.entity';
import { MountainController } from './mountain.controller';
import { MountainHelper } from './mountain.helper';
import { MountainService } from './mountain.service';

@Module({
  imports: [TypeOrmModule.forFeature([MountainsEntity, PostsEntity])],
  providers: [MountainHelper, MountainService],
  controllers: [MountainController],
})
export class MountainModule {}
