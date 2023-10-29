import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ServicoEstabelecimento } from "./ServicoEstabelecimento.entity";

@Entity()
export class CategoriaServico {
    @PrimaryGeneratedColumn('uuid')
    id: string;

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