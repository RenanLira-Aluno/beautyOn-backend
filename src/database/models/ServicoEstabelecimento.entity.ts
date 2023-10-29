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

    @ManyToMany(() => Profissional, (profissional) => profissional.servicos)
    profissionais: Profissional[]

    @OneToMany(() => Agendamento, (agendamento) => agendamento.servico)
    agendamentos: Agendamento[];
    
    @Column()
    nome: string;

    @Column()
    preco: number;

    @Column()
    duracao: number;

    @Column()
    descricao: string;


}