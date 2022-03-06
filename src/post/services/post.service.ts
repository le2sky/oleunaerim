import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostMembers } from 'src/database/entities/postMembers.entity';
import { PostsEntity } from 'src/database/entities/posts.entity';
import { UserService } from 'src/user/services/user.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/createPost.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostsEntity) private readonly postRepository: Repository<PostsEntity>,
    @InjectRepository(PostMembers) private readonly postMemeberRepository: Repository<PostMembers>,
    private readonly userService: UserService,
  ) {}
  async create(dto: CreatePostDto): Promise<PostsEntity> {
    const { departureAt } = dto;

    const now = new Date();
    const deadline = new Date(departureAt);
    if (deadline < now) {
      throw new BadRequestException('현재 시점보다 미래의 시간을 지정해야 합니다.');
    }

    const user = await this.userService.findOne({ id: dto.ownerId });
    return await this.postRepository.save(dto);
  }

  async join(postId: number, userId: number): Promise<PostMembers> {
    const post = await this.postRepository.findOne({ id: postId });
    if (!post) {
      throw new NotFoundException('존재하지 않는 모임입니다.');
    }
    const { PostMembers: members } = post;

    const isMember = members.filter((member) => member.id === userId);
    if (isMember) {
      throw new UnprocessableEntityException('이미 가입한 모임입니다.');
    }

    const postMember = this.postMemeberRepository.create();
    postMember.PostId = postId;
    postMember.UserId = userId;

    return await this.postMemeberRepository.save(postMember);
  }

  public async delete(postId: number, ownerId: number): Promise<void> {
    const post = await this.postRepository.findOne({
      where: { id: postId, ownerId: ownerId },
    });
    await this.postRepository.remove(post);
  }
}
