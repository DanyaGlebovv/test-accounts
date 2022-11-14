import { CustomFastifyInstance } from 'models';
import { signIn, signUp } from '../../../modules';

export default async function authorization(fastify: CustomFastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/sign-in',
    onRequest: [fastify.authenticate],
    handler: signIn,
  });
  fastify.route({
    method: 'GET',
    url: '/sign-up',
    handler: signUp,
  });
}
