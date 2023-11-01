import {
  ChildEntity,
  Column,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { Estabelecimento } from './estabelecimento.entity';
import { ServicoEstabelecimento } from './ServicoEstabelecimento.entity';
import { Agendamento } from './agendamento.entity';
import { IsNotEmpty } from 'class-validator';

@ChildEntity()
export class Profissional extends Usuario {
  @Column({ nullable: false })
  @IsNotEmpty()
  primeiroNome: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  segundoNome: string;

  @Column()
  @IsNotEmpty()
  descricao: string;

  @ManyToOne(
    () => Estabelecimento,
    (estabelecimento) => estabelecimento.profissionais,
  )
  estabelecimento: Estabelecimento;

  @ManyToMany(() => ServicoEstabelecimento, (servico) => servico.profissionais)
  @JoinTable()
  servicosPrestados: ServicoEstabelecimento[];

  @OneToMany(() => Agendamento, (agendamento) => agendamento.profissional)
  agendamentos: Agendamento[];
}
