import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueColumns1698416294154 implements MigrationInterface {
    name = 'UniqueColumns1698416294154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_cliente" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "email" varchar NOT NULL, "senha" varchar NOT NULL, "telefone" varchar NOT NULL, "lat" integer, "long" integer, CONSTRAINT "UQ_d638b8e5326bbfabdea996c196d" UNIQUE ("email"), CONSTRAINT "UQ_474eced26d2cbbd37bdf8cc5c8a" UNIQUE ("telefone"))`);
        await queryRunner.query(`INSERT INTO "temporary_cliente"("id", "nome", "email", "senha", "telefone", "lat", "long") SELECT "id", "nome", "email", "senha", "telefone", "lat", "long" FROM "cliente"`);
        await queryRunner.query(`DROP TABLE "cliente"`);
        await queryRunner.query(`ALTER TABLE "temporary_cliente" RENAME TO "cliente"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cliente" RENAME TO "temporary_cliente"`);
        await queryRunner.query(`CREATE TABLE "cliente" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "email" varchar NOT NULL, "senha" varchar NOT NULL, "telefone" varchar NOT NULL, "lat" integer, "long" integer)`);
        await queryRunner.query(`INSERT INTO "cliente"("id", "nome", "email", "senha", "telefone", "lat", "long") SELECT "id", "nome", "email", "senha", "telefone", "lat", "long" FROM "temporary_cliente"`);
        await queryRunner.query(`DROP TABLE "temporary_cliente"`);
    }

}
