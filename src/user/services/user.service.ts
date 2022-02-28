import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/database/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/createUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UsersEntity) private userRepository: Repository<UsersEntity>) {}
  async signUp(dto: CreateUserDto): Promise<UsersEntity> {
    let { firebaseId } = dto;
    if (this.userExist(firebaseId)) {
      throw new UnprocessableEntityException('이미 존재하는 유저입니다.');
    }

    return await this.userRepository.save(dto);
  }

  async findOneWithFirebaseId(firebaseId: string): Promise<UsersEntity> {
    const user = await this.userRepository.findOne(firebaseId);
    if (!user) {
      throw new NotFoundException('존재하지 않는 유저입니다.');
    }
    return user;
  }

  private async userExist(firebaseId: string): Promise<boolean> {
    const user = await this.userRepository.findOne(firebaseId);
    return user ? true : false;
  }
}
