import { CustomFastifyRequest } from '../../models';
import { isAfter } from 'date-fns';
import { UserRepository, SubscriptionUserEntity } from '../../db';
import { getPOneUser, getPOneUserEvents } from '..';

export const signIn = async (request: CustomFastifyRequest) => {
  const { personId } = request.user;
  const { authorization: jwt } = request.headers;

  let user = await UserRepository.findOneWithActiveSubscriptions(Number(personId));
  const activeSubscription = user?.subscriptions?.find(
    (subscription: SubscriptionUserEntity) =>
      !subscription.expireAt || isAfter(new Date(subscription.expireAt), new Date()),
  );

  if (!user || !activeSubscription) {
    if (!user) {
      const {
        data: { id: pOnePersonId, ...p1User },
      } = await getPOneUser(jwt);

      const {
        raw: { id },
      } = await UserRepository.insert({ ...p1User, pOnePersonId });
      user = { ...p1User, pOnePersonId, id };
    }
    const { data: events } = await getPOneUserEvents(jwt);
    user = { ...user, events };
  }

  return { user };
};

export const signUp = async () => {};
