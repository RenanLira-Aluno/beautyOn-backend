import { MigrationInterface, QueryRunner } from "typeorm";

export class EstabelecimentoEndereco1698502109021 implements MigrationInterface {
    name = 'EstabelecimentoEndereco1698502109021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_estabelecimento" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "descricao" varchar NOT NULL, "telefone" varchar NOT NULL, "email" varchar NOT NULL, "senha" varchar NOT NULL, "cnpj" varchar, "enderecoId" varchar, CONSTRAINT "UQ_c1c688094d217d4550664e6a905" UNIQUE ("enderecoId"))`);
        await queryRunner.query(`INSERT INTO "temporary_estabelecimento"("id", "nome", "descricao", "telefone", "email", "senha", "cnpj") SELECT "id", "nome", "descricao", "telefone", "email", "senha", "cnpj" FROM "estabelecimento"`);
        await queryRunner.query(`DROP TABLE "estabelecimento"`);
        await queryRunner.query(`ALTER TABLE "temporary_estabelecimento" RENAME TO "estabelecimento"`);
        await queryRunner.query(`CREATE TABLE "temporary_estabelecimento" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "descricao" varchar NOT NULL, "telefone" varchar NOT NULL, "email" varchar NOT NULL, "senha" varchar NOT NULL, "cnpj" varchar, "enderecoId" varchar, CONSTRAINT "UQ_c1c688094d217d4550664e6a905" UNIQUE ("enderecoId"), CONSTRAINT "FK_d6fef739651e1c7c658816b6a38" FOREIGN KEY ("enderecoId") REFERENCES "endereco" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_estabelecimento"("id", "nome", "descricao", "telefone", "email", "senha", "cnpj", "enderecoId") SELECT "id", "nome", "descricao", "telefone", "email", "senha", "cnpj", "enderecoId" FROM "estabelecimento"`);
        await queryRunner.query(`DROP TABLE "estabelecimento"`);
        await queryRunner.query(`ALTER TABLE "temporary_estabelecimento" RENAME TO "estabelecimento"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "estabelecimento" RENAME TO "temporary_estabelecimento"`);
        await queryRunner.query(`CREATE TABLE "estabelecimento" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "descricao" varchar NOT NULL, "telefone" varchar NOT NULL, "email" varchar NOT NULL, "senha" varchar NOT NULL, "cnpj" varchar, "enderecoId" varchar, CONSTRAINT "UQ_c1c688094d217d4550664e6a905" UNIQUE ("enderecoId"))`);
        await queryRunner.query(`INSERT INTO "estabelecimento"("id", "nome", "descricao", "telefone", "email", "senha", "cnpj", "enderecoId") SELECT "id", "nome", "descricao", "telefone", "email", "senha", "cnpj", "enderecoId" FROM "temporary_estabelecimento"`);
        await queryRunner.query(`DROP TABLE "temporary_estabelecimento"`);
        await queryRunner.query(`ALTER TABLE "estabelecimento" RENAME TO "temporary_estabelecimento"`);
        await queryRunner.query(`CREATE TABLE "estabelecimento" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "descricao" varchar NOT NULL, "telefone" varchar NOT NULL, "email" varchar NOT NULL, "senha" varchar NOT NULL, "cnpj" varchar)`);
        await queryRunner.query(`INSERT INTO "estabelecimento"("id", "nome", "descricao", "telefone", "email", "senha", "cnpj") SELECT "id", "nome", "descricao", "telefone", "email", "senha", "cnpj" FROM "temporary_estabelecimento"`);
        await queryRunner.query(`DROP TABLE "temporary_estabelecimento"`);
    }

}
