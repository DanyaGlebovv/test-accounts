import { FastifyInstance } from 'fastify';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../../../modules';

export default async function user(fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/',
    handler: createUser,
  });
  fastify.route({
    method: 'GET',
    url: '/list',
    handler: getUsers,
  });
  fastify.route({
    method: 'GET',
    url: '/:userId',
    handler: getUser,
  });
  fastify.route({
    method: 'PUT',
    url: '/:userId',
    handler: updateUser,
  });
  fastify.route({
    method: 'DELETE',
    url: '/:userId',
    handler: deleteUser,
  });
}
