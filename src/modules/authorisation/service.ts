import { CustomFastifyRequest } from '../../models';
import { UserRepository } from '../../db';
import { getPOneUser, getPOneUserEvents } from '..';

export const signIn = async (request: CustomFastifyRequest) => {
  const { personId } = request.user;
  const { authorization: jwt } = request.headers;

  let user = await UserRepository.findOneWithActiveSubscriptions(Number(personId));
  if (!user?.subscriptions.length) {
    if (!user) {
      const { data: p1User } = await getPOneUser(jwt);
      ({ raw: user } = await UserRepository.insert(p1User));
    }

    const { data: events } = await getPOneUserEvents(jwt);
    user = { ...user, events };
  }

  return { user };
};

export const signUp = async () => {};
