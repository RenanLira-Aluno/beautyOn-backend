import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableCliente1698415147652 implements MigrationInterface {
    name = 'CreateTableCliente1698415147652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cliente" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "email" varchar NOT NULL, "senha" varchar NOT NULL, "telefone" varchar NOT NULL, "lat" integer, "long" integer)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cliente"`);
    }

}
