import { CustomFastifyInstance } from 'models';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../../../modules';

export default async function user(fastify: CustomFastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/',
    onRequest: [fastify.authenticate],
    handler: createUser,
  });
  fastify.route({
    method: 'GET',
    url: '/list',
    onRequest: [fastify.authenticate],
    handler: getUsers,
  });
  fastify.route({
    method: 'GET',
    url: '/:userId',
    onRequest: [fastify.authenticate],
    handler: getUser,
  });
  fastify.route({
    method: 'PUT',
    url: '/:userId',
    onRequest: [fastify.authenticate],
    handler: updateUser,
  });
  fastify.route({
    method: 'DELETE',
    url: '/:userId',
    onRequest: [fastify.authenticate],
    handler: deleteUser,
  });
}
