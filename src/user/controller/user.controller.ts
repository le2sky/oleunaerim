import { Body, Controller, HttpCode, Post, UseInterceptors } from '@nestjs/common';
import { SuccessInterceptor } from '../../common/interceptors/success.interceptor';
import { CreateUserDto } from '../dtos/createUser.dto';
import { FindEmailDto } from '../dtos/findEmail.dto';
import { UserService } from '../services/user.service';

@Controller('users')
@UseInterceptors(SuccessInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async signUp(@Body() dto: CreateUserDto) {
    return await this.userService.signUp(dto);
  }

  @Post('/email/find')
  @HttpCode(200)
  async findEmail(@Body() dto: FindEmailDto) {
    return await this.userService.findEmail(dto);
  }
}
