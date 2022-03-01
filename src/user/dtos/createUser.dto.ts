import { PickType } from '@nestjs/swagger';
import { UsersEntity } from '../../database/entities/users.entity';

export class CreateUserDto extends PickType(UsersEntity, [
  'email',
  'name',
  'firebaseId',
  'phone',
  'gender',
  'privacy',
  'term',
  'marketing',
] as const) {}
