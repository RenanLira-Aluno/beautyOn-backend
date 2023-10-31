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

@ChildEntity()
export class Profissional extends Usuario {
  @Column({ nullable: false })
  primeiroNome: string;

  @Column({ nullable: false })
  segundoNome: string;

  @Column()
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
