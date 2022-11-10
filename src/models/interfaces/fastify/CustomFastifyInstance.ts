import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export interface CustomFastifyInstance extends FastifyInstance {
  authenticate?: (request: FastifyRequest, reply: FastifyReply) => FastifyInstance;
}
