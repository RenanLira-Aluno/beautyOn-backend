import { MigrationInterface, QueryRunner } from "typeorm";

export class HorarioFuncionamento1698503185262 implements MigrationInterface {
    name = 'HorarioFuncionamento1698503185262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "horario_funcionamento" ("id" varchar PRIMARY KEY NOT NULL, "diaSemana" integer NOT NULL, "horaAbertura" varchar NOT NULL, "horaFechamento" varchar NOT NULL, "estabelecimentoId" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_horario_funcionamento" ("id" varchar PRIMARY KEY NOT NULL, "diaSemana" integer NOT NULL, "horaAbertura" varchar NOT NULL, "horaFechamento" varchar NOT NULL, "estabelecimentoId" varchar, CONSTRAINT "FK_9147f198fa6a8bd17791ec5302e" FOREIGN KEY ("estabelecimentoId") REFERENCES "estabelecimento" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_horario_funcionamento"("id", "diaSemana", "horaAbertura", "horaFechamento", "estabelecimentoId") SELECT "id", "diaSemana", "horaAbertura", "horaFechamento", "estabelecimentoId" FROM "horario_funcionamento"`);
        await queryRunner.query(`DROP TABLE "horario_funcionamento"`);
        await queryRunner.query(`ALTER TABLE "temporary_horario_funcionamento" RENAME TO "horario_funcionamento"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "horario_funcionamento" RENAME TO "temporary_horario_funcionamento"`);
        await queryRunner.query(`CREATE TABLE "horario_funcionamento" ("id" varchar PRIMARY KEY NOT NULL, "diaSemana" integer NOT NULL, "horaAbertura" varchar NOT NULL, "horaFechamento" varchar NOT NULL, "estabelecimentoId" varchar)`);
        await queryRunner.query(`INSERT INTO "horario_funcionamento"("id", "diaSemana", "horaAbertura", "horaFechamento", "estabelecimentoId") SELECT "id", "diaSemana", "horaAbertura", "horaFechamento", "estabelecimentoId" FROM "temporary_horario_funcionamento"`);
        await queryRunner.query(`DROP TABLE "temporary_horario_funcionamento"`);
        await queryRunner.query(`DROP TABLE "horario_funcionamento"`);
    }

}
