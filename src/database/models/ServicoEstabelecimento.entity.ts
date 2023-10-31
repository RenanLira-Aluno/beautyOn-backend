import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Estabelecimento } from './estabelecimento.entity';
import { CategoriaServico } from './categoriaServico.entity';
import { Profissional } from './profissional.entity';
import { Agendamento } from './agendamento.entity';

@Entity()
export class ServicoEstabelecimento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => Estabelecimento,
    (estabelecimento) => estabelecimento.servicos,
  )
  estabelecimento: Estabelecimento;

  @ManyToOne(
    () => CategoriaServico,
    (categoriaServico) => categoriaServico.servicos,
  )
  categoria: CategoriaServico;

  @Column()
  categoriaCodigo: string;

  @ManyToMany(
    () => Profissional,
    (profissional) => profissional.servicosPrestados,
  )
  profissionais: Profissional[];

  @OneToMany(() => Agendamento, (agendamento) => agendamento.servico)
  agendamentos: Agendamento[];

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false })
  preco: number;

  @Column({ nullable: false })
  duracao: number;

  @Column({ nullable: false })
  descricao: string;
}
