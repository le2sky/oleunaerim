import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class FirebaseService {
  firebaseApp: admin.app.App;
  constructor(private readonly configService: ConfigService) {
    const firebaseConfig = {
      type: this.configService.get('FIREBASE_TYPE'),
      projectId: this.configService.get('FIREBASE_PROJECT_ID'),
      private_key_id: this.configService.get('FIREBASE_PRIVATE_KEY_ID'),
      privateKey: this.configService.get('FIREBASE_PRIVATE_KEY'),
      clientEmail: this.configService.get('FIREBASE_CLIENT_EMAIL'),
      client_id: this.configService.get('FIREBASE_CLIENT_ID'),
      auth_uri: this.configService.get('FIREBASE_AUTH_URI'),
      token_uri: this.configService.get('FIREBASE_TOKEN_URI'),
      auth_provider_x509_cert_url: this.configService.get('FIREBASE_AUTH_PROVIDER_X509_CERT_URL'),
      client_x509_cert_url: this.configService.get('FIREBASE_CLIENT_X509_CERT_URL'),
    };
    this.firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
    });
  }
  getFirebaseApp(): admin.app.App {
    return this.firebaseApp;
  }
}
