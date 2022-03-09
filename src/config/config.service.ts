import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

export class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  isLocal(): boolean {
    return this.getValue('NODE_ENV', false) === 'local';
  }
  isProduction(): boolean {
    return this.getValue('NODE_ENV', false) === 'production';
  }
  getTypeOrmConfig(): TypeOrmModuleOptions {
    const tempPort = Number(this.getValue('DB_PORT'));
    const join = require('path').join;
    return {
      type: 'postgres',
      host: this.getValue('DB_HOST'),
      port: isNaN(tempPort) ? 5432 : tempPort,
      username: this.getValue('DB_USERNAME'),
      password: this.getValue('DB_USER_PASSWORD'),
      database: this.getValue('DATABASE_NAME'),
      synchronize: this.isProduction() ? false : true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: [
        this.isLocal() ? join(__dirname, '/migrations/*{.ts,.js}') : join(__dirname, '../dist/migrations/*{.ts,.js}'),
      ],
      cli: {
        entitiesDir: join(__dirname, 'database', 'entities'),
        migrationsDir: join(__dirname, 'migrations'),
      },
    };
  }
}
