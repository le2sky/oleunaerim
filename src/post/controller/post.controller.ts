import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { AuthGuard } from 'src/user/auth.guard';
import { PostLookupCommand } from '../command/postLookup.command';
import { CreatePostDto } from '../dtos/createPost.dto';
import { PostService } from '../services/post.service';

export interface ILookupQueryOption {
  type: 'open' | 'normal' | 'imminent';
  limit: number | 'all';
}

//   @UseGuards(AuthGuard)
@Controller('posts')
@UseInterceptors(SuccessInterceptor)
export class PostController {
  constructor(private readonly postService: PostService, private readonly commandBus: CommandBus) {}

  @Get()
  async lookup(@Query() query: ILookupQueryOption) {
    const command = new PostLookupCommand(query);
    return await this.commandBus.execute(command);
  }

  @Post()
  async create(@Body() dto: CreatePostDto) {
    return await this.postService.create(dto);
  }

  @Post(':id/join')
  async join(@Param('id') postId: number, @Body('userId') userId: number) {
    return await this.postService.join(postId, userId);
  }

  @Delete(':id')
  async delete(@Param('id') postId: number, @Body('ownerId') ownerId: number) {
    return await this.postService.delete(postId, ownerId);
  }
}
