import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MountainsEntity } from 'src/database/entities/mountains.entity';
import { PostsEntity } from 'src/database/entities/posts.entity';
import { Repository } from 'typeorm';
import { MountainHelper } from './mountain.helper';

@Injectable()
export class MountainService {
  constructor(
    @InjectRepository(PostsEntity) private readonly postRepository: Repository<PostsEntity>,
    private readonly mountainHelper: MountainHelper,
  ) {}
  async getHotMountains() {
    const popularMountains = await this.getMountains();
    let mountains;
    if (popularMountains.length <= 0) {
      mountains = [
        { mountainName: '관악산', address: '서울시 관악구', imageUrl: await this.mountainHelper.getMountainImage() },
        { mountainName: '수리산', address: '경기도 만안구', imageUrl: await this.mountainHelper.getMountainImage() },
      ];
    } else {
      mountains = popularMountains.map(async (item) => {
        item.imageUrl = await this.mountainHelper.getMountainImage();
        return item;
      });
    }
    return Promise.all(mountains);
  }

  private async getMountains() {
    let mountain = await this.postRepository
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.Mountain', 'mountain')
      .select('mountain.name', 'mountainName')
      .addSelect('mountain.address', 'address')
      .groupBy('mountain.id')
      .orderBy('count(mountain.id)', 'DESC')
      .limit(5)
      .getRawMany();
    return mountain;
  }
}
