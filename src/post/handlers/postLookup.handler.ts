import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsEntity } from 'src/database/entities/posts.entity';
import { Repository } from 'typeorm';
import { PostLookupCommand } from '../command/postLookup.command';

@Injectable()
@CommandHandler(PostLookupCommand)
export class PostLookupHandler implements ICommandHandler<PostLookupCommand> {
  constructor(@InjectRepository(PostsEntity) private readonly postRepository: Repository<PostsEntity>) {}
  async execute(command: PostLookupCommand) {
    const { type, limit } = command;
    return await this.getPosts(type, limit);
  }

  private async getPosts(type: string, limit = 5): Promise<PostsEntity[]> {
    type orderByType = {
      key: string;
      value: 'ASC' | 'DESC';
    };
    let orderBy: orderByType = {
      key: 'posts.createdAt',
      value: 'ASC',
    };
    switch (type) {
      case 'open':
        orderBy.key = 'posts.createdAt';
        orderBy.value = 'DESC';
        break;
      case 'imminent':
        orderBy.key = 'posts.createdAt';
        orderBy.value = 'ASC';
        break;
      default:
        break;
    }
    return await this.postRepository
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.PostMembers', 'postMembers')
      .leftJoinAndSelect('postMembers.User', 'users')
      .leftJoinAndSelect('posts.Mountain', 'mountain')
      .leftJoinAndSelect('posts.Owner', 'owner')
      .select([
        'posts.id',
        'posts.title',
        'posts.createdAt',
        'posts.departureAt',
        'mountain.name',
        'posts.place',
        'posts.maleNumber',
        'posts.femaleNumber',
        'posts.likeCount',
        'posts.commentCount',
        'postMembers.createdAt',
        'users.id',
        'owner.id',
        'owner.firebaseId',
        'owner.gender',
      ])
      .orderBy(orderBy.key, orderBy.value)
      .limit(limit)
      .getMany();
  }
}
