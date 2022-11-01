import AutoLoad from 'fastify-autoload';
import { FastifyInstance } from 'fastify';
import path from 'path';
import { AppDataSource } from './db';

export const init = (fastify: FastifyInstance, opts?) => {
  AppDataSource.initialize().then(() => console.log('Success'));
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    dirNameRoutePrefix: true,
    options: Object.assign({}, opts),
  });
  return fastify;
};
