import { Not } from 'typeorm';
import { UserEntity } from '../../entities';
import { AppDataSource } from '../../data-source';

export const UserRepository = AppDataSource.getRepository(UserEntity).extend({
  findOneWithActiveSubscriptions(pOnePersonId: number) {
    return this.findOne({
      where: {
        pOnePersonId,
        optOutAt: null,
      },
      relations: {
        subscriptions: {
          subscription: true,
        },
      },
    });
  },
  checkUniqueEmail({ id, email }: { id?: number; email: string }) {
    return this.findOne({ where: { ...(id ? { id: Not(id) } : {}), email, optOutAt: null } });
  },
});
