import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { UsersEntity } from '../../database/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/createUser.dto';
import { FindEmailDto } from '../dtos/findEmail.dto';
import { FirebaseService } from './firebase.service';

export interface IUserFindOptions {
  email?: string;
  firebaseId?: string;
  id?: number;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity) private readonly userRepository: Repository<UsersEntity>,
    private readonly firebaseService: FirebaseService,
  ) {}

  async signUp(dto: CreateUserDto): Promise<UsersEntity> {
    const { email, firebaseId } = dto;
    if (await this.userExist(email)) {
      throw new UnprocessableEntityException('이미 존재하는 유저입니다.');
    }

    let user: UserRecord;
    try {
      user = await this.firebaseService.getFirebaseApp().auth().getUser(firebaseId);
    } catch (err) {
      throw new NotFoundException('존재하지 않는 uid 입니다.');
    }
    if (user.email !== email) {
      throw new UnprocessableEntityException('인증 시스템에 등록된 이메일과 다른 이메일을 입력했습니다.');
    }
    return await this.userRepository.save(dto);
  }

  async findEmail(dto: FindEmailDto): Promise<string> {
    const { name, phone } = dto;
    const users = await this.userRepository.find({ name });
    if (users.length === 0) {
      throw new NotFoundException('올바른 이름을 입력해 주세요.');
    }
    const [findedUser] = users.filter((user) => user.phone === phone);
    if (!findedUser) {
      throw new NotFoundException('검색결과가 없습니다.');
    }
    return findedUser.email;
  }

  async findOne(option: IUserFindOptions): Promise<UsersEntity> {
    const user = await this.userRepository.findOne(option);
    if (!user) {
      throw new NotFoundException('존재하지 않는 유저입니다.');
    }
    return user;
  }

  private async userExist(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ email });
    return user ? true : false;
  }
}
