import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1698591612237 implements MigrationInterface {
    name = 'InitDb1698591612237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "endereco" ("id" varchar PRIMARY KEY NOT NULL, "logradouro" varchar NOT NULL, "numero" varchar NOT NULL, "complemento" varchar, "bairro" varchar NOT NULL, "cidade" varchar NOT NULL, "estado" varchar NOT NULL, "cep" varchar NOT NULL, "latitude" integer, "longitude" integer)`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "email" varchar NOT NULL, "senha" varchar NOT NULL, "telefone" varchar NOT NULL, "lat" integer, "long" integer, "descricao" varchar, "cnpj" varchar, "discriminator" varchar NOT NULL, "enderecoId" varchar, CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "UQ_deccf50d27a5325ed5eff8000d3" UNIQUE ("telefone"), CONSTRAINT "REL_6f962678dc18e5ec715e370e95" UNIQUE ("enderecoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6fd5112410169b556e44e4762e" ON "usuario" ("discriminator") `);
        await queryRunner.query(`CREATE TABLE "horario_funcionamento" ("id" varchar PRIMARY KEY NOT NULL, "diaSemana" integer NOT NULL, "horaAbertura" varchar NOT NULL, "horaFechamento" varchar NOT NULL, "estabelecimentoId" varchar)`);
        await queryRunner.query(`DROP INDEX "IDX_6fd5112410169b556e44e4762e"`);
        await queryRunner.query(`CREATE TABLE "temporary_usuario" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "email" varchar NOT NULL, "senha" varchar NOT NULL, "telefone" varchar NOT NULL, "lat" integer, "long" integer, "descricao" varchar, "cnpj" varchar, "discriminator" varchar NOT NULL, "enderecoId" varchar, CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "UQ_deccf50d27a5325ed5eff8000d3" UNIQUE ("telefone"), CONSTRAINT "REL_6f962678dc18e5ec715e370e95" UNIQUE ("enderecoId"), CONSTRAINT "FK_6f962678dc18e5ec715e370e95e" FOREIGN KEY ("enderecoId") REFERENCES "endereco" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_usuario"("id", "nome", "email", "senha", "telefone", "lat", "long", "descricao", "cnpj", "discriminator", "enderecoId") SELECT "id", "nome", "email", "senha", "telefone", "lat", "long", "descricao", "cnpj", "discriminator", "enderecoId" FROM "usuario"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`ALTER TABLE "temporary_usuario" RENAME TO "usuario"`);
        await queryRunner.query(`CREATE INDEX "IDX_6fd5112410169b556e44e4762e" ON "usuario" ("discriminator") `);
        await queryRunner.query(`CREATE TABLE "temporary_horario_funcionamento" ("id" varchar PRIMARY KEY NOT NULL, "diaSemana" integer NOT NULL, "horaAbertura" varchar NOT NULL, "horaFechamento" varchar NOT NULL, "estabelecimentoId" varchar, CONSTRAINT "FK_9147f198fa6a8bd17791ec5302e" FOREIGN KEY ("estabelecimentoId") REFERENCES "usuario" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_horario_funcionamento"("id", "diaSemana", "horaAbertura", "horaFechamento", "estabelecimentoId") SELECT "id", "diaSemana", "horaAbertura", "horaFechamento", "estabelecimentoId" FROM "horario_funcionamento"`);
        await queryRunner.query(`DROP TABLE "horario_funcionamento"`);
        await queryRunner.query(`ALTER TABLE "temporary_horario_funcionamento" RENAME TO "horario_funcionamento"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "horario_funcionamento" RENAME TO "temporary_horario_funcionamento"`);
        await queryRunner.query(`CREATE TABLE "horario_funcionamento" ("id" varchar PRIMARY KEY NOT NULL, "diaSemana" integer NOT NULL, "horaAbertura" varchar NOT NULL, "horaFechamento" varchar NOT NULL, "estabelecimentoId" varchar)`);
        await queryRunner.query(`INSERT INTO "horario_funcionamento"("id", "diaSemana", "horaAbertura", "horaFechamento", "estabelecimentoId") SELECT "id", "diaSemana", "horaAbertura", "horaFechamento", "estabelecimentoId" FROM "temporary_horario_funcionamento"`);
        await queryRunner.query(`DROP TABLE "temporary_horario_funcionamento"`);
        await queryRunner.query(`DROP INDEX "IDX_6fd5112410169b556e44e4762e"`);
        await queryRunner.query(`ALTER TABLE "usuario" RENAME TO "temporary_usuario"`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "email" varchar NOT NULL, "senha" varchar NOT NULL, "telefone" varchar NOT NULL, "lat" integer, "long" integer, "descricao" varchar, "cnpj" varchar, "discriminator" varchar NOT NULL, "enderecoId" varchar, CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "UQ_deccf50d27a5325ed5eff8000d3" UNIQUE ("telefone"), CONSTRAINT "REL_6f962678dc18e5ec715e370e95" UNIQUE ("enderecoId"))`);
        await queryRunner.query(`INSERT INTO "usuario"("id", "nome", "email", "senha", "telefone", "lat", "long", "descricao", "cnpj", "discriminator", "enderecoId") SELECT "id", "nome", "email", "senha", "telefone", "lat", "long", "descricao", "cnpj", "discriminator", "enderecoId" FROM "temporary_usuario"`);
        await queryRunner.query(`DROP TABLE "temporary_usuario"`);
        await queryRunner.query(`CREATE INDEX "IDX_6fd5112410169b556e44e4762e" ON "usuario" ("discriminator") `);
        await queryRunner.query(`DROP TABLE "horario_funcionamento"`);
        await queryRunner.query(`DROP INDEX "IDX_6fd5112410169b556e44e4762e"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`DROP TABLE "endereco"`);
    }

}
