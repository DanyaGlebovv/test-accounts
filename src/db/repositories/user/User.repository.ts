import { UserEntity } from '../../entities';
import { AppDataSource } from '../../data-source';
import { Not, Raw } from 'typeorm';

export const UserRepository = AppDataSource.getRepository(UserEntity).extend({
  findOneWithActiveSubscriptions(pOnePersonId: number) {
    return this.findOne({
      where: {
        pOnePersonId,
        optOutAt: null,
        subscriptions: {
          expireAt: Raw((alias) => `${alias} > NOW()`),
        },
      },
      relations: {
        subscriptions: {
          expireAt: true,
        },
      },
    });
  },
  checkUniqueEmail({ id, email }: { id?: number; email: string }) {
    return this.findOne({ where: { ...(id ? { id: Not(id) } : {}), email, optOutAt: null } });
  },
});
