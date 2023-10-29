import { MigrationInterface, QueryRunner } from "typeorm";

export class NullablesColumns1698609973383 implements MigrationInterface {
    name = 'NullablesColumns1698609973383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_categoria_servico" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "descricao" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_categoria_servico"("id", "nome", "descricao") SELECT "id", "nome", "descricao" FROM "categoria_servico"`);
        await queryRunner.query(`DROP TABLE "categoria_servico"`);
        await queryRunner.query(`ALTER TABLE "temporary_categoria_servico" RENAME TO "categoria_servico"`);
        await queryRunner.query(`CREATE TABLE "temporary_categoria_servico" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "descricao" varchar NOT NULL, CONSTRAINT "UQ_ca6e81105b727990dc3f14daa39" UNIQUE ("nome"))`);
        await queryRunner.query(`INSERT INTO "temporary_categoria_servico"("id", "nome", "descricao") SELECT "id", "nome", "descricao" FROM "categoria_servico"`);
        await queryRunner.query(`DROP TABLE "categoria_servico"`);
        await queryRunner.query(`ALTER TABLE "temporary_categoria_servico" RENAME TO "categoria_servico"`);
        await queryRunner.query(`CREATE TABLE "temporary_agendamento" ("id" varchar PRIMARY KEY NOT NULL, "data" varchar NOT NULL, "hora" varchar NOT NULL, "status" varchar NOT NULL, "clienteId" varchar, "servicoId" varchar, "profissionalId" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_agendamento"("id", "data", "hora", "status", "clienteId", "servicoId", "profissionalId") SELECT "id", "data", "hora", "status", "clienteId", "servicoId", "profissionalId" FROM "agendamento"`);
        await queryRunner.query(`DROP TABLE "agendamento"`);
        await queryRunner.query(`ALTER TABLE "temporary_agendamento" RENAME TO "agendamento"`);
        await queryRunner.query(`CREATE TABLE "temporary_agendamento" ("id" varchar PRIMARY KEY NOT NULL, "data" date NOT NULL, "hora" varchar NOT NULL, "status" varchar NOT NULL DEFAULT ('pendente'), "clienteId" varchar NOT NULL, "servicoId" varchar NOT NULL, "profissionalId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_agendamento"("id", "data", "hora", "status", "clienteId", "servicoId", "profissionalId") SELECT "id", "data", "hora", "status", "clienteId", "servicoId", "profissionalId" FROM "agendamento"`);
        await queryRunner.query(`DROP TABLE "agendamento"`);
        await queryRunner.query(`ALTER TABLE "temporary_agendamento" RENAME TO "agendamento"`);
        await queryRunner.query(`CREATE TABLE "temporary_agendamento" ("id" varchar PRIMARY KEY NOT NULL, "data" date NOT NULL, "hora" varchar NOT NULL, "status" varchar NOT NULL DEFAULT ('pendente'), "clienteId" varchar NOT NULL, "servicoId" varchar NOT NULL, "profissionalId" varchar NOT NULL, CONSTRAINT "FK_ad85077023b774f9e4d88b2cee8" FOREIGN KEY ("clienteId") REFERENCES "usuario" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_613ea0931313d10e7279746f727" FOREIGN KEY ("servicoId") REFERENCES "servico_estabelecimento" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_76a4412ec2aa49edeb1a106f0a0" FOREIGN KEY ("profissionalId") REFERENCES "usuario" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_agendamento"("id", "data", "hora", "status", "clienteId", "servicoId", "profissionalId") SELECT "id", "data", "hora", "status", "clienteId", "servicoId", "profissionalId" FROM "agendamento"`);
        await queryRunner.query(`DROP TABLE "agendamento"`);
        await queryRunner.query(`ALTER TABLE "temporary_agendamento" RENAME TO "agendamento"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agendamento" RENAME TO "temporary_agendamento"`);
        await queryRunner.query(`CREATE TABLE "agendamento" ("id" varchar PRIMARY KEY NOT NULL, "data" date NOT NULL, "hora" varchar NOT NULL, "status" varchar NOT NULL DEFAULT ('pendente'), "clienteId" varchar NOT NULL, "servicoId" varchar NOT NULL, "profissionalId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "agendamento"("id", "data", "hora", "status", "clienteId", "servicoId", "profissionalId") SELECT "id", "data", "hora", "status", "clienteId", "servicoId", "profissionalId" FROM "temporary_agendamento"`);
        await queryRunner.query(`DROP TABLE "temporary_agendamento"`);
        await queryRunner.query(`ALTER TABLE "agendamento" RENAME TO "temporary_agendamento"`);
        await queryRunner.query(`CREATE TABLE "agendamento" ("id" varchar PRIMARY KEY NOT NULL, "data" varchar NOT NULL, "hora" varchar NOT NULL, "status" varchar NOT NULL, "clienteId" varchar, "servicoId" varchar, "profissionalId" varchar)`);
        await queryRunner.query(`INSERT INTO "agendamento"("id", "data", "hora", "status", "clienteId", "servicoId", "profissionalId") SELECT "id", "data", "hora", "status", "clienteId", "servicoId", "profissionalId" FROM "temporary_agendamento"`);
        await queryRunner.query(`DROP TABLE "temporary_agendamento"`);
        await queryRunner.query(`ALTER TABLE "agendamento" RENAME TO "temporary_agendamento"`);
        await queryRunner.query(`CREATE TABLE "agendamento" ("id" varchar PRIMARY KEY NOT NULL, "data" varchar NOT NULL, "hora" varchar NOT NULL, "status" varchar NOT NULL, "clienteId" varchar, "servicoId" varchar, "profissionalId" varchar, CONSTRAINT "FK_ad85077023b774f9e4d88b2cee8" FOREIGN KEY ("clienteId") REFERENCES "usuario" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "agendamento"("id", "data", "hora", "status", "clienteId", "servicoId", "profissionalId") SELECT "id", "data", "hora", "status", "clienteId", "servicoId", "profissionalId" FROM "temporary_agendamento"`);
        await queryRunner.query(`DROP TABLE "temporary_agendamento"`);
        await queryRunner.query(`ALTER TABLE "categoria_servico" RENAME TO "temporary_categoria_servico"`);
        await queryRunner.query(`CREATE TABLE "categoria_servico" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "descricao" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "categoria_servico"("id", "nome", "descricao") SELECT "id", "nome", "descricao" FROM "temporary_categoria_servico"`);
        await queryRunner.query(`DROP TABLE "temporary_categoria_servico"`);
        await queryRunner.query(`ALTER TABLE "categoria_servico" RENAME TO "temporary_categoria_servico"`);
        await queryRunner.query(`CREATE TABLE "categoria_servico" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "descricao" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "categoria_servico"("id", "nome", "descricao") SELECT "id", "nome", "descricao" FROM "temporary_categoria_servico"`);
        await queryRunner.query(`DROP TABLE "temporary_categoria_servico"`);
    }

}
