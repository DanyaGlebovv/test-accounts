import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import config from '@ebdp1/config-lib';
import { UserEntity } from './entities';
import * as Migrations from './migrations';

export const AppDataSource = new DataSource({
  ...config.get('db'),
  type: 'postgres',
  synchronize: true,
  logging: false,
  entities: [UserEntity],
  migrations: [...Object.values(Migrations)],
  subscribers: [],
  namingStrategy: new SnakeNamingStrategy(),
});
