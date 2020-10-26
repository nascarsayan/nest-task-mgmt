import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'snaskar',
  password: '1234',
  database: 'snaskar',
  entities: [__dirname + '/../**/*.entity.{ts|js}'],
  synchronize: true,
};
