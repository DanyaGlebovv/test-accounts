import fastify from 'fastify';
import AutoLoad from 'fastify-autoload';
import { FastifyReply } from 'fastify';
import authLib from '@ebdp1/auth-lib';
import config from '@ebdp1/config-lib';
import path from 'path';
import { AppDataSource } from './db';
import { CustomFastifyRequest, UserDataJWT } from 'models';
import 'reflect-metadata';

export const init = async (opts?) => {
  const app = fastify();

  await AppDataSource.initialize();
  console.log('Database connect success');

  app.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    dirNameRoutePrefix: true,
    options: Object.assign({}, opts),
  });

  authLib.initialize(config);
  const { tokenService } = authLib;

  app.decorate('authenticate', async function (request: CustomFastifyRequest, reply: FastifyReply) {
    try {
      if (!request.headers.authorization) {
        reply.status(401).send('Unauthorized');
      }
      const user = await tokenService.decodeToken(request.headers.authorization);
      console.log(user);
      request.user = user as UserDataJWT;
    } catch (err) {
      reply.send(err);
    }
  });
  return app;
};
