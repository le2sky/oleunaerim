import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MountainsEntity } from 'src/database/entities/mountains.entity';
import { MountainHelper } from './mountain.helper';

@Module({
  imports: [TypeOrmModule.forFeature([MountainsEntity])],
  providers: [MountainHelper],
})
export class MountainModule {}
