import { Injectable, UnprocessableEntityException } from '@nestjs/common';
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

    TODO: 'firebase 가입 되었는지, 확인 필요';
    return await this.userRepository.save(dto);
  }

  private async userExist(firebaseId: string): Promise<boolean> {
    const user = await this.userRepository.findOne(firebaseId);
    return user ? true : false;
  }
}
