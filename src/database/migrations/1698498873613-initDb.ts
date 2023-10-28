import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1698498873613 implements MigrationInterface {
    name = 'InitDb1698498873613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "endereco" ("id" varchar PRIMARY KEY NOT NULL, "logradouro" varchar NOT NULL, "numero" varchar NOT NULL, "complemento" varchar, "bairro" varchar NOT NULL, "cidade" varchar NOT NULL, "estado" varchar NOT NULL, "cep" varchar NOT NULL, "latitude" integer, "longitude" integer)`);
        await queryRunner.query(`CREATE TABLE "cliente" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "email" varchar NOT NULL, "senha" varchar NOT NULL, "telefone" varchar NOT NULL, "lat" integer, "long" integer, "enderecoId" varchar, CONSTRAINT "UQ_503f81286c5e49acd6a832abf43" UNIQUE ("email"), CONSTRAINT "UQ_94f6ee8f4dddf99c9fc0c3156b4" UNIQUE ("telefone"), CONSTRAINT "REL_b3e53e9c65f1a58088bb28c4db" UNIQUE ("enderecoId"))`);
        await queryRunner.query(`CREATE TABLE "estabelecimento" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "descricao" varchar NOT NULL, "telefone" varchar NOT NULL, "email" varchar NOT NULL, "senha" varchar NOT NULL, "cnpj" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_cliente" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "email" varchar NOT NULL, "senha" varchar NOT NULL, "telefone" varchar NOT NULL, "lat" integer, "long" integer, "enderecoId" varchar, CONSTRAINT "UQ_503f81286c5e49acd6a832abf43" UNIQUE ("email"), CONSTRAINT "UQ_94f6ee8f4dddf99c9fc0c3156b4" UNIQUE ("telefone"), CONSTRAINT "REL_b3e53e9c65f1a58088bb28c4db" UNIQUE ("enderecoId"), CONSTRAINT "FK_b3e53e9c65f1a58088bb28c4dbe" FOREIGN KEY ("enderecoId") REFERENCES "endereco" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_cliente"("id", "nome", "email", "senha", "telefone", "lat", "long", "enderecoId") SELECT "id", "nome", "email", "senha", "telefone", "lat", "long", "enderecoId" FROM "cliente"`);
        await queryRunner.query(`DROP TABLE "cliente"`);
        await queryRunner.query(`ALTER TABLE "temporary_cliente" RENAME TO "cliente"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cliente" RENAME TO "temporary_cliente"`);
        await queryRunner.query(`CREATE TABLE "cliente" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "email" varchar NOT NULL, "senha" varchar NOT NULL, "telefone" varchar NOT NULL, "lat" integer, "long" integer, "enderecoId" varchar, CONSTRAINT "UQ_503f81286c5e49acd6a832abf43" UNIQUE ("email"), CONSTRAINT "UQ_94f6ee8f4dddf99c9fc0c3156b4" UNIQUE ("telefone"), CONSTRAINT "REL_b3e53e9c65f1a58088bb28c4db" UNIQUE ("enderecoId"))`);
        await queryRunner.query(`INSERT INTO "cliente"("id", "nome", "email", "senha", "telefone", "lat", "long", "enderecoId") SELECT "id", "nome", "email", "senha", "telefone", "lat", "long", "enderecoId" FROM "temporary_cliente"`);
        await queryRunner.query(`DROP TABLE "temporary_cliente"`);
        await queryRunner.query(`DROP TABLE "estabelecimento"`);
        await queryRunner.query(`DROP TABLE "cliente"`);
        await queryRunner.query(`DROP TABLE "endereco"`);
    }

}
