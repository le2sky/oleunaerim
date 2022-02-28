import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as admin from 'firebase-admin';
import { Reflector } from '@nestjs/core';
import { FirebaseService } from './services/firebase.service';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  firebaseApp: admin.app.App;
  constructor(
    private readonly reflector: Reflector,
    private readonly firebaseService: FirebaseService,
    private readonly userService: UserService,
  ) {
    this.firebaseApp = this.firebaseService.getFirebaseApp();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = context.switchToHttp().getRequest().headers.authorization;
    if (token != null && token != '') {
      try {
        const decodedToken = await this.firebaseApp.auth().verifyIdToken(token.replace('Bearer', ''));
        const user = await this.userService.findOneWithFirebaseId(decodedToken.uid);
        if (user) {
          return true;
        } else {
          throw new NotFoundException('존재하지 않는 유저입니다.');
        }
      } catch (err) {
        console.log(err.code);
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}
