import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import config from '@ebdp1/config-lib';
import * as Entities from './entities';
import * as Migrations from './migrations';
import * as Seeders from './seeders';
import 'reflect-metadata';

export const AppDataSource = new DataSource({
  ...config.get('db'),
  type: 'postgres',
  synchronize: true,
  logging: false,
  entities: Object.values(Entities),
  migrations: [...Object.values(Migrations), ...(process.env.NODE_ENV !== 'production' ? Object.values(Seeders) : [])],
  subscribers: [],
  namingStrategy: new SnakeNamingStrategy(),
});
