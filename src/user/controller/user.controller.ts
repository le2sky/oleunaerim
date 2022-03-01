import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CreateUserDto } from '../dtos/createUser.dto';
import { UserService } from '../services/user.service';

@Controller('users')
@UseInterceptors(SuccessInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async signUp(@Body() dto: CreateUserDto) {
    return await this.userService.signUp(dto);
  }
}
