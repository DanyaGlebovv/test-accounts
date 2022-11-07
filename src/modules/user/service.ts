import { FastifyRequest } from 'fastify';
import { UserRepository, UserEntity } from '../../db';

export const getUsers = async () => {
  const list = await UserRepository.findOneBy({});
  return { list };
};

export const getUser = async (req: FastifyRequest<{ Params: { userId: string } }>) => {
  const { userId } = req.params;
  const user = await UserRepository.findOneBy({ id: Number(userId) });
  return { user };
};

export const createUser = async (req: FastifyRequest<{ Body: UserEntity }>) => {
  const user = await UserRepository.insert(req.body);
  return { user };
};

export const updateUser = async (req: FastifyRequest<{ Params: { userId: string }; Body: UserEntity }>) => {
  const { userId } = req.params;
  const user = await UserRepository.update({ id: Number(userId) }, req.body);
  return { user };
};

export const deleteUser = async (req: FastifyRequest<{ Params: { userId: string } }>) => {
  const { userId } = req.params;
  await UserRepository.delete({ id: Number(userId) });
  return { success: true };
};
