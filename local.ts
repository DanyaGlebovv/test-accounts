import 'reflect-metadata';

import { init } from './src';
import config from '@ebdp1/config-lib';
import fastify from 'fastify';

const server = fastify();

init(server).listen({ port: config.get('port') || 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
