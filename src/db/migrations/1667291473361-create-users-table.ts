import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1667291473361 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "title" character varying, "email" character varying, "avatar" character varying, "opt_out_at" character varying, "created_at" character varying, "udated_at" character varying, "deleted_at" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
