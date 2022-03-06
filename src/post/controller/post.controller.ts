import { Body, Controller, Param, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { AuthGuard } from 'src/user/auth.guard';
import { CreatePostDto } from '../dtos/createPost.dto';
import { PostService } from '../services/post.service';

//   @UseGuards(AuthGuard)
@Controller('posts')
@UseInterceptors(SuccessInterceptor)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(@Body() dto: CreatePostDto) {
    return await this.postService.createPost(dto);
  }

  @Post(':id/join')
  async joinPost(@Param('id') postId: number, @Body('userId') userId: number) {
    return await this.postService.joinPost(postId, userId);
  }
}
