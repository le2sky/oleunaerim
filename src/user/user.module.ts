import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../database/entities/users.entity';
import { UserController } from './controller/user.controller';
import { FirebaseService } from './services/firebase.service';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UserController],
  providers: [UserService, FirebaseService],
  exports: [UserService],
})
export class UserModule {}
