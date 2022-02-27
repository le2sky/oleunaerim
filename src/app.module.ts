import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validationSchema } from './config/validationSchema';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const isLocalEnvironment = process.env.NODE_ENV === 'local' ? true : false;
        return {
          type: 'postgres',
          host: isLocalEnvironment ? 'localhost' : configService.get('DB_HOST'),
          port: isLocalEnvironment ? 5432 : configService.get<number>('DB_PORT'),
          username: isLocalEnvironment ? 'root' : configService.get('DB_USERNAME'),
          password: isLocalEnvironment ? 'root' : configService.get('DB_USER_PASSWORD'),
          database: isLocalEnvironment ? 'local-db' : configService.get('DATABASE_NAME'),
          synchronize: isLocalEnvironment ? true : false,
          entities: ['dist/**/*.entity{.ts,.js}'],
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
