import { validate } from 'class-validator';
import { FastifyReply } from 'fastify';
import { CustomFastifyRequest } from 'models';
import { UserRepository, UserEntity } from '../../db';

export const getUsers = async () => {
  const list = await UserRepository.findOneBy({});
  return { list };
};

export const getUser = async (req: CustomFastifyRequest<{ Params: { userId: string } }>) => {
  const { userId } = req.params;
  const user = await UserRepository.findOneBy({ id: Number(userId) });
  return { user };
};

export const createUser = async (req: CustomFastifyRequest<{ Body: UserEntity }>, reply: FastifyReply) => {
  const { email } = req.body;
  const errors = await validate(new UserEntity(req.body));
  if (errors.length) {
    return reply.status(400).send('User information is incorrect');
  }

  const activeUserWithEmail = await UserRepository.checkUniqueEmail({ email });
  if (activeUserWithEmail) {
    return reply.status(400).send('User email should be unique');
  }

  const {
    raw: [user],
  } = await UserRepository.insert(req.body);
  return { user: { ...user, ...req.body } };
};

export const updateUser = async (
  req: CustomFastifyRequest<{ Params: { userId: string }; Body: UserEntity }>,
  reply: FastifyReply,
) => {
  const { userId } = req.params;
  const { email } = req.body;

  const errors = await validate(new UserEntity({ id: Number(userId), ...req.body }));
  if (errors.length) {
    return reply.status(400).send('User information is incorrect');
  }

  if (email) {
    const activeUserWithEmail = await UserRepository.checkUniqueEmail({ id: Number(userId), email });
    if (activeUserWithEmail) {
      return reply.status(400).send('User email should be unique');
    }
  }
  await UserRepository.update({ id: Number(userId) }, req.body);
  return { id: Number(userId), ...req.body };
};

export const deleteUser = async (req: CustomFastifyRequest<{ Params: { userId: string } }>) => {
  const { userId } = req.params;
  await UserRepository.delete({ id: Number(userId) });
  return { success: true };
};

export const getMyUser = async (req: CustomFastifyRequest) => {
  const { personId } = req.user;
  const user = await UserRepository.findOneBy({ pOnePersonId: Number(personId), optOutAt: null });

  return { user };
};
