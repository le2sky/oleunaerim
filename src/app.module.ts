import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validationSchema } from './config/validationSchema';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      isGlobal: true,
      validationSchema,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigService],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_USER_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: process.env.NODE_ENV === 'local' ? true : false,
      }),
    }),
  ],
})
export class AppModule {}
