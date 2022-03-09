import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MountainsEntity } from 'src/database/entities/mountains.entity';
import { Repository } from 'typeorm';

export interface IMountainInforamtion {
  address_name: string;
  place_url: string;
  place_name: string;
  x: number;
  y: number;
}

@Injectable()
export class MountainHelper implements OnModuleInit {
  randomImage: () => Promise<string>;
  async onModuleInit() {
    if (!(await this.isDataBinding())) {
      Logger.log('DB에 산 데이터가 없습니다. 저장을 시작합니다.', 'MountainHelper');
      await this.seedingData();
    }
  }
  constructor(@InjectRepository(MountainsEntity) private readonly mountainRepository: Repository<MountainsEntity>) {
    this.randomImage = require('../lib/mountain-random-image/main');
  }
  async getMountainImage(): Promise<string> {
    const imageUrl: string = await this.randomImage();
    return imageUrl;
  }

  private async isDataBinding(): Promise<boolean> {
    const mountains = await this.mountainRepository.createQueryBuilder('mountains').limit(100).getMany();
    if (mountains.length === 0) {
      return false;
    } else return true;
  }
  private async seedingData(): Promise<void> {
    try {
      let locations = require('../public/data/result/location.json');
      locations = Object.keys(locations);
      locations.forEach((location: string) => {
        const data: IMountainInforamtion[] = require(`../public/data/result/${location}.json`);
        data.forEach(async (mountain: IMountainInforamtion) => {
          await this.mountainRepository.save({
            name: mountain.place_name,
            address: mountain.address_name,
            url: mountain.place_url,
            lat: mountain.y,
            lon: mountain.x,
          });
        });
      });
      Logger.log('산 데이터를 DB에 성공적으로 저장했습니다.', 'MountainHelper');
    } catch (err) {
      Logger.log('JSON 데이터를 읽는데 실패했습니다.', 'MountainHelper');
      Logger.log('JSON 데이터를 불러옵니다.', 'MountainHelper');
      const mountainsGenerator = require('../lib/mountain-generator/main');
      await mountainsGenerator();
      await this.seedingData();
    }
  }
}
