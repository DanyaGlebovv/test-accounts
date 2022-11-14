import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersAndSubscriptionsTable1667291473361 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "p_one_person_id" integer NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "title" character varying, "email" character varying NOT NULL, "avatar" character varying, "opt_out_at" character varying, "created_at" character varying, "updated_at" character varying, "deleted_at" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "subscriptions" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "description" character varying, "created_at" character varying, "updated_at" character varying, "deleted_at" character varying, CONSTRAINT "PK_a87248d73155605cf782be9ee5e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "subscription_user" ("id" SERIAL NOT NULL, "expire_at" character varying, "created_at" character varying, "updated_at" character varying, "deleted_at" character varying, "user_id" integer, "subscription_id" integer, CONSTRAINT "PK_940d49a105d50bbd616be540013" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_user" ADD CONSTRAINT "FK_850ab8a3bfecdf58caa9e10e3dc" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription_user" ADD CONSTRAINT "FK_22cb1a38d1f7a4f4d7f2f52968e" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`ALTER TABLE "subscription_user" DROP CONSTRAINT "FK_22cb1a38d1f7a4f4d7f2f52968e"`);
    await queryRunner.query(`ALTER TABLE "subscription_user" DROP CONSTRAINT "FK_850ab8a3bfecdf58caa9e10e3dc"`);
    await queryRunner.query(`DROP TABLE "subscription_user"`);
    await queryRunner.query(`DROP TABLE "subscriptions"`);
  }
}
