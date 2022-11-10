import { UserEntity } from '../entities';
import { In, MigrationInterface, QueryRunner } from 'typeorm';

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
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      queryRunner.manager.insert(UserEntity, this.users);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      queryRunner.manager.delete(UserEntity, { id: In(this.users.map(({ id }) => id)) });
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
