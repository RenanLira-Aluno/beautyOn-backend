import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Estabelecimento } from "./estabelecimento.entity";
import { CategoriaServico } from "./categoriaServico.entity";
import { Profissional } from "./profissional.entity";
import { Agendamento } from "./agendamento.entity";

@Entity()
export class ServicoEstabelecimento {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(
      () => Estabelecimento,
      (estabelecimento) => estabelecimento.servicos,
      {nullable: false}
    )
    estabelecimento: Estabelecimento;

    @ManyToOne(
        () => CategoriaServico,
        (categoriaServico) => categoriaServico.servicos,
        {nullable: false}
    )
    categoria: CategoriaServico

    @ManyToMany(() => Profissional, (profissional) => profissional.servicos, {nullable: true})
    profissionais?: Profissional[]

    @OneToMany(() => Agendamento, (agendamento) => agendamento.servico, {nullable: true})
    agendamentos?: Agendamento[];
    
    @Column({nullable: false})
    nome: string;

    @Column({nullable: false})
    preco: number;

    @Column({nullable: false})
    duracao: number;

    @Column({nullable: false})
    descricao: string;


}