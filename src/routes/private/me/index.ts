import { CustomFastifyInstance } from 'models';
import { getMyUser } from '../../../modules';

export default async function user(fastify: CustomFastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/',
    onRequest: [fastify.authenticate],
    handler: getMyUser,
  });
}
