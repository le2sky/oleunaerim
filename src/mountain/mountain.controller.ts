import { Controller, Get } from '@nestjs/common';
import { MountainService } from './mountain.service';

@Controller('mountains')
export class MountainController {
  constructor(private readonly mountainService: MountainService) {}

  @Get('hot')
  async getHotMountains() {
    return await this.mountainService.getHotMountains();
  }
}
