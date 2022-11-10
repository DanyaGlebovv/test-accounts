import { FastifyRequest, RequestGenericInterface } from 'fastify';
import { UserDataJWT } from '..';

export interface CustomFastifyRequest<T extends RequestGenericInterface = {}> extends FastifyRequest<T> {
  user?: UserDataJWT;
}
