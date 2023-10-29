import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAdminTable1698610585010 implements MigrationInterface {
    name = 'CreateAdminTable1698610585010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "email" varchar NOT NULL, "senha" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "admin"`);
    }

}
