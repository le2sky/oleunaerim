import { PickType } from '@nestjs/swagger';
import { UsersEntity } from '../../database/entities/users.entity';

export class FindEmailDto extends PickType(UsersEntity, ['name', 'phone'] as const) {}
