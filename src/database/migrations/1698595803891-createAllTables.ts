import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAllTables1698595803891 implements MigrationInterface {
    name = 'CreateAllTables1698595803891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categoria_servico" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "descricao" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "servico_estabelecimento" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "preco" integer NOT NULL, "duracao" integer NOT NULL, "descricao" varchar NOT NULL, "estabelecimentoId" varchar NOT NULL, "categoriaId" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "agendamento" ("id" varchar PRIMARY KEY NOT NULL, "data" varchar NOT NULL, "hora" varchar NOT NULL, "status" varchar NOT NULL, "clienteId" varchar, "servicoId" varchar, "profissionalId" varchar)`);
        await queryRunner.query(`CREATE TABLE "usuario_servicos_servico_estabelecimento" ("usuarioId" varchar NOT NULL, "servicoEstabelecimentoId" varchar NOT NULL, PRIMARY KEY ("usuarioId", "servicoEstabelecimentoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_726844b1523a242bda2552c9bd" ON "usuario_servicos_servico_estabelecimento" ("usuarioId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9165aed2ab33b274d97f3b6c0d" ON "usuario_servicos_servico_estabelecimento" ("servicoEstabelecimentoId") `);
        await queryRunner.query(`CREATE TABLE "temporary_servico_estabelecimento" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "preco" integer NOT NULL, "duracao" integer NOT NULL, "descricao" varchar NOT NULL, "estabelecimentoId" varchar NOT NULL, "categoriaId" varchar NOT NULL, CONSTRAINT "FK_9834e83687071e516bc4015baed" FOREIGN KEY ("estabelecimentoId") REFERENCES "usuario" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_9e21a3ab0aea1a0ced3e18ed395" FOREIGN KEY ("categoriaId") REFERENCES "categoria_servico" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_servico_estabelecimento"("id", "nome", "preco", "duracao", "descricao", "estabelecimentoId", "categoriaId") SELECT "id", "nome", "preco", "duracao", "descricao", "estabelecimentoId", "categoriaId" FROM "servico_estabelecimento"`);
        await queryRunner.query(`DROP TABLE "servico_estabelecimento"`);
        await queryRunner.query(`ALTER TABLE "temporary_servico_estabelecimento" RENAME TO "servico_estabelecimento"`);
        await queryRunner.query(`CREATE TABLE "temporary_agendamento" ("id" varchar PRIMARY KEY NOT NULL, "data" varchar NOT NULL, "hora" varchar NOT NULL, "status" varchar NOT NULL, "clienteId" varchar, "servicoId" varchar, "profissionalId" varchar, CONSTRAINT "FK_ad85077023b774f9e4d88b2cee8" FOREIGN KEY ("clienteId") REFERENCES "usuario" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_613ea0931313d10e7279746f727" FOREIGN KEY ("servicoId") REFERENCES "servico_estabelecimento" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_76a4412ec2aa49edeb1a106f0a0" FOREIGN KEY ("profissionalId") REFERENCES "usuario" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_agendamento"("id", "data", "hora", "status", "clienteId", "servicoId", "profissionalId") SELECT "id", "data", "hora", "status", "clienteId", "servicoId", "profissionalId" FROM "agendamento"`);
        await queryRunner.query(`DROP TABLE "agendamento"`);
        await queryRunner.query(`ALTER TABLE "temporary_agendamento" RENAME TO "agendamento"`);
        await queryRunner.query(`DROP INDEX "IDX_726844b1523a242bda2552c9bd"`);
        await queryRunner.query(`DROP INDEX "IDX_9165aed2ab33b274d97f3b6c0d"`);
        await queryRunner.query(`CREATE TABLE "temporary_usuario_servicos_servico_estabelecimento" ("usuarioId" varchar NOT NULL, "servicoEstabelecimentoId" varchar NOT NULL, CONSTRAINT "FK_726844b1523a242bda2552c9bdc" FOREIGN KEY ("usuarioId") REFERENCES "usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_9165aed2ab33b274d97f3b6c0d3" FOREIGN KEY ("servicoEstabelecimentoId") REFERENCES "servico_estabelecimento" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("usuarioId", "servicoEstabelecimentoId"))`);
        await queryRunner.query(`INSERT INTO "temporary_usuario_servicos_servico_estabelecimento"("usuarioId", "servicoEstabelecimentoId") SELECT "usuarioId", "servicoEstabelecimentoId" FROM "usuario_servicos_servico_estabelecimento"`);
        await queryRunner.query(`DROP TABLE "usuario_servicos_servico_estabelecimento"`);
        await queryRunner.query(`ALTER TABLE "temporary_usuario_servicos_servico_estabelecimento" RENAME TO "usuario_servicos_servico_estabelecimento"`);
        await queryRunner.query(`CREATE INDEX "IDX_726844b1523a242bda2552c9bd" ON "usuario_servicos_servico_estabelecimento" ("usuarioId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9165aed2ab33b274d97f3b6c0d" ON "usuario_servicos_servico_estabelecimento" ("servicoEstabelecimentoId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_9165aed2ab33b274d97f3b6c0d"`);
        await queryRunner.query(`DROP INDEX "IDX_726844b1523a242bda2552c9bd"`);
        await queryRunner.query(`ALTER TABLE "usuario_servicos_servico_estabelecimento" RENAME TO "temporary_usuario_servicos_servico_estabelecimento"`);
        await queryRunner.query(`CREATE TABLE "usuario_servicos_servico_estabelecimento" ("usuarioId" varchar NOT NULL, "servicoEstabelecimentoId" varchar NOT NULL, PRIMARY KEY ("usuarioId", "servicoEstabelecimentoId"))`);
        await queryRunner.query(`INSERT INTO "usuario_servicos_servico_estabelecimento"("usuarioId", "servicoEstabelecimentoId") SELECT "usuarioId", "servicoEstabelecimentoId" FROM "temporary_usuario_servicos_servico_estabelecimento"`);
        await queryRunner.query(`DROP TABLE "temporary_usuario_servicos_servico_estabelecimento"`);
        await queryRunner.query(`CREATE INDEX "IDX_9165aed2ab33b274d97f3b6c0d" ON "usuario_servicos_servico_estabelecimento" ("servicoEstabelecimentoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_726844b1523a242bda2552c9bd" ON "usuario_servicos_servico_estabelecimento" ("usuarioId") `);
        await queryRunner.query(`ALTER TABLE "agendamento" RENAME TO "temporary_agendamento"`);
        await queryRunner.query(`CREATE TABLE "agendamento" ("id" varchar PRIMARY KEY NOT NULL, "data" varchar NOT NULL, "hora" varchar NOT NULL, "status" varchar NOT NULL, "clienteId" varchar, "servicoId" varchar, "profissionalId" varchar)`);
        await queryRunner.query(`INSERT INTO "agendamento"("id", "data", "hora", "status", "clienteId", "servicoId", "profissionalId") SELECT "id", "data", "hora", "status", "clienteId", "servicoId", "profissionalId" FROM "temporary_agendamento"`);
        await queryRunner.query(`DROP TABLE "temporary_agendamento"`);
        await queryRunner.query(`ALTER TABLE "servico_estabelecimento" RENAME TO "temporary_servico_estabelecimento"`);
        await queryRunner.query(`CREATE TABLE "servico_estabelecimento" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "preco" integer NOT NULL, "duracao" integer NOT NULL, "descricao" varchar NOT NULL, "estabelecimentoId" varchar NOT NULL, "categoriaId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "servico_estabelecimento"("id", "nome", "preco", "duracao", "descricao", "estabelecimentoId", "categoriaId") SELECT "id", "nome", "preco", "duracao", "descricao", "estabelecimentoId", "categoriaId" FROM "temporary_servico_estabelecimento"`);
        await queryRunner.query(`DROP TABLE "temporary_servico_estabelecimento"`);
        await queryRunner.query(`DROP INDEX "IDX_9165aed2ab33b274d97f3b6c0d"`);
        await queryRunner.query(`DROP INDEX "IDX_726844b1523a242bda2552c9bd"`);
        await queryRunner.query(`DROP TABLE "usuario_servicos_servico_estabelecimento"`);
        await queryRunner.query(`DROP TABLE "agendamento"`);
        await queryRunner.query(`DROP TABLE "servico_estabelecimento"`);
        await queryRunner.query(`DROP TABLE "categoria_servico"`);
    }

}
