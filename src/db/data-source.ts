import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import config from '@ebdp1/config-lib';
import { UserEntity } from './entities';
import * as Migrations from './migrations';
import * as Seeders from './seeders';
import 'reflect-metadata';
console.log(config.get('db'));
export const AppDataSource = new DataSource({
  ...config.get('db'),
  type: 'postgres',
  synchronize: true,
  logging: false,
  entities: [UserEntity],
  migrations: [...Object.values(Migrations), ...(process.env.NODE_ENV !== 'production' ? Object.values(Seeders) : [])],
  subscribers: [],
  namingStrategy: new SnakeNamingStrategy(),
});
