import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableProfissional1698593948742 implements MigrationInterface {
    name = 'CreateTableProfissional1698593948742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_6fd5112410169b556e44e4762e"`);
        await queryRunner.query(`CREATE TABLE "temporary_usuario" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "email" varchar NOT NULL, "senha" varchar NOT NULL, "telefone" varchar NOT NULL, "lat" integer, "long" integer, "descricao" varchar, "cnpj" varchar, "discriminator" varchar NOT NULL, "enderecoId" varchar, "estabelecimentoId" varchar, CONSTRAINT "REL_6f962678dc18e5ec715e370e95" UNIQUE ("enderecoId"), CONSTRAINT "UQ_deccf50d27a5325ed5eff8000d3" UNIQUE ("telefone"), CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "FK_6f962678dc18e5ec715e370e95e" FOREIGN KEY ("enderecoId") REFERENCES "endereco" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_usuario"("id", "nome", "email", "senha", "telefone", "lat", "long", "descricao", "cnpj", "discriminator", "enderecoId") SELECT "id", "nome", "email", "senha", "telefone", "lat", "long", "descricao", "cnpj", "discriminator", "enderecoId" FROM "usuario"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`ALTER TABLE "temporary_usuario" RENAME TO "usuario"`);
        await queryRunner.query(`CREATE INDEX "IDX_6fd5112410169b556e44e4762e" ON "usuario" ("discriminator") `);
        await queryRunner.query(`DROP INDEX "IDX_6fd5112410169b556e44e4762e"`);
        await queryRunner.query(`CREATE TABLE "temporary_usuario" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "email" varchar NOT NULL, "senha" varchar NOT NULL, "telefone" varchar NOT NULL, "lat" integer, "long" integer, "descricao" varchar, "cnpj" varchar, "discriminator" varchar NOT NULL, "enderecoId" varchar, "estabelecimentoId" varchar, CONSTRAINT "REL_6f962678dc18e5ec715e370e95" UNIQUE ("enderecoId"), CONSTRAINT "UQ_deccf50d27a5325ed5eff8000d3" UNIQUE ("telefone"), CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "FK_6f962678dc18e5ec715e370e95e" FOREIGN KEY ("enderecoId") REFERENCES "endereco" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_c5ef5216ca2209f714155eeb963" FOREIGN KEY ("estabelecimentoId") REFERENCES "usuario" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_usuario"("id", "nome", "email", "senha", "telefone", "lat", "long", "descricao", "cnpj", "discriminator", "enderecoId", "estabelecimentoId") SELECT "id", "nome", "email", "senha", "telefone", "lat", "long", "descricao", "cnpj", "discriminator", "enderecoId", "estabelecimentoId" FROM "usuario"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`ALTER TABLE "temporary_usuario" RENAME TO "usuario"`);
        await queryRunner.query(`CREATE INDEX "IDX_6fd5112410169b556e44e4762e" ON "usuario" ("discriminator") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_6fd5112410169b556e44e4762e"`);
        await queryRunner.query(`ALTER TABLE "usuario" RENAME TO "temporary_usuario"`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "email" varchar NOT NULL, "senha" varchar NOT NULL, "telefone" varchar NOT NULL, "lat" integer, "long" integer, "descricao" varchar, "cnpj" varchar, "discriminator" varchar NOT NULL, "enderecoId" varchar, "estabelecimentoId" varchar, CONSTRAINT "REL_6f962678dc18e5ec715e370e95" UNIQUE ("enderecoId"), CONSTRAINT "UQ_deccf50d27a5325ed5eff8000d3" UNIQUE ("telefone"), CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "FK_6f962678dc18e5ec715e370e95e" FOREIGN KEY ("enderecoId") REFERENCES "endereco" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "usuario"("id", "nome", "email", "senha", "telefone", "lat", "long", "descricao", "cnpj", "discriminator", "enderecoId", "estabelecimentoId") SELECT "id", "nome", "email", "senha", "telefone", "lat", "long", "descricao", "cnpj", "discriminator", "enderecoId", "estabelecimentoId" FROM "temporary_usuario"`);
        await queryRunner.query(`DROP TABLE "temporary_usuario"`);
        await queryRunner.query(`CREATE INDEX "IDX_6fd5112410169b556e44e4762e" ON "usuario" ("discriminator") `);
        await queryRunner.query(`DROP INDEX "IDX_6fd5112410169b556e44e4762e"`);
        await queryRunner.query(`ALTER TABLE "usuario" RENAME TO "temporary_usuario"`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "email" varchar NOT NULL, "senha" varchar NOT NULL, "telefone" varchar NOT NULL, "lat" integer, "long" integer, "descricao" varchar, "cnpj" varchar, "discriminator" varchar NOT NULL, "enderecoId" varchar, CONSTRAINT "REL_6f962678dc18e5ec715e370e95" UNIQUE ("enderecoId"), CONSTRAINT "UQ_deccf50d27a5325ed5eff8000d3" UNIQUE ("telefone"), CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "FK_6f962678dc18e5ec715e370e95e" FOREIGN KEY ("enderecoId") REFERENCES "endereco" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "usuario"("id", "nome", "email", "senha", "telefone", "lat", "long", "descricao", "cnpj", "discriminator", "enderecoId") SELECT "id", "nome", "email", "senha", "telefone", "lat", "long", "descricao", "cnpj", "discriminator", "enderecoId" FROM "temporary_usuario"`);
        await queryRunner.query(`DROP TABLE "temporary_usuario"`);
        await queryRunner.query(`CREATE INDEX "IDX_6fd5112410169b556e44e4762e" ON "usuario" ("discriminator") `);
    }

}
