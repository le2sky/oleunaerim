import { Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/user/auth.guard';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CreateUserDto } from '../dtos/createUser.dto';
import { UserService } from '../services/user.service';

@Controller('user')
@UseInterceptors(SuccessInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @UseGuards(AuthGuard)
  async signUp(dto: CreateUserDto) {
    return await this.userService.signUp(dto);
  }
}
