import { PickType } from '@nestjs/swagger';
import { PostsEntity } from 'src/database/entities/posts.entity';

export class CreatePostDto extends PickType(PostsEntity, [
  'title',
  'ownerId',
  'mountainId',
  'description',
  'place',
  'maleNumber',
  'femaleNumber',
  'cost',
  'costDescription',
  'departureAt',
]) {}
