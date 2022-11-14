import { In, MigrationInterface, QueryRunner } from 'typeorm';
import { addDays } from 'date-fns';
import { UserEntity, SubscriptionUserEntity, SubscriptionEntity } from '../entities';

export class CreateUser1667758956851 implements MigrationInterface {
  users = [
    {
      id: 1,
      pOnePersonId: 1,
      firstName: 'TestFirstName',
      lastName: 'TestLastName',
      title: 'test_user',
      email: 'testuser@test.com',
    },
    {
      id: 2,
      pOnePersonId: 2,
      firstName: 'TestFirstName2',
      lastName: 'TestLastName2',
      title: 'test_use2r',
      email: 'testuser2@test.com',
    },
  ];
  subscriptions = [
    {
      id: 1,
      name: 'TestSubscription',
      price: 10,
    },
  ];
  subscriptionUsers = [
    {
      id: 1,
      user: new UserEntity(this.users[0]),
      subscription: new SubscriptionEntity(this.subscriptions[0]),
      expireAt: addDays(new Date(), 30).toUTCString(),
    },
  ];
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      queryRunner.manager.insert(UserEntity, this.users);
      queryRunner.manager.insert(SubscriptionEntity, this.subscriptions);
      queryRunner.manager.insert(SubscriptionUserEntity, this.subscriptionUsers);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      queryRunner.manager.delete(UserEntity, { id: In(this.users.map(({ id }) => id)) });
      queryRunner.manager.delete(SubscriptionEntity, { id: In(this.subscriptions.map(({ id }) => id)) });
      queryRunner.manager.delete(SubscriptionUserEntity, { id: In(this.subscriptionUsers.map(({ id }) => id)) });
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
