import { UserEntity } from '../entities';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1667758956851 implements MigrationInterface {
  user = {
    id: 1,
    firstName: 'TestFirstName',
    lastName: 'TestLastName',
    title: 'test_user',
  };
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      queryRunner.manager.insert(UserEntity, this.user);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      queryRunner.manager.delete(UserEntity, { id: this.user.id });
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
