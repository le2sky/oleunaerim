import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as admin from 'firebase-admin';
import { Reflector } from '@nestjs/core';
import { FirebaseService } from './services/firebase.service';
import { UserService } from 'src/user/services/user.service';
import { UsersEntity } from 'src/database/entities/users.entity';

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
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization;
    let decodedToken;
    if (token != null && token != '') {
      try {
        decodedToken = await this.firebaseApp.auth().verifyIdToken(token.replace('Bearer', ''));
      } catch (err) {
        throw new UnauthorizedException(err.message + `(${err.code})`);
      }
      const user = await this.userService.findOne({ firebaseId: decodedToken.uid });
      if (user) {
        req.userInfo = user;
        return true;
      }
    } else {
      throw new UnauthorizedException('there is no token');
    }
  }
}
