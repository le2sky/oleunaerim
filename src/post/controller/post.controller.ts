import { Body, Controller, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { AuthGuard } from 'src/user/auth.guard';
import { CreatePostDto } from '../dtos/createPost.dto';
import { PostService } from '../services/post.service';

//   @UseGuards(AuthGuard)
@Controller('post')
@UseInterceptors(SuccessInterceptor)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(@Body() dto: CreatePostDto) {
    return await this.postService.createPost(dto);
  }
}
