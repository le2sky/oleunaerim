import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsEntity } from 'src/database/entities/posts.entity';
import { UserService } from 'src/user/services/user.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/createPost.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostsEntity) private readonly postRepository: Repository<PostsEntity>,
    private readonly userService: UserService,
  ) {}
  async createPost(dto: CreatePostDto): Promise<PostsEntity> {
    const user = await this.userService.findOne({ id: dto.ownerId });
    return await this.postRepository.save(dto);
  }
}
