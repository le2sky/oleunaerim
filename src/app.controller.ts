import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  sayHi() {
    return 'hi';
  }
}
