import { Controller, Post, UseInterceptors } from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CreateUserDto } from '../dtos/createUser.dto';
import { UserService } from '../services/user.service';

@Controller('user')
@UseInterceptors(SuccessInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async signUp(dto: CreateUserDto) {
    return await this.userService.signUp(dto);
  }
}
