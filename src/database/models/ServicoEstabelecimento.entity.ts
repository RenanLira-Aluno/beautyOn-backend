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
import { IsCurrency, IsNotEmpty } from 'class-validator';

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
  @IsNotEmpty()
  categoriaCodigo: string;

  @ManyToMany(
    () => Profissional,
    (profissional) => profissional.servicosPrestados,
  )
  profissionais: Profissional[];

  @OneToMany(() => Agendamento, (agendamento) => agendamento.servico)
  agendamentos: Agendamento[];

  @Column({ nullable: false })
  @IsNotEmpty()
  nome: string;

  @Column({ nullable: false })
  @IsCurrency({
    allow_negatives: false,
    thousands_separator: '.',
    decimal_separator: ',',
  })
  preco: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  duracao: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  descricao: string;
}
