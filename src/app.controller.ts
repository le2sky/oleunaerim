import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  sayHi() {
    return `${process.env.NODE_ENV} 모드 서버입니다.`;
  }
}
