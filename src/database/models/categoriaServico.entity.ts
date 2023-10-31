import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ServicoEstabelecimento } from "./ServicoEstabelecimento.entity";

@Entity()
export class CategoriaServico {

    @PrimaryColumn({unique: true, nullable: false, })
    codigo: string;

    @Column({nullable: false, unique: true})
    nome: string;

    @Column({nullable: false})
    descricao: string;

    @OneToMany(
      () => ServicoEstabelecimento,
      (servicoEstabelecimento) => servicoEstabelecimento.categoria,
    )
    servicos: ServicoEstabelecimento[];
}